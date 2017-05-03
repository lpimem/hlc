import { IApp } from './app/app_define';
import { Client } from './hlc-client/client';
import { addRequestListeners } from './hlc-client/customize';
import * as auth from './hlc-client/auth';
import { HlcSrvAPI } from './hlc-client/hlcsrv_api';
import { DefaultBlockDecorator } from './decorator/decorator';
import { addDefaultStyles } from './decorator/default_styles';
import { afterDocLoad } from './onload';
import {HLC_SERVICE_BASE, LOG_LEVEL} from './conf';
import * as config from "./global/configure";
import * as MsgClient from "./message/cs-client";
import * as logger from 'logez';
import * as MsgBox from './util/msgbox';
import * as ctxMenu from 'js-ctx-menu/dist';
import * as jskbd from 'jskbd';

logger.setLogLevel(LOG_LEVEL);

function isEnabled() {
  return config.isEnabled() && !MsgBox.isOpen();
}

function init(doc: Document) {
  logger.info("- - - - H L C - - - -");
  auth.login((uid, token)=>{
    logger.info("logged in. ");
    createApp(doc, uid, token);
  }, ()=>{
    logger.error("cannot login hlc service");
    auth.monitorLocalChange(()=>{
      createApp(doc, HlcSrvAPI.getUID(), HlcSrvAPI.getToken());
    });
  });
}

function createApp(doc: Document, uid:number, token: string){
  let api = new HlcSrvAPI(doc.defaultView, `${HLC_SERVICE_BASE}`, token);
  let app: IApp = new Client(uid, doc, api);
  MsgBox.init();
  addEventListeners(doc, app);
  addShortcuts(app);
  addRequestListeners(app);
  MsgClient.start();
  patchStyle(doc);
  logger.info("hlc inited.");
}

function patchStyle(doc: Document){
  addDefaultStyles(doc);
  ctxMenu.patchDefaultStyle(doc);
}

function addEventListeners(doc: Document, app: IApp) {
  doc.addEventListener("mouseup", (evt) => {
    if (evt.button == 0 && isEnabled()) {
      let cfg = config.getBlockRenderConfig();
      app.highlightSelection(cfg);
    }
  });
}

function quickHighlightOrSwitchMode(app: IApp): void{
  let cfg = config.getBlockRenderConfig();
  if (!config.isEnabled()){
    app.highlightSelection(cfg, null, ()=>{
      config.toggleEnabled();
    });
  } else {
    config.toggleEnabled();
  }
}

function addShortcuts(app: IApp) {
  jskbd.setShortcut([jskbd.ALT_LEFT], "KeyV", () => {
    quickHighlightOrSwitchMode(app);
  });

  jskbd.setShortcut([jskbd.CTRL_LEFT], "KeyG", () => {
    let md = app.generateMarkdownNotes();
    MsgBox.show(md);
  });

  jskbd.setShortcut([jskbd.CTRL_LEFT], "KeyD", () => {
    (app as Client).deleteAll();
  });
  jskbd.start(window);
}

afterDocLoad(() => {
  init(document);
});