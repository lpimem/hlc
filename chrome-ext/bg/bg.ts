import {HLC_SERVICE_BASE} from '../../src/conf';

let $ = document.getElementById.bind(document);
let HLC_UID: number = null;
let HLC_TOKEN: string = null;

function onExternalMessage(
    request: any, sender: any, sendResponse: (msg: any) => void): boolean {
  let parts :string[] = sender.url.split("#");
  if (parts[0] != `${HLC_SERVICE_BASE}static/login.html`) {
    console.warn('message from', sender.url, 'ignored');
    return false;
  } else {
    console.info('received message: ', request);
    if (request.login_success) {
      HLC_UID = request.hlc_uid as number;
      HLC_TOKEN = request.hlc_token as string;
      chrome.storage.local.set(
          {'hlc_uid': HLC_UID, 'hlc_token': HLC_TOKEN}, () => {
            if (chrome.runtime.lastError) {
              console.error('error saving user info', chrome.runtime.lastError);
              return;
            }
            setTimeout(() => {
              sendResponse('close');
            }, 200);
          });
      return true;
    }
    return false;
  }
}

function registerLogInMessageReceiver() {
  chrome.runtime.onMessageExternal.addListener(onExternalMessage);
}

export function init() {
  registerLogInMessageReceiver();
}
init();