import { Footnote } from '../components/Footnote';
import { BlockStyle } from '../decorator/block_style';
import { BlockDecorator } from '../decorator/decorator';
import * as decoratorDefine from '../decorator/decorator';
import { MutationSummary, Summary } from '../util/mutation-summary';
import { IApp, IBlockConfig } from './app_define';
import { getGlobalBlockMap } from './block_map';
import * as APP_CONSTS from './consts';
import * as decorators from "./decorators";
import { ItemCtxMenu, ItemCtxMenuOptions } from './ctx_menu';
import * as Markdown from 'hlc-js-helpers';
import { clearSelection, getNodeByPath, select } from 'hlc-js-helpers';
import { debug, warn } from 'logez';
import { Block, extractSelectedBlock, RangeMeta, restoreBlock } from 'rangeblock';
import * as rangeblock from 'rangeblock';
import { Dimension } from 'rangeblock/dist';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface FootnoteDict {
  [key: string]: Footnote;
}

export interface LocalAppUiOptions {
  blockDecorator?: decoratorDefine.BlockDecorator;
  itemCtxMenuOptions?: ItemCtxMenuOptions;
}

/**
 * A local UI managing temporary highlights for a given document object.
 */
export class LocalAppUi implements IApp {

  constructor(doc: Document, options?: LocalAppUiOptions) {
    this.m_ftnotes = {} as FootnoteDict;
    this.m_doc = doc;
    this.m_win = doc.defaultView;
    this.init_options(options);
    this.m_layout_snapshots = new LayoutSnapshots(doc);
    this.observeResize();
  }

  public configure(options: LocalAppUiOptions){
    if (options.blockDecorator){
      this.m_blockDecorator = options.blockDecorator;
    } 
    if (options.itemCtxMenuOptions){
      this.m_ctx_menu.configure(options.itemCtxMenuOptions);
    }
  }

  /**
   * If user selected some text in the current window, highlight it.
   * Else do nothing.
   */
  public highlightSelection(config?: IBlockConfig): boolean {
    let block: Block = extractSelectedBlock(window, document);
    if (block == null) {
      return false;
    }
    this.addBlock(block, config);
    return true;
  }

  /**
   * Rebuild the block with a given meta
   * @param meta See @class{RangeMeta}
   * @param id optional, the id for the restored block
   * @return restored block id
   */
  public restoreHighlight(meta: RangeMeta, id?: string, config?: IBlockConfig) {
    let block = restoreBlock(this.m_win, this.m_doc, meta, id);
    this.addBlock(block, config);
    return block.id;
  }

  public getDecorator(config?: IBlockConfig){
    let decorator = this.m_blockDecorator;
    if (config && config.decoratorName){
      decorator = decorators.getDecorator(config.decoratorName);
    }
    return decorator;
  }

  /**
   * Find and remove the block with a given id.
   * @param id of the block to remove
   */
  public removeHighlight(id: string): void {
    for (let ftId in this.m_ftnotes) {
      let note = this.m_ftnotes[ftId];
      if (note.removeHighlight(id)) {
        this.m_layout_snapshots.remove(id);
        return;
      }
    }
    warn(`removeHighlight: ${id} not found in any footnotes`);
  }

  /**
   * generate notes of highlighted text
   */
  public generateMarkdownNotes(): string {
    let title = this.m_doc.title || this.m_doc.head.title;
    let url = this.m_win.location.toString();
    let lines = this.getAllText();
    let noteTitle = `Notes on ${Markdown.link(title, url)}\r\n\r\n`;
    let md = Markdown.h(1, noteTitle);
    let buf = [];
    for (let idx = 0; idx <= lines.length; idx++) {
      if (idx == lines.length || lines[idx] == "") {
        if (buf.length > 0) {
          md += Markdown.ul(buf, 0);
        }
        md += "\r\n";
        buf.length = 0;
      } else {
        buf.push(lines[idx]);
      }
    }
    return md;
  }

