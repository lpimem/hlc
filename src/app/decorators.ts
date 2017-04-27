import { DefaultItemRowClass } from './consts';
import {
  BlockDecorator,
  BlockDecoratorFactory,
  DefaultBlockDecorator,
  DefaultBlockDecoratorFactory
} from '../decorator/decorator';


export enum Option {
  Default,
  PaleYellow,
  Purple,
  RedHollowGlow,
}

export function getOptName(opt: Option): string{
  return Option[opt];
}

let decorators: { [name: string]: BlockDecorator } = {
  "Default": DefaultBlockDecorator(),
  "PaleYellow": null,
  "Purple": null,
  "RedHollowGlow": null
};

let decoratorCssClasses : {[name:string]: string} = {
  "Default": DefaultItemRowClass(),
  "PaleYellow": "hlcir_pale_yellow",
  "Purple": "hlcir_purple",
  "RedHollowGlow": "hlcir_red_glow_hollow"
};

export function getCssClassName(opt: string){
  return decoratorCssClasses[opt] || DefaultItemRowClass();
}

export function getDecorator(name: string | Option): BlockDecorator {
  if (typeof name != 'string'){
    name = getOptName(name as Option);
  }
  return decorators[name]?decorators[name]: decorators["Default"];
}

export function getAllDecoratorNames(){
  let names = [];
  for (let k in decorators){
    names.push(k);
  }
  return names;
}

function buildDecorators() {
  for (let i in Option){
    if (Number(i) > 0){
      let name = Option[i];
      decorators[name] = 
        new DefaultBlockDecoratorFactory()
            .addRowClass(getCssClassName(name))
            .build();
    }
  }
}

buildDecorators();
