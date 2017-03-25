import { clearSelection, getNodeByPath, getSelectedRange } from '../util/dom_helper';
import {generateRandomUUID} from '../util/id_helper';
import {debug, warn} from '../util/log';

import {Block} from './block';
import {RangeCache, RangeMeta} from './data';
import {computeDimentions} from './node_measure';

/**
 * Detect if the given window has a expanded selection range.
 * Return a Block object containing the dimension information
 * of the range or null.
 * @param win window object to extract selection
 * @param doc document object of the window
 * @param id [optional] if present, use it as the
 * Block object's id; otherwise generate a random uuid.
 */
export function extractSelectedBlock(
    win: Window, doc: Document, id?: string): Block {
  let range: Range = getSelectedRange(win);
  if (null == range || range.collapsed) {
    debug('no selected range detected.');
    return null;
  }
  let rc = RangeCache.make(doc, range);
  clearSelection(win);
  let dims = computeDimentions(doc, rc);
  if (!id) {
    id = generateRandomUUID();
  }
  return new Block(id, rc, dims);
}

export function restoreRangeCache(doc: Document, meta: RangeMeta): RangeCache {
  let rangeAnchors: Node[] = [];
  for (let uPath of [meta.startNodeUPath, meta.endNodeUPath]) {
    try {
      let n = getNodeByPath(doc, uPath);
      rangeAnchors.push(n);
    } catch (e) {
      warn(e);
      return null;
    }
  }
  let r = doc.createRange();
  r.setStart(rangeAnchors[0], meta.startCharIndex);
  r.setEnd(rangeAnchors[1], meta.endCharIndex);
  let rc: RangeCache = RangeCache.make(doc, r, meta);
  return rc;
}
