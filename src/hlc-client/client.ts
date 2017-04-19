import {debug, error} from 'logez';
import {Block, extractSelectedBlock, RangeMeta} from 'rangeblock';

import {LocalAppUi} from '../app/app';
import {IApp, IAppOptions, IBlockConfig} from '../app/app_define';
import {ItemCtxMenuOptions} from '../app/ctx_menu';
import * as MSG from '../compiled/proto.js';


export interface ServerAPI {
  get(uid: number, url: string,
      callback: (pagenote: MSG.hlcmsg.Pagenote) => void): void;
  save(
      n: MSG.hlcmsg.Pagenote,
      callback: (savedIdList: MSG.hlcmsg.IdList) => void): void;
  delete(
      list: MSG.hlcmsg.IdList,
      callback: (removedIdList: MSG.hlcmsg.IdList) => void): void;
}

export class Client implements IApp {
  constructor(uid: number, doc: Document, api: ServerAPI) {
    this.m_uid = uid;
    this.m_api = api;
    this.m_app = new LocalAppUi(doc);
    this.m_app.configure({itemCtxMenuOptions: this.itemCtxMenuOptions()});
    this.m_doc = doc;
    this.reload();
  }

  /**
   * If user selected some text in the current window, highlight it.
   * Else do nothing.
   * @return if there is a selected block.
   */
  highlightSelection(config: IBlockConfig): boolean {
    let block: Block = extractSelectedBlock(window, document);
    if (block == null) {
      return false;
    }
    this.m_app.addBlock(block, config);
    this.saveBlock(block, (blk: Block) => {
      debug(`adding block: ${JSON.stringify(blk)}`);
    }, config);
    return true;
  }

  removeHighlight(blockId: string): void {
    this.delete(blockId);
  }

  generateMarkdownNotes(): string {
    return this.m_app.generateMarkdownNotes();
  }

  getText(blockId: string): string {
    return this.m_app.getText(blockId);
  }

  copy(blockId: string): boolean {
    return this.m_app.copy(blockId);
  }

  public configure(options: IAppOptions) {
    this.m_app.configure(options);
  }

  reload() {
    this.m_api.get(
        this.m_uid, this.m_doc.defaultView.location.toString(),
        (pagenote: MSG.hlcmsg.Pagenote) => {
          this.m_app.removeAll();
          if (this.m_pid < 1) {
            this.setPid(pagenote.pageid);
          }
          for (let metaMsgProps of pagenote.highlights) {
            let bid = metaMsgProps.id.toString();
            let meta = msgToMeta(metaMsgProps, metaMsgProps.text);
            let cfg: IBlockConfig = metaMsgProps.option ?
                {decoratorName: metaMsgProps.option} :
                undefined;
            try {
              this.m_app.restoreHighlight(meta, bid, cfg);
            } catch (e) {
              error(`cannot restore meta: ${bid} | ${JSON.stringify(metaMsgProps)}, ${e.toString()}`);
            }
          }
        });
  }

  delete(blk: Block|string) {
    let id: string;
    if (blk instanceof Block) {
      id = blk.id;
    } else {
      id = blk;
    }
    this.m_app.removeHighlight(id);
    this.m_api.delete(new MSG.hlcmsg.IdList({arr: [Number(id)]}), (list) => {
      if (list && list.arr) {
        debug(`removed ${list.arr.join()}`);
      }
    });
  }

  private itemCtxMenuOptions(): ItemCtxMenuOptions {
    return {
      onDelete: (bid: string) => {
        this.removeHighlight(bid);
      },
      onCopy: (bid: string) => {
        return this.m_app.copy(bid);
      }
    };
  }

  private saveBlock(
      block: Block, onSave: (blk: Block) => void, renderCfg?: IBlockConfig) {
    let n = new MSG.hlcmsg.Pagenote();
    n.uid = this.m_uid;
    n.pageid = this.m_pid;
    n.url = window.location.toString();
    let renderOption = renderCfg ? renderCfg.decoratorName : '';
    debug('saving block with option: ' + renderOption);
    n.highlights.push(metaToMsg(block.rangeMeta, renderOption));
    this.m_api.save(n, (savedIdList) => {
      block.setId(savedIdList.arr[0].toString());
      onSave(block);
    });
  }

  private setPid(id: number) {
    this.m_pid = id;
  }
  private m_app: LocalAppUi;
  private m_api: ServerAPI;
  private m_uid: number;
  private m_pid: number;
  private m_doc: Document;
}

function metaToMsg(meta: RangeMeta, config: string = ''): MSG.hlcmsg.RangeMeta {
  return MSG.hlcmsg.RangeMeta.create({
    anchor: meta.anchorUPath,
    start: meta.startNodeUPath,
    startOffset: meta.startCharIndex,
    end: meta.endNodeUPath,
    endOffset: meta.endCharIndex,
    text: meta.text,
    option: config
  });
}

function msgToMeta(
    m: MSG.hlcmsg.RangeMeta$Properties, text: string = null): RangeMeta {
  if (text == null) {
    text = m.text;
  }
  return new RangeMeta(
      [m.anchor, m.start, m.end, text], [m.startOffset, m.endOffset]);
}