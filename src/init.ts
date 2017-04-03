import { debug, error } from './util/log';
import { App } from './app';
import { afterDocLoad } from "./onload";
import * as jskbd from "jskbd"; 

let enabled :boolean = false;

function init(doc: Document){
  let app = new App(doc);
  doc.addEventListener("mouseup", ()=>{
    if (enabled){
      app.highlightSelection();
    }
  });
  addShortcuts(app);
}

function addShortcuts(app: App){
  jskbd.setShortcut([jskbd.ALT_LEFT], "KeyV", ()=>{
    if (!enabled && app.highlightSelection()){
      return;
    } else {
      enabled = !enabled;
      debug(`Highlighter enabled: ${enabled}`);
    }
  });
  jskbd.start(window);
}

afterDocLoad(()=>{
  init(document);
});