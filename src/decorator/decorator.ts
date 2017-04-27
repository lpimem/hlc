import { Block } from 'rangeblock';
import { BlockStyle } from './block_style';
import * as APP_CONSTS from "../app/consts";

export interface BlockDecorator{
  (block: Block): BlockStyle;
}

export class BlockDecoratorFactory{

  public static fromStyle(style: BlockStyle): BlockDecoratorFactory{
    let f = new BlockDecoratorFactory();
    f.addRowContainerClass(style.ItemClass);
    f.addRowClass(style.RowClass);
    return f;
  }

  public clone(): BlockDecoratorFactory{
    let f = new BlockDecoratorFactory();
    f.m_classes = this.m_classes.slice();
    f.m_item_classes = this.m_item_classes.slice();
    f.m_classes_remove = this.m_classes_remove.slice();
    f.m_item_classes_remove = this.m_item_classes_remove.slice();
    return f;
  }

  public insertRowClass(className : string): BlockDecoratorFactory{
    this.m_classes.splice(0, 0, className);
    return this;
  }

  public addRowClass(className: string): BlockDecoratorFactory{
    this.m_classes.push(className);
    return this;
  }

  /**
   * make sure @param className is not appearing 
   */
  public removeRowClass(className: string): BlockDecoratorFactory{
    this.m_classes_remove.push(className);
    return this;
  }

  public insertRowContainerClass(className: string): BlockDecoratorFactory{
    this.m_item_classes.splice(0, 0, className);
    return this;
  }

  public addRowContainerClass(className: string): BlockDecoratorFactory{
    this.m_item_classes.push(className);
    return this;
  }

  /**
   * make sure @param className is not appearing 
   */
  public removeRowContainerClass(className: string): BlockDecoratorFactory{
    this.m_item_classes_remove.push(className);
    return this;
  }

  private doRemoveRowClasses(rowClassNames: string) :string{
    for(let toRemove of this.m_classes_remove){
      rowClassNames = rowClassNames.replace(toRemove.trim(), "");
    }
    return rowClassNames;
  }

  private doRemoveRowContainerClasses(itemClassNames: string): string{
    for(let toRemove of this.m_item_classes_remove){
      itemClassNames = itemClassNames.replace(toRemove.trim(), "");
    }
    return itemClassNames;
  }

  public build(): BlockDecorator{
    let classNames = this.m_classes.join(" ");
    classNames = this.doRemoveRowClasses(classNames);
    let itemClassNames = this.m_item_classes.join(" ");
    itemClassNames = this.doRemoveRowContainerClasses(itemClassNames);
    return (block: Block)=>{return BlockStyle.make(block, classNames, itemClassNames);};
  }

  private m_classes: string[] = [];
  private m_classes_remove: string[] = [];
  private m_item_classes: string[] = [];
  private m_item_classes_remove: string[] = [];
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