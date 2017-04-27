import { BlockDecorator, BlockDecoratorFactory } from '../decorator/decorator';
import { info } from 'rangeblock/dist/util/log';
import { Footnote } from '../components/Footnote';
import { BlockStyle } from '../decorator/block_style';
import { MutationSummary, Summary } from '../util/mutation-summary';
import { IApp, IBlockConfig } from './app_define';
import { getGlobalBlockMap } from './block_map';
import * as APP_CONSTS from './consts';
import { ItemCtxMenu, ItemCtxMenuOptions } from './ctx_menu';
import * as DefinedDecorators from './decorators';
import * as Markdown from 'hlc-js-helpers';
import { clearSelection, getNodeByPath, select, getSelectedRange} from 'hlc-js-helpers';
import { debug } from 'logez';
import { Block, extractSelectedBlock, RangeMeta, restoreBlock } from 'rangeblock';
import * as rangeblock from 'rangeblock';
import { Dimension } from 'rangeblock';
import { RangeCache } from "rangeblock";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as MouseEvtUtil from "../util/mouse_evt";

interface FootnoteDict {
  [key: string]: Footnote;
}

export interface LocalAppUiOptions {
  itemCtxMenuOptions: ItemCtxMenuOptions;
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
    this.observeMouseDown();
  }

  /**
   * If user selected some text in the current window, highlight it.
   * Else do nothing.
   * @param renderOption: instructions on how the highlights should be rendered
   * @param onSuccess: [optional] callback upon successful highlight
   * @param onFail: [optional] callback when no highlight is generated
   */
  public highlightSelection(renderOption?: IBlockConfig,
                            onSuccess?: (block: Block)=>void,
                            onFail?:(reason: string)=>void): void {
    let block: Block = extractSelectedBlock(window, document);
    if (!block) {
      onFail && onFail("no selected text found");
    }
    this.addBlock(block, renderOption);
    onSuccess && onSuccess(block);
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

  /**
   * remove a highlighted block with given id
   * @param blockId: ID of the block to remove from the app
   * @param onSuccess: [optional] callback upon successful delete
   * @param onFail: [optional] callback upon failed delete
   */
  public removeHighlight(blockId: string,
                         onSuccess? :(blockId: string)=>void,
                         onFail? : (blockId: string, reason: string)=>void): void {
    for (let ftId in this.m_ftnotes) {
      let note = this.m_ftnotes[ftId];
      if (note.removeHighlight(blockId)) {
        this.m_layout_snapshots.remove(blockId);
        onSuccess && onSuccess(blockId);
      }
    }
    let reason : string = `${blockId} not found in any footnotes`;
    debug(`removeHighlight: ${reason}`);
    onFail && onFail(blockId, reason);
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
   * @param renderOption [optional] instructions on how to render the block.
   */
  public addBlock(blk: Block, renderOption: IBlockConfig): void {
    let ftntId = blk.rangeCache.meta.anchorUPath;
    let decorator = DefinedDecorators.getDecorator(renderOption.decoratorName);
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
    debug("putting footnotes under", container);
    ReactDOM.unmountComponentAtNode(container);
    ReactDOM.render(ftntEl, container);
    return anchor;
  }

  private init_options(options?: LocalAppUiOptions){
    let itemCtxMenuOptions = null;
    if (options){
      itemCtxMenuOptions = options.itemCtxMenuOptions;
    }
    this.m_ctx_menu = new ItemCtxMenu(
      this.m_doc, this.m_doc.body, itemCtxMenuOptions);
  }

  private getSelectedRangeCache(): RangeCache {
    let r = getSelectedRange(this.m_win);
    if (r && !r.collapsed){
      return RangeCache.make(this.m_doc, r);
    }
    return null;
  }

  private m_delayedMouseDownEvtName: string;
  private m_delayedMouseUpEvtHandler: any;
  private onmouseup(evt: MouseEvent): void{
    this.m_doc.body.removeEventListener("mouseup", this.m_delayedMouseUpEvtHandler);
    if(evt.button != 0){
      return;
    }
    let mustRedraw = true;
    let recalculateDims = false;
    let decoratorFactory = new BlockDecoratorFactory();
    decoratorFactory.removeRowClass(APP_CONSTS.NoPointerEventsClass());
    this.redrawAll(decoratorFactory, mustRedraw, recalculateDims);
  }

  private observeMouseDown(){
    let target = this.m_doc.body;
    this.m_delayedMouseDownEvtName = MouseEvtUtil.monitorDelayedMouseDownEvent(target, 100);
    target.addEventListener(this.m_delayedMouseDownEvtName, (evt)=>{
      this.m_delayedMouseUpEvtHandler = this.onmouseup.bind(this);
      target.addEventListener("mouseup", this.m_delayedMouseUpEvtHandler);
      let decoratorFactory = new BlockDecoratorFactory();
      decoratorFactory.addRowClass(APP_CONSTS.NoPointerEventsClass());
      let mustRedraw = true;
      let recalculateDims = false;
      this.redrawAll(decoratorFactory, mustRedraw, recalculateDims);
    });
  }

  private redrawAll(template?: BlockDecoratorFactory, force?:boolean, recalculateDim:boolean = true){
    for (let fid in this.m_ftnotes){
      let anchor = getNodeByPath(this.m_doc, fid) as HTMLElement;
      if (force || this.m_layout_snapshots.isChanged(fid, anchor, this.m_doc.body)){
        this.redrawFootnote(fid, template, force, recalculateDim);
      } else {
        debug(`{fid} didn't change.`);
      }
    }
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
        this.redrawAll();
      }, 50);
    });
    info("observing resizing events");
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

  private redrawFootnote(footnoteId:string, decoratorFactory?: BlockDecoratorFactory, force?:boolean, recalculateDim:boolean = true) {
    let ftnt = this.m_ftnotes[footnoteId];
    if (!ftnt)
    {
      debug("redrawFootnote: cannot find footnote: " + footnoteId);
      return ;
    }
    let old = ftnt.getAll();
    let newStyles = this.recomputeStyles(old, decoratorFactory, recalculateDim);
    if (force)
    {
      this.renderFootnote(footnoteId, newStyles);
    }
    else
    {
      this.m_win.requestAnimationFrame(()=>{
        debug(`re-rendering footnote ${footnoteId}`);
        this.renderFootnote(footnoteId, newStyles);
      });
    }
  }

  private recomputeStyles(old: BlockStyle[], template?: BlockDecoratorFactory, recalculateDim:boolean = true): BlockStyle[]{
    let result: BlockStyle[] = [];
    if (!template){
      template = new BlockDecoratorFactory();
    }
    for (let one of old){
      let block = this.m_blockMap.getBlock(one.id);
      if ( recalculateDim )
      {
        block.recalculateDimension();
      }
      let style : BlockStyle;
      let decorate = template.clone()
                             .insertRowClass(one.RowClass)
                             .insertRowContainerClass(one.ItemClass)
                             .build();
      style = decorate(block);
      result.push(style);
    }
    return result;
  }

  private m_ftnotes: FootnoteDict;
  private m_blockMap = getGlobalBlockMap();
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