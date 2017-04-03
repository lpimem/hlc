import { debug } from './util/log';
import { Block } from './core/block';
import { extractSelectedBlock } from './core/selector';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {Footnote} from './components/Footnote';
import { DecoratedBlock, DecoratedBlockFactory } from './decorator/decorated_block';
import {findPositionAnchor, getNodeByPath} from './util/dom_helper';

interface FootnoteDict {
  [key: string]: Footnote
}
export class App {
  private m_ftnotes: FootnoteDict;
  private m_doc: Document;
  private m_win: Window;

  constructor(doc: Document) {
    this.m_ftnotes = {} as FootnoteDict;
    this.m_doc = doc;
    this.m_win = doc.defaultView;
  }

  private addBlock(blk: DecoratedBlock): void {
    let ftntId = blk.rangeCache.meta.anchorUPath;
    if (ftntId in this.m_ftnotes) {
      let ftnt: Footnote = this.m_ftnotes[ftntId];
      ftnt.addHighlight(blk);
      debug(`added to existing ftnt: ${ftntId}`);
    } else {
      this.renderFootnote(ftntId, [blk]);
    }
  }
  
  private getOrCreateContainer(cid: string, parent:Node): HTMLElement{
    let d = this.m_doc.getElementById(cid);
    if (!d){
      d = this.m_doc.createElement("div");
      d.id = cid;
      parent.appendChild(d);
    }
    return d;
  }
  
  private renderFootnote(anchorUPath: string, initBlocks: DecoratedBlock[]): void {
    debug(`generating new ftnt under : ${anchorUPath}`);
    let anchor: HTMLElement =
        getNodeByPath(this.m_doc, anchorUPath) as HTMLElement;
    const containerId: string = "ftnt_" + anchorUPath;
    let container = this.getOrCreateContainer(containerId, anchor);
    let ftntEl = React.createElement(Footnote, {
      id: anchorUPath, 
      source: {get: () => initBlocks, poll: false},
      onMount: (ins: Footnote) => {
        this.m_ftnotes[anchorUPath] = ins;
      }
    })
    debug("generated under", container);
    ReactDOM.render(ftntEl, container);
  }

  highlightSelection(): boolean{
    let block: Block = extractSelectedBlock(window, document);
    if (block == null) {
      return false;
    }
    let decoratedBlock: DecoratedBlock = new DecoratedBlockFactory(block).make();
    this.addBlock(decoratedBlock);
    return true;
  }
}
