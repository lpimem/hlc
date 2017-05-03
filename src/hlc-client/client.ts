import * as logger from 'logez';
import {Block, extractSelectedBlock, RangeMeta} from 'rangeblock';

import {LocalAppUi} from '../app/app';
import {IApp, IBlockConfig} from '../app/app_define';
import {ItemCtxMenuOptions} from '../app/ctx_menu';
import * as MSG from '../compiled/proto.js';
import { getGlobalBlockMap } from "../app/block_map";


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
    this.m_app = new LocalAppUi(doc, {itemCtxMenuOptions: this.itemCtxMenuOptions()});
    this.m_doc = doc;
    this.reload();
  }

  /**
   * If user selected some text in the current window, highlight it.
   * Else do nothing.
   * @return if there is a selected block.
   */
  highlightSelection(renderOption?: IBlockConfig, 
                     onSuccess?: (block: Block)=>void,
                     onFail?:(reason: string)=>void): void {
    let block: Block = extractSelectedBlock(window, document);
    if (block == null) {
      onFail && onFail("no selected text");
    }
    this.m_app.addBlock(block, renderOption);
    this.saveBlock(block, (blk: Block, newId:string) => {
      this.m_app.removeHighlight(blk.id);
      blk.setId(newId);
      this.m_app.addBlock(blk, renderOption);
      logger.debug(`adding block: ${JSON.stringify(blk)}`);
      onSuccess && onSuccess(blk);
    }, renderOption);
  }

  removeHighlight(id: string, 
                  onSuccess?:(blockId: string)=>void, 
                  onFail?: (blockId: string, reason: string)=>void): void{
    
    let block:Block = getGlobalBlockMap().getBlock(id);
    let onDelete = (blockId: string) => {
        this.m_api.delete(
          new MSG.hlcmsg.IdList({arr: [Number(block.id)]}), 
          (list) => {
            if (list && list.arr) {
              logger.debug(`removed ${list.arr.join()}`);
            }
          });
    };
    this.m_app.removeHighlight(id, 
                              onDelete,
                              (blockId: string, reason)=>{
                                this.m_app.removeHighlight(block.id, onDelete);
                              });
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
              logger.error(`cannot restore meta: ${bid} | ${JSON.stringify(metaMsgProps)}, ${e.toString()}`);
            }
          }
        });
  }

  deleteAll():void{
    logger.info("delete all");
    let blockMap = getGlobalBlockMap();
    let keys = blockMap.getKeys();
    let idArr: number[] = [];
    keys.forEach((v,i)=>{
      try{
        idArr.push(Number(v));
        this.m_app.removeHighlight(String(v));
      }catch(ignore){
      }
    });
    let list : MSG.hlcmsg.IdList = MSG.hlcmsg.IdList.create({arr: idArr});
    this.m_api.delete(list, (deletedList)=>{
      deletedList.arr.forEach((v, i)=>{
        logger.debug(`${v} deleted.`);
      });
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
      block: Block, onSave: (blk: Block, newId:string) => void, renderCfg?: IBlockConfig) {
    let n = new MSG.hlcmsg.Pagenote();
    n.uid = this.m_uid;
    n.pageid = this.m_pid;
    n.url = window.location.toString();
    let renderOption = renderCfg ? renderCfg.decoratorName : '';
    logger.debug('saving block with option: ' + renderOption);
    n.highlights.push(metaToMsg(block.rangeMeta, renderOption));
    this.m_api.save(n, (savedIdList) => {
      onSave(block, savedIdList.arr[0].toString());
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