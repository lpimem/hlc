import { debug } from 'logez';

export function afterDocLoad(callback:EventListener){
  if (document){
    if (document.readyState == "loading"){
      debug("document listener");
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      debug("loaded, call directly");
      callback(null);
    }
  } else {
    debug("window onload");
    window.addEventListener("load", callback);
    window.onload = callback;
  }
}
