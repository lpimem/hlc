import { IBlockConfig } from '../app/app_define';
import * as decorators from '../app/decorators';
import * as logger from 'logez';

let enabled = false;

let blockRenderConfig : IBlockConfig = {
    decoratorName: decorators.getOptName(decorators.Option.Default)
  };

export function getBlockRenderConfig(): IBlockConfig{
  return blockRenderConfig;
}

export function setBlockRenderOption(opt: string | decorators.Option):IBlockConfig{
  opt = (typeof opt == "string" )? decorators.Option[opt as any]: opt;
  blockRenderConfig = {
    decoratorName: decorators.getOptName(opt as decorators.Option),
  };
  return blockRenderConfig;
}

export function setEnabled(option: boolean): boolean{
  enabled = option;
  return enabled;
}

export function isEnabled(): boolean{
  return enabled;
}

export function toggleEnabled(): boolean{
  enabled = !enabled;
  logger.debug(`app status changed to: [${enabled?'enabled':'disabled'}]`);
  return enabled;
}