  /**
   * Summary: 
   *   Try to add a block to the ui and the global block map
   * Will not check for duplicates.
   * 
   * Details:
   *   A Block instance will be rendered as an Item component
   * inside a footnote. Footnote is located by the block's 
   * position anchor. A new footnote is created if not found. 
   * @param blk a Block instance
   * @param config [optional] config for rendering the block.
   */
  public addBlock(blk: Block, config?: IBlockConfig): void {
    let ftntId = blk.rangeCache.meta.anchorUPath;
    let decorator = this.getDecorator(config);
    let blkStyle = decorator(blk);
    if (ftntId in this.m_ftnotes) {
      let ftnt: Footnote = this.m_ftnotes[ftntId];
      ftnt.addHighlight(blkStyle);
      debug(`added to existing ftnt: ${ftntId}`);
    } else {
      debug(`generating new ftnt under : ${ftntId}`);
      let anchor = this.renderFootnote(ftntId, [blkStyle]);
      this.observeFootnotedSubtree(anchor, ftntId);
    }
    this.m_blockMap.addBlock(blk);
  }

  public getText(blockId: string): string {
    let block = this.m_blockMap.getBlock(blockId);
    return block ? block.text : "";
  }

  public copy(blockId: string): boolean {
    let block = this.m_blockMap.getBlock(blockId);
    if (block) {
      select(this.m_win, block.rangeCache.toRange(this.m_doc));
      let suc = this.m_doc.execCommand("copy");
      clearSelection(this.m_win);
      return suc;
    }
    return false;
  }

  public removeAll(): void {
    for (let ftId in this.m_ftnotes) {
      let note = this.m_ftnotes[ftId];
      let stylesCopy = note.getAll().slice();
      note.removeAll();
      stylesCopy.forEach((b) => { this.m_blockMap.deleteBlock(b.id); });
    }
  }

  public getAllText(): string[] {
    let notes: string[] = [];
    for (let key in this.m_ftnotes) {
      let note = this.m_ftnotes[key];
      note.getAll().forEach(
        (blkStyle) => {
          let line = this.m_blockMap.getBlock(blkStyle.id).text;
          notes.push(line);
        });
      notes.push("");
    }
    return notes;
  }

  private getOrCreateContainer(cid: string, parent: Node): HTMLElement {
    let d = this.m_doc.getElementById(cid);
    if (!d) {
      d = this.m_doc.createElement("div");
      d.id = cid;
      d.className = APP_CONSTS.DefaultFootnoteContainerClass();
      parent.appendChild(d);
    }
    return d;
  }

  private onItemClick(id: string, evt: MouseEvent): void {
    debug(`item ${id} clicked`);
  }

  private onItemCtxMenu(id: string, evt: MouseEvent): void {
    this.m_ctx_menu.showFor(id, evt);
    evt.preventDefault();
  }

  private renderFootnote(anchorUPath: string, initBlocks: BlockStyle[]): HTMLElement {
    let anchor: HTMLElement =
      getNodeByPath(this.m_doc, anchorUPath) as HTMLElement;
    const containerId: string = "ftnt_" + anchorUPath;
    let container = this.getOrCreateContainer(containerId, anchor);
    let ftntEl = React.createElement(Footnote, {
      id: anchorUPath,
      styleClass: APP_CONSTS.DefaultFootnoteContainerClass(),
      source: () => initBlocks,
      onMount: (ins: Footnote) => {
        this.m_ftnotes[anchorUPath] = ins;
      },
      rowOptions: {
        onClick: (id: string, evt: MouseEvent) => {
          this.onItemClick(id, evt);
        },
        onContextMenu: (id: string, evt: MouseEvent) => {
          this.onItemCtxMenu(id, evt);
        },
      }
    });
    debug("generated under", container);
    ReactDOM.render(ftntEl, container);
    return anchor;
  }

  private init_options(options?: LocalAppUiOptions){
    let itemCtxMenuOptions = null;
    if (options){
      this.m_blockDecorator = options.blockDecorator;
      itemCtxMenuOptions = options.itemCtxMenuOptions;
    } else {
      this.m_blockDecorator = decoratorDefine.DefaultBlockDecorator();
    }
    this.m_ctx_menu = new ItemCtxMenu(
      this.m_doc, this.m_doc.body, itemCtxMenuOptions);
  }

  private observeResize(){
    let ob = new DocResizeObserver();
    let timer: number;
    ob.observeResize(this.m_win as any, this.m_win, ()=>{
      if (timer){
        clearTimeout(timer);
      }
      setTimeout(()=>{
        debug('on document resize');
        for (let fid in this.m_ftnotes){
        let anchor = getNodeByPath(this.m_doc, fid) as HTMLElement;
        if (this.m_layout_snapshots.isChanged(fid, anchor, this.m_doc.body)){
          this.redrawFootnote(fid);
        } else {
          debug(`{fid} didn't change.`);
        }
      }}, 50);
    });
  }

