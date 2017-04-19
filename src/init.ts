import { IApp, IAppOptions } from './app/app_define';
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
import * as logez from 'logez';
import * as MsgBox from './util/msgbox';
import * as ctxMenu from 'js-ctx-menu/dist';
import * as jskbd from 'jskbd';

logez.setLogLevel(LOG_LEVEL);

function isEnabled() {
  return config.isEnabled() && !MsgBox.isOpen();
}

function init(doc: Document) {
  logez.info("- - - - H L C - - - -");
  auth.login((uid, token)=>{
    logez.info("logged in. ");
    createApp(doc, uid, token);
  }, ()=>{
    logez.error("cannot login hlc service");
    auth.monitorLocalChange(()=>{
      createApp(doc, HlcSrvAPI.getUID(), HlcSrvAPI.getToken());
    });
  });
}

function createApp(doc: Document, uid:number, token: string){
  let api = new HlcSrvAPI(doc.defaultView, `${HLC_SERVICE_BASE}`, token);
  let app: IApp = new Client(uid, doc, api);
  app.configure(uiOptions());
  MsgBox.init();
  addEventListeners(doc, app);
  addShortcuts(app);
  addRequestListeners(app);
  MsgClient.start();
  patchStyle(doc);
  logez.info("hlc inited.");
}

function uiOptions(): IAppOptions{
  return {
    blockDecorator: DefaultBlockDecorator()
  };
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

function addShortcuts(app: IApp) {
  jskbd.setShortcut([jskbd.ALT_LEFT], "KeyV", () => {
    if (!config.isEnabled() && app.highlightSelection()) {
      return;
    } else {
      let enabled = config.toggleEnabled();
      logez.debug(`Highlighter enabled: ${enabled}`);
    }
  });

  jskbd.setShortcut([jskbd.CTRL_LEFT], "KeyG", () => {
    let md = app.generateMarkdownNotes();
    MsgBox.show(md);
  });
  jskbd.start(window);
}

afterDocLoad(() => {
  init(document);
});