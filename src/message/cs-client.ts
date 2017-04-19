import { error, info } from "logez";
import { CSMessage } from "./define";

let handlers: { [msgtype: string]: (request: any, sendMessage: (resp: any) => void) => void } = {};

export function addMessageListener(
    msgtype: string, 
    callback: (request: any, sendMessage: (resp:any)=>void)=>void){
  info(`registering message listener: ${msgtype}`);
  handlers[msgtype] = callback;
}

export function deleteMessageListener(msgtype:string){
  info(`deleting message listener: ${msgtype}`);
  delete handlers[msgtype];
}

export function start(){
  chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse)=>{
      if (!ensureFromExtension(sender)){
        return;
      }
      let msg = request as CSMessage<any>;
      if (handlers[msg.type]){
        handlers[msg.type](msg.req, sendResponse);
      } else {
        error(`Cannot find handler for message ${msg.type} - ${msg.req}`);
        info(handlers);
      }
    }
  );
}

function ensureFromExtension(sender: chrome.runtime.MessageSender): boolean{
  return !Boolean(sender.tab);
}