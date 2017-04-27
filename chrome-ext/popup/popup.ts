import * as MsgDefine from "../../src/message/define";
import {HLC_SERVICE_BASE} from "../../src/conf";

let $ = document.getElementById.bind(document);


export function checkLoggedIn(onLogin: () => void, onFail: () => void) {
  chrome.runtime.sendMessage({
    queryLogin: true
  }, (resp:boolean)=>{
    if (chrome.runtime.lastError || !resp){
      console.error(chrome.runtime.lastError);
      onFail();
    } else {
      onLogin();
    }
  });
}

export function openLogInWindow(): void {
  console.info("opening window...");
  let [w, h] = [400, 600];
  let [left, top] = calculateCenterCoord(w, h);
  chrome.windows.create({
    'url': `${HLC_SERVICE_BASE}static/login.html#${chrome.runtime.id}`,
    'type': 'popup',
    'width': w,
    'height': h,
    'left': left,
    'top': top
  }, (w) => { });
}

function calculateCenterCoord(w: number, h: number): [number, number] {
  var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : (screen as any).left;
  var dualScreenTop = window.screenTop != undefined ? window.screenTop : (screen as any).top;
  var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
  var left = dualScreenLeft - (w / 2);
  var top = dualScreenTop - (h / 2) + height / 2;
  return [Math.round(left), Math.round(top)];
}

export function logout(onLogout: () => void) {
  chrome.runtime.sendMessage({
    doLogout: true
  }, (resp:boolean)=>{
    if (chrome.runtime.lastError || !resp){
      return;
    } else {
      onLogout();
    }
  });
}

function queryActiveTab(request: MsgDefine.CSMessage<any>, onSuccess:(resp:any)=>void, onFail: (reason: string)=>void){
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.debug("sending message to ", tabs[0].id);
    chrome.tabs.sendMessage(tabs[0].id, request, (resp) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        onFail(chrome.runtime.lastError.message);
      } else {
        onSuccess(resp);
      }
    });
  });
}

export function queryCurrentConfig(onSuc: (option: string) => void, onFail: (reason: string)=>void){
  let request = new MsgDefine.QueryCurrentConfig();
  queryActiveTab(request, onSuc, onFail);
}

export function changeCSConfig(option: string,
                               onSuc: (option: string) => void,
                               onFail: (reason: string)=>void) {
  let request = new MsgDefine.ChangeBlockConfig(option);
  queryActiveTab(request, onSuc, onFail);
}