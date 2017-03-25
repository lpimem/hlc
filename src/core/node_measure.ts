import { getNodeByPath } from '../util/dom_helper';
import {extend} from '../util/array_helper';
import {debug} from '../util/log';

import {Dimension, NodeContext, RangeCache} from './data';
import {
  getElementLayout,
  getElementOffsetLayout,
  measureSpanToDim,
  mergeDimensions,
  restoreBeforeMeasureStatus,
  substitudeWithMeasureSpan
} from './node_measure_impl';
import {NodeVisitor} from './node_visitor';
import { correctRange, isRange, iterateRangeNodes } from './range_helper';

export function computeDimentions(
    doc: Document, range: Range|RangeCache): Dimension[] {
  let dims: Dimension[] = [];
  let rc: RangeCache = null;
  if (isRange(range)) {
    rc = RangeCache.make(doc, range);
  } else {
    rc = range;
  }
  rc = correctRange(rc);
  iterateRangeNodes(rc, buildNodeToDimVisitor(document, dims));
  dims = mergeDimensions(dims);
  debug('computed dimensions: ')
  dims.forEach((v) => {
    debug(v.toString());
  });
  debug('- - - - - - - - - -');
  return dims;
}

function buildNodeToDimVisitor(
    doc: Document, result: Dimension[]): NodeVisitor {
  return function(n, ctx, s, e): void {
    let dims = nodeToDimensions(doc, n, ctx, s, e);
    extend(result, dims);
  };
}

function nodeToDimensions(
    doc: Document, n: Node, ctx: NodeContext, start: number,
    end: number): Dimension[] {
  if (n.nodeType == Node.TEXT_NODE) {
    return textNodeToDim(doc, n, ctx, start, end);
  } else {
    return [];
  }
}

function textNodeToDim(
    doc: Document, n: Node, ctx: NodeContext, start: number,
    end: number): Dimension[] {
  let span: HTMLSpanElement =
      substitudeWithMeasureSpan(doc, n, ctx, start, end);
  let dims: Dimension[] = 
    measureSpanToDim(span, doc, (doc: Document, el: HTMLElement)=>{
      let anchor = getNodeByPath(doc, ctx.rangeCache.meta.anchorUPath);
      let layout = getElementLayout(doc, el);
      let anchorLayout = getElementLayout(doc, anchor as HTMLElement);
      return new Dimension([layout.Left - anchorLayout.Left, layout.Top - anchorLayout.Top, layout.Width, layout.Height]);
    });
  restoreBeforeMeasureStatus(ctx.parent, ctx.index, ctx.siblings);
  return dims;
}