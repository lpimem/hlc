import { CSSProperties } from '@types/react';
import { Block, Dimension } from 'rangeblock';


export class BlockStyle {

  private constructor(id: string, layouts: CSSProperties[], className: string, rowContainerClassName? : string){
    this.m_row_layouts = layouts;
    this.m_row_class = className;
    this.m_item_class = rowContainerClassName;
    this.m_id = id;
  }

  public static make(block: Block, className: string, rowContainerClassName? : string){
    let layouts = extractLayouts(block);
    return new BlockStyle(block.id, layouts, className, rowContainerClassName);
  }

  get id():string{
    return this.m_id;
  }

  get RowLayouts(): CSSProperties[]{
    return this.m_row_layouts;
  }

  get ItemClass(): string{
    return this.m_item_class;
  }

  get RowClass(): string{
    return this.m_row_class;
  }

  private m_row_layouts : CSSProperties[] ;
  private m_item_class: string;
  private m_row_class : string;
  private m_id : string;
}

function dimensionToCSSProperties(dim: Dimension): CSSProperties{
  let layout = {} as CSSProperties;
  layout.position = dim.Fixed ? "fixed" : "absolute";
  layout.top = `${dim.Top}px`;
  layout.left = `${dim.Left}px`;
  layout.width = `${dim.Width}px`;
  layout.height = `${dim.Height}px`;
  layout.boxSizing = "border";
  layout.border = "0";
  return layout;
}

function extractLayouts(block: Block): CSSProperties[]{
  return block.dimensions.map((v)=>{return dimensionToCSSProperties(v);});
}