import { asArray, clearSelection, select } from '../src/util/dom_helper';
import { RangeCache } from '../src/core/data';
import { iterateRangeNodes } from '../src/core/range_helper';
import { restoreBeforeMeasureStatus, substitudeWithMeasureSpan } from '../src/core/node_measure_impl';
import {afterDocLoad} from "../src/onload";

function toggleSelect(): void {
  let range: Range = window.getSelection().getRangeAt(0);
  if (range.collapsed) {
    return;
  }
  let rc: RangeCache = RangeCache.make(document, range);
  clearSelection(window);
  iterateRangeNodes(rc, (n, ctx, s, e) => {
    let parent: Node = ctx.parent;
    let siblings: Node[] = asArray(parent.childNodes);
    let nodeIdx: number = siblings.indexOf(n);
    substitudeWithMeasureSpan(document, n, ctx, s, e);
    setTimeout(() => {
      restoreBeforeMeasureStatus(parent, nodeIdx, siblings);
      select(window, rc.toRange(document));
      // getSelectedReangeMeasure();
    }, 1000);
  });
}

function registerMouseEvents(){
  document.addEventListener("click", toggleSelect);
}

afterDocLoad(()=>{
  registerMouseEvents();
});