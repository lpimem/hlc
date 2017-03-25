import { App } from './app';
import { afterDocLoad } from "./onload";

function init(doc: Document){
  let app = new App(doc);
  doc.addEventListener("mouseup", ()=>{
    app.highlightSelection();
  });
}

afterDocLoad(()=>{
  init(document);
});