import {CSSProperties} from '@types/react';
import {Block, Dimension} from 'rangeblock';

import * as CONSTS from '../app/consts';
import * as ZIndexHelper from '../util/style';

export class BlockStyle {
  private constructor(
      id: string, layouts: CSSProperties[], className: string,
      rowContainerClassName?: string) {
    this.m_row_layouts = layouts;
    this.m_row_class = className;
    this.m_item_class = rowContainerClassName;
    this.m_id = id;
  }

  public static make(
      block: Block, className: string, rowContainerClassName?: string) {
    let layouts = extractLayouts(block);
    return new BlockStyle(block.id, layouts, className, rowContainerClassName);
  }

  get id(): string {
    return this.m_id;
  }

  get RowLayouts(): CSSProperties[] {
    return this.m_row_layouts;
  }

  get ItemClass(): string {
    return this.m_item_class;
  }

  get RowClass(): string {
    return this.m_row_class;
  }

  private m_row_layouts: CSSProperties[];
  private m_item_class: string;
  private m_row_class: string;
  private m_id: string;
}

function dimensionToCSSProperties(
    dim: Dimension, zIndex?: number): CSSProperties {
  let layout = {} as CSSProperties;
  layout.position = dim.Fixed ? 'fixed' : 'absolute';
  layout.top = `${dim.Top}px`;
  layout.left = `${dim.Left}px`;
  layout.width = `${dim.Width}px`;
  layout.height = `${dim.Height}px`;
  layout.boxSizing = 'border';
  layout.padding = '0';
  layout.margin = '0';
  if (zIndex > 1) {
    layout.zIndex = zIndex;
  }
  return layout;
}

function extractLayouts(block: Block): CSSProperties[] {
  let maxZ = ZIndexHelper.getMaxLocalZIndex(
      block.rangeCache.document.defaultView, block.rangeCache.startContainer,
      ['hlc_msgbox', 'jscm_root', 'jscm_list', CONSTS.DefaultItemRowClass()]);
  if (maxZ && maxZ > 0) {
    maxZ = maxZ - 1;
  }
  return block.dimensions.map((v) => {
    return dimensionToCSSProperties(v, maxZ);
  });
}