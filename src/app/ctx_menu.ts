import { debug } from 'logez';
import { IApp } from './app_define';

import * as JsCtxMenu from 'js-ctx-menu/dist';

export interface ItemCtxMenuOptions{
  onDelete: (blockId: string) =>void;
  onCopy: (blockId: string) =>boolean;
}

export class ItemCtxMenu{

  constructor(doc: Document, container: HTMLElement, options?: ItemCtxMenuOptions){
    this.m_container =  container;
    this.m_doc = doc;
    this.m_options = options;
    this.buildMenu();
  }
  public showFor(blockId: string, evt: MouseEvent){
    this.setBlockId(blockId);
    this.m_menu.showAt(evt.clientX, evt.clientY);
  }

  public configure(options: ItemCtxMenuOptions){
    this.m_options = options;
  }

  private setBlockId(blockId: string){
    this.m_blockId = blockId;
  }

  private buildMenu(){
    this.m_menu = JsCtxMenu.createMenu(this.m_doc, this.m_container, [
      {
        label: "Delete",
        content: (e)=>{this.onDelete(this.m_blockId);}
      },
      {
        label: "Copy",
        content: (e)=>{
          this.onCopy(this.m_blockId);
        }
      }
    ]);
  }

  private onDelete(id: string){
    this.m_options && this.m_options.onDelete(id);
  }

  private onCopy(id: string){
    if (this.m_options && this.m_options.onCopy(id)){
      debug("block text copied");
    }
  }

  private m_blockId: string;

  private m_doc : Document;
  private m_container: HTMLElement;
  private m_menu : JsCtxMenu.ContextMenu;
  private m_options: ItemCtxMenuOptions;
}