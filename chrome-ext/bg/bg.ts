import {HLC_SERVICE_BASE} from '../../src/conf';
import {req} from '../../src/util/req';

let $ = document.getElementById.bind(document);
let HLC_UID: number = null;
let HLC_TOKEN: string = null;

function handleLoginSuccess(
    request: any, sendResponse: (msg: any) => void): boolean {
  HLC_UID = request.hlc_uid as number;
  HLC_TOKEN = request.hlc_token as string;
  chrome.storage.local.set({'hlc_uid': HLC_UID, 'hlc_token': HLC_TOKEN}, () => {
    if (chrome.runtime.lastError) {
      console.error('error saving user info', chrome.runtime.lastError);
      return;
    };
  });
  sendResponse('close');
  return false;
}

/**
 * @return should chrome runtime keep the connection or not.
 */
function onExternalMessage(
    request: any, sender: chrome.runtime.MessageSender,
    sendResponse: (msg: any) => void): boolean {
  let parts: string[] = sender.url.split('#');
  if (parts[0] != `${HLC_SERVICE_BASE}static/login.html`) {
    console.warn('message from', sender.url, 'ignored');
    return false;
  } else {
    console.info('received message: ', request);
    if (request.login_success) {
      return handleLoginSuccess(request, sendResponse);
    }
    return false;
  }
}

function onQueryLoginStatus(
    request: any, sendResponse: (msg: any) => void): boolean {
  sendResponse(HLC_UID && HLC_TOKEN);
  return false;
}

function handleLogout(request: any, sendResponse: (msg: any) => void): boolean {
  const uri = `${HLC_SERVICE_BASE}logout`;
  req('POST', uri, null,
      (resp: any) => {
        HLC_UID = null;
        HLC_TOKEN = null;
        sendResponse(true);
      },
      (reason: string) => {
        sendResponse(false);
      });
  return true;
}

/**
 * 
 * @return true if runtime should keep the connection
 */
function onMessage(
    request: any, sender: chrome.runtime.MessageSender,
    sendResponse: (msg: any) => void): boolean {
  if (sender.tab) {
    return false;
  }
  let keepConnection = false;
  if (request.queryLogin) {
    keepConnection = onQueryLoginStatus(request, sendResponse);
  } else if (request.doLogout) {
    keepConnection = handleLogout(request, sendResponse);
  }
  return keepConnection;
}

function registerMessageHandlers() {
  chrome.runtime.onMessageExternal.addListener(onExternalMessage);
  chrome.runtime.onMessage.addListener(onMessage);
}

export function init() {
  registerMessageHandlers();
}
init();