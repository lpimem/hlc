import { IBlockConfig } from '../app/app_define';

export interface CSMessage<T>{
  type: string;
  req: T;
}

export interface ChangeBlockConfigRequest {
  newConfig: IBlockConfig;
}

export class ChangeBlockConfig implements CSMessage<ChangeBlockConfigRequest>{
  static get LABEL(): string{
    return "ChangeBlockConfig";
  }

  public type : string = ChangeBlockConfig.LABEL;
  public req : ChangeBlockConfigRequest = {
    newConfig: {
      decoratorName: null,
    }
  };

  constructor(decoratorName: string){
    this.req.newConfig.decoratorName = decoratorName;
  }
}

export class QueryCurrentConfig implements CSMessage<void>{
  static get LABEL(): string{
    return "QueryCurrentConfig";
  }
  public type : string = QueryCurrentConfig.LABEL;
  public req : void =  null;
}