  private observeFootnotedSubtree(anchor: HTMLElement, footnoteId: string){
    let timer : number;
    let ob = observe(anchor, (changes: Summary[])=>{
      debug(`${changes.length} changes detected.`);
      timer = setTimeout(()=>{
        if (timer){
          clearTimeout(timer);
        }
        debug("handling subtree change");
        if (this.m_layout_snapshots.isChanged(footnoteId, anchor, this.m_doc.body)){
          this.m_win.requestAnimationFrame(()=>{
            this.redrawFootnote(footnoteId);
          });
        }
      }, 75) as any;
    });
    this.m_observers[footnoteId] = ob;
  }

  private redrawFootnote(footnoteId:string){
    let ftnt = this.m_ftnotes[footnoteId];
    if (!ftnt){
      debug("redrawFootnote: cannot find footnote: " + footnoteId);
      return ;
    }
    let old = ftnt.getAll();
    let newStyles = this.recomputeStyles(old);
    // this.renderFootnote(footnoteId, newStyles);
    this.m_win.requestAnimationFrame(()=>{
      ftnt.removeAll();
      ftnt.addBatch(newStyles);
    });
  }

  private recomputeStyles(old: BlockStyle[]): BlockStyle[]{
    let result: BlockStyle[] = [];
    for (let one of old){
      let block = this.m_blockMap.getBlock(one.id);
      block.recalculateDimension();
      let style = this.m_blockDecorator(block);
      style = BlockStyle.make(block, one.RowClass, one.ItemClass);
      result.push(style);
    }
    return result;
  }

  private m_ftnotes: FootnoteDict;
  private m_blockMap = getGlobalBlockMap();
  private m_blockDecorator: decoratorDefine.BlockDecorator;
  private m_ctx_menu: ItemCtxMenu;
  private m_row_options: any;
  private m_observers: {[key:string]: MutationSummary} = {};
  private m_layout_snapshots: LayoutSnapshots;

  private m_doc: Document;
  private m_win: Window;
}

// TODO: 
function observe(anchor: Node, callback: (changes: Summary[]) => void): MutationSummary {
  debug("start observing" , anchor);
  let ms = new MutationSummary({
    callback: callback,
    // rootNode: anchor,
    queries: [
      {all: true}
      // { attribute: "style" },
      // { attribute: "width" },
      // { attribute: "height" },
      // { attribute: "top" },
      // { attribute: "left" },
      // { element: "*" }
    ]
  });
  return ms;
}

class LayoutSnapshots{

  constructor(doc: Document){
    this.m_doc = doc;
  }

  public isChanged(id: string, node: HTMLElement, anchor?: HTMLElement, initLayout: Dimension = null): boolean{
    if (!anchor){
      anchor = this.m_doc.body;
    }
    let previous = initLayout?initLayout: this.m_layouts[id];
    let current = rangeblock.computeLayout(this.m_doc, anchor, node);
    let ret : boolean = false;
    if (!previous){
      ret = true;
    } 
    else{
      const tol = 3;
      if (Math.abs(previous.Left - current.Left) > tol 
          || Math.abs(previous.Top - current.Top) > tol
          || Math.abs(previous.Width - current.Width) > tol
          || Math.abs(previous.Height - current.Height) > tol ){
        ret = true;
      }
    }
    this.m_layouts[id] = current;
    return ret;
  }

  public remove(id: string){
    delete this.m_layouts[id];
  }

  private m_doc : Document;

  private m_layouts : {[id: string]: Dimension} = {};
}

class DocResizeObserver{
  public observeResize(obj: HTMLElement, win: Window, callback: EventListener){
    obj.addEventListener("resize", (e)=>{
      if (this.m_handling){
        return ;
      }
      this.m_handling = true;
      win.requestAnimationFrame(()=>{
        obj.dispatchEvent(new CustomEvent(HLC_RESIZE_EVENT));
        this.m_handling = false;
      });
    });

    obj.addEventListener(HLC_RESIZE_EVENT, callback);
  }
  private m_handling : boolean = false;
}

const HLC_RESIZE_EVENT:string = "hlc_on_resize";