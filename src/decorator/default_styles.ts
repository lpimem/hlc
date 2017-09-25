import * as CONSTS from '../app/consts';
import * as Decorations from "../app/decorators";
import { createStyleSheet } from 'hlc-js-helpers';


export function addDefaultStyles(doc: Document){
  let defaultRules : string = `
.${CONSTS.DefaultItemRowClass()}, 
.${CONSTS.DefaultFootnoteItemClass()}, 
.${CONSTS.DefaultFootnoteClass()}, 
.${CONSTS.DefaultFootnoteContainerClass()}{
  border: 0;
}

.${CONSTS.NoPointerEventsClass()}{
  pointer-events: none;
}

.${CONSTS.DefaultItemRowClass()} {
  background-color: #FFFF00;
  opacity: ${CONSTS.DefaultOpacity()};
  z-index: ${CONSTS.DefaultZIndex()};
  border-radius: 3px;
  box-shadow: 0 1px 5px rgba(0,0,0,0.25);
  padding: 0;
  margin: 0;
}

.${Decorations.getCssClassName(Decorations.Option.Option1)}{
  background-color: #00A0FF;
  opacity: 0.28;
}

.${Decorations.getCssClassName(Decorations.Option.Option2)}{
  background-color: #FF00FF;
  opacity: 0.16;
}

.${Decorations.getCssClassName(Decorations.Option.Option3)} {
    opacity: 0.50;
    background-color: transparent;
    box-shadow: none;
    border-bottom: #FF0000 2px solid;
}

/** CtxMenu */
.jscm_root,
.jscm_list {
  padding: 0;
  background-color: #FFF;
  border-radius: 3px;
  box-shadow: 1px 0 5px #000;
  border: 0;
  z-index: ${CONSTS.DefaultZIndex() + 1};
}

.jscm_item {
  padding: 3px 5px 3px 5px;
  font-family: sans-serif;
  font-size : 0.8em;
  color: #000;
  border: 0;
  cursor: pointer;
}

div.jscm_item:hover {
  padding: 3px 5px 3px 5px;
  background-color: gray;
  color: #FFF;
}

.hlc_msgbox{
  position: fixed;
  top: 105px;
  background: #FFA;
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.247059) 0px 1px 5px;
  left: 50%;
  margin-left: -360px;
  width: 680px;
  height: 500px;
  z-index: ${CONSTS.DefaultZIndex() + 2};
  font-size: 1.3em;
  overflow-x: hidden;
  overflow-y: auto;
  display: block;
  border: 0;
}

.hlc_msgbox pre{
  white-space: pre-wrap;
  word-wrap: break-word;
  padding: 0px 1em;
  font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma, "Hiragino Sans GB", "Microsoft Yahei", sans-serif;
  font-size: 0.85em;
  font-weight: normal;
  border: 0;
  background: #FFA; 
  color: #333;
  box-shadow: none;
  border-radius: 0;
}
`;

  createStyleSheet(doc, defaultRules);
  
}