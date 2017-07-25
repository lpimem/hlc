import * as logez from 'logez/dist';

import {HlcSrvAPI} from './hlcsrv_api';

function checkLocalCredential(
    onLogin: (uid: number, token: string) => void, onFail: () => void) {
  chrome.storage.local.get(['hlc_uid', 'hlc_token'], (data) => {
    if (chrome.runtime.lastError) {
      onFail();
    } else {
      if (data['hlc_uid'] && data['hlc_token']) {
        onLogin(data['hlc_uid'], data['hlc_token']);
      } else {
        onFail();
      }
    }
  });
}

export function logout(onLogout: () => void) {
  chrome.storage.local.clear(onLogout);
}

// function showErrorBadge(){
//   chrome.browserAction.setBadgeText({text: "x"});
//   chrome.browserAction.setBadgeBackgroundColor({color:"red"})
// }

// function hideErrorBadge(){
//   chrome.browserAction.setBadgeText({text: null});
//   chrome.browserAction.setBadgeBackgroundColor({color: null})
// }

// function notifyExtension(onLogin: (uid: number, token: string) => void,
// onFail?: () => void){
//   onFail = onFail? onFail : ()=>{};
//   chrome.runtime.sendMessage({status: "unauthenticated"}, function(response){
//     if (chrome.runtime.lastError){
//       error(chrome.runtime.lastError.message);
//       onFail();
//       showErrorBadge();
//       return
//     }
//     if (response.retry){
//       login(onLogin, onFail);
//     } else {
//       onFail();
//     }
//   });
// }

export function monitorLocalChange(onLogin: () => void) {
  logez.info('waiting for logging in');
  chrome.storage.onChanged.addListener((changes, ns) => {
    let flags = 0;
    for (let key in changes) {
      if (key === 'hlc_uid') {
        HlcSrvAPI.setUID(changes[key].newValue);
        flags += 1;
      } else if (key === 'hlc_token') {
        HlcSrvAPI.setToken(changes[key].newValue);
        flags += 10;
      }
    }
    if (flags == 11) {
      onLogin();
    }
  });
}

export function login(
    onLogin: (uid: number, token: string) => void, onFail?: () => void): void {
  checkLocalCredential(onLogin, onFail);
}