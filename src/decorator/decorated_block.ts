import { Dimension, RangeCache } from '../core/data';
import { basicDecorator, Decorator } from './decorator';
import { Block } from '../core/block';
import { CSSProperties } from "@types/react";


export class DecoratedBlock extends Block{
  private m_styles: CSSProperties[];
  constructor(id: string, rc:RangeCache, m:Dimension[], s: CSSProperties[]){
    super(id, rc, m);
    this.m_styles = s;
  }

  get styles(): CSSProperties[]{
    return this.m_styles;
  }

  decorate(decorator: Decorator){
    for (let i = 0; i < this.dimensions.length; i++){
      let dim = this.dimensions[i];
      let stl = this.m_styles[i];
      decorator(dim, stl);
    }
  }
}

export class DecoratedBlockFactory{
  private m_decorators: Decorator[];
  private m_block: Block;

  constructor(block: Block){
    this.m_block = block;
    this.m_decorators = [basicDecorator]
  }

  addDecorator(d: Decorator){
    this.m_decorators.push(d);
    return this;
  }

  make(): DecoratedBlock{
    let styles: CSSProperties[] = [];
    for (let dim of this.m_block.dimensions){
      let s = {} as CSSProperties;
      for (let decorate of this.m_decorators){
        decorate(dim, s);
      }
      styles.push(s);
    }
    
    return new DecoratedBlock(
      this.m_block.id,
      this.m_block.rangeCache, 
      this.m_block.dimensions, 
      styles);
  }
}