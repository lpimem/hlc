import { debug } from './util/log';

export function afterDocLoad(callback:EventListener){
  if (document){
    if (document.readyState == "loading"){
      document.addEventListener("load", callback);
    } else {
      callback(null);
    }
  } else {
    window.addEventListener("load", callback);
  }
}
