import { Block } from 'rangeblock';
import { BlockStyle } from './block_style';
import * as APP_CONSTS from "../app/consts";

export interface BlockDecorator{
  (block: Block): BlockStyle;
}

export class BlockDecoratorFactory{

  public addRowClass(className: string): BlockDecoratorFactory{
    this.m_classes.push(className);
    return this;
  }

  public addRowContainerClass(className: string): BlockDecoratorFactory{
    this.m_item_classes.push(className);
    return this;
  }

  public build(): BlockDecorator{
    let classNames = this.m_classes.join(" ");
    let itemClassNames = this.m_item_classes.join(" ");
    return (block: Block)=>{return BlockStyle.make(block, classNames, itemClassNames);};
  }

  private m_classes: string[] = [];
  private m_item_classes: string[] = [];
}

export class DefaultBlockDecoratorFactory extends BlockDecoratorFactory{
  constructor(){
    super();
    super.addRowClass(APP_CONSTS.DefaultItemRowClass())
         .addRowContainerClass(APP_CONSTS.DefaultFootnoteItemClass());
  }
}

export function DefaultBlockDecorator(): BlockDecorator{
  return new DefaultBlockDecoratorFactory().build();
}