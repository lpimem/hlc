import { asArray, computeUniquePath, findPositionAnchor } from '../util/dom_helper';

/**
 * Measurements of a rectangular block.
 */
export class Dimension {
  private m_x: number;
  private m_y: number;
  private m_width: number;
  private m_height: number;

  constructor([x, y, w, h]: number[]) {
    [this.m_x, this.m_y, this.m_width, this.m_height] = [x, y, w, h];
  }

  get Left(): number {
    return this.m_x;
  }
  get Top(): number {
    return this.m_y;
  }
  get Width(): number {
    return this.m_width;
  }
  get Height(): number {
    return this.m_height;
  }

  toString(): string {
    let d = this;
    return `{(${d.Left}, ${d.Top}), ${d.Width} x ${d.Height}}`;
  }
}

/**
 * UPath Information needed to store and restore a range.
 * UPath = [<empty>|#<id>]([/<nodeIndex>])+
 */
export class RangeMeta {
  private m_anchorUPath: string;
  private m_startNodeUPath: string;
  private m_endNodeUPath: string;
  private m_startCharIndex: number;
  private m_endCharIndex: number;

  constructor([anchorUPath, startNodeUPath, endNodeUPath]: string[], [
    startCharIndex, endCharIndex
  ]: number[]) {
    [this.m_anchorUPath, this.m_startNodeUPath, this.m_endNodeUPath] =
        [anchorUPath, startNodeUPath, endNodeUPath];
    [this.m_startCharIndex, this.m_endCharIndex] =
        [startCharIndex, endCharIndex];
  }

  get anchorUPath(): string {
    return this.m_anchorUPath;
  }

  get startNodeUPath(): string {
    return this.m_startNodeUPath;
  }

  public get endNodeUPath(): string {
    return this.m_endNodeUPath;
  }

  public get startCharIndex(): number {
    return this.m_startCharIndex;
  }

  public get endCharIndex(): number {
    return this.m_endCharIndex;
  }
}

/**
 * DOM Range object will change if DOM tree changed.
 * RangeCache will not.
 * You should use RangeCache.make(doc, range) method to creat an
 * intance.
 */
export class RangeCache {
  private m_cac: Node;
  private m_start: Node;
  private m_end: Node;
  private m_startOffset: number;
  private m_endOffset: number;
  private m_document: Document;
  private m_meta: RangeMeta;

  constructor(
      doc: Document, cac: Node, start: Node, end: Node, startOffset: number,
      endOffset: number, meta?: RangeMeta) {
    [this.m_document, this.m_cac, this.m_start, this.m_end, this.m_startOffset,
     this.m_endOffset] = [doc, cac, start, end, startOffset, endOffset];
    if (!meta) {
      let anchor: Node = findPositionAnchor(doc.defaultView, cac);
      this.m_meta = new RangeMeta(
          [
            computeUniquePath(anchor), 
            computeUniquePath(start),
            computeUniquePath(end)
          ],
          [startOffset, endOffset]);
    } else {
      this.m_meta = meta;
    }
  }

  /**
   * A range expires when the dom sub tree is destroyed.
   */
  isExpired(): boolean{
    for (let n of [this.m_cac, this.m_start, this.m_end]){
      if (!n || !n.parentNode){
        return true;
      }
    }
    return false;
  }

  toRange(doc: Document): Range {
    let r = doc.createRange();
    r.setStart(this.m_start, this.m_startOffset);
    r.setEnd(this.m_end, this.m_endOffset);
    return r;
  }

  get document(): Document {
    return this.m_document;
  }

  get commonAncestorContainer(): Node {
    return this.m_cac;
  }

  get startContainer(): Node {
    return this.m_start;
  }

  get endContainer(): Node {
    return this.m_end;
  }

  get startOffset(): number {
    return this.m_startOffset;
  }

  get endOffset(): number {
    return this.m_endOffset;
  }

  get meta(): RangeMeta {
    return this.m_meta;
  }

  static make: (doc: Document, r: Range, meta?: RangeMeta) => RangeCache =
      function(doc: Document, r: Range, meta?: RangeMeta): RangeCache {
    return new RangeCache(
        doc, r.commonAncestorContainer, r.startContainer, r.endContainer,
        r.startOffset, r.endOffset, meta);
  };
}

/**
 * Store the context information of a node. This is useful if you
 * are about to temporarily take the node off the dom tree / fragment.
 */
export class NodeContext {
  private m_parent: Node;
  private m_nextSibling: Node;
  private m_siblings: Node[];
  private m_index: number;
  private m_rangeCache : RangeCache;

  constructor(n: Node, rc?: RangeCache) {
    this.m_parent = n.parentNode;
    this.m_nextSibling = n.nextSibling;
    this.m_siblings = asArray(n.parentNode.childNodes);
    this.m_rangeCache = rc;
    this.m_index = this.m_siblings.indexOf(n);
  }

  public get parent(): Node {
    return this.m_parent;
  }

  public get nextSibling(): Node {
    return this.m_nextSibling;
  }

  public get siblings(): Node[] {
    return this.m_siblings;
  }

  public get index(): number {
    return this.m_index;
  }

  public get rangeCache(): RangeCache{
    return this.m_rangeCache;
  }
}