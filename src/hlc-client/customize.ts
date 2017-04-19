import { IApp } from '../app/app_define';
import * as configs from '../global/configure';
import * as cs_client from '../message/cs-client';
import {ChangeBlockConfigRequest} from '../message/define';
import * as msg from '../message/define';
import * as logger from 'logez';

/** 
 * Customize via chrome extension background page
 */
export function addRequestListeners(app: IApp){
  cs_client.addMessageListener(msg.ChangeBlockConfig.LABEL,(r: ChangeBlockConfigRequest, send)=>{
    let currentCfg = configs.getBlockRenderConfig();
    let current = currentCfg.decoratorName;
    let newValue = r.newConfig.decoratorName;

    if (!configs.isEnabled() && newValue){
      try{
        let suc = app.highlightSelection(r.newConfig);
        if (suc){
          send("");
          return;
        } else {
          configs.toggleEnabled();
        }
      }catch(ignore){logger.debug(ignore);}
    }

    if (current == newValue){
      let enabled = configs.toggleEnabled();
      if (!enabled){
        newValue = "";
      }
    } else {
      configs.setBlockRenderOption(newValue);
    }
    logger.debug(`active block config: [${newValue}]`);
    send(newValue);
  });

  cs_client.addMessageListener(msg.QueryCurrentConfig.LABEL,(r: void, send)=>{
    let current :string = "";
    if (configs.isEnabled()){
      current = configs.getBlockRenderConfig().decoratorName;
    }
    logger.debug(`current config: ${current}`);
    send(current);
  });
}