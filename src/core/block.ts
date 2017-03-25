import { computeDimentions } from './node_measure';
import {Dimension, RangeCache} from './data';

/**
 * A block of a text highlighted in one selection
 */
export class Block {
  private m_id: string;
  private m_rangeCache: RangeCache;
  private m_dimensions: Dimension[];

  constructor(id: string, rangeCache: RangeCache, dimensions: Dimension[]) {
    this.m_id = id;
    this.m_rangeCache = rangeCache;
    this.m_dimensions = dimensions;
  }

  public get id(): string {
    return this.m_id;
  }

  get rangeCache(): RangeCache {
    return this.m_rangeCache;
  }

  get dimensions(): Dimension[] {
    return this.m_dimensions;
  }

  /**
   * recalculateDimension
   * Recalculate dimensions of the range again.
   */
  public recalculateDimension() {
    this.m_dimensions =
        computeDimentions(this.m_rangeCache.document, this.m_rangeCache);
  }
}