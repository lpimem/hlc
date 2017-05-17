import { DefaultItemRowClass } from './consts';
import {
  BlockDecorator,
  BlockDecoratorFactory,
  DefaultBlockDecorator,
  DefaultBlockDecoratorFactory
} from '../decorator/decorator';


export enum Option {
  Default,
  Option1,
  Option2,
  Option3,
}

export function getOptName(opt: Option): string{
  return Option[opt];
}

let decorators: { [name: string]: BlockDecorator } = {
  "Default": DefaultBlockDecorator(),
  "Option1": null,
  "Option2": null,
  "Option3": null
};

let decoratorCssClasses : {[name:string]: string} = {
  "Default": DefaultItemRowClass(),
  "Option1": "hlcir_option_1",
  "Option2": "hlcir_option_2",
  "Option3": "hlcir_option_3"
};

export function getCssClassName(opt: string | Option){ 
  if (typeof opt != 'string'){
    opt = getOptName(opt as Option);
  }
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
