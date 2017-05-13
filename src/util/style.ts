import * as logger from "logez";

export function getZIndex(styles: CSSStyleDeclaration) :number {
  let v : string = (styles as any) ["z-index"];
  if (Boolean(Number(v))) {
    return Number(v);
  } else {
    return 0;
  }
};


function appendFirstChild(n: Element, q:Element[]): void{
  let child = n.firstElementChild;
  if (child){
    q.push(child);
  }
}

export function isVisible(styles: CSSStyleDeclaration): boolean{
  return styles["visibility"]!= "hidden" && styles["display"] != "none";
}

export function getPosition(styles: CSSStyleDeclaration): string{
  return styles["position"];
}

/**
 * refer to https://developer.mozilla.org/en-US/docs/Web/CSS/z-index
 * @return the max z-index value in the local scope of e. 
 * If no z-index is specified, return 0.
 */
export function getMaxLocalZIndex(w: Window, e: Node, ignoreClass?:string[]) {
  // find local scope root
  let scopeTop: HTMLElement = e.parentElement;
  while (scopeTop != w.document.body) {
    let styles = w.getComputedStyle(scopeTop);
    if (getPosition(styles) != 'static' && getZIndex(styles) > 0) {
      break;
    }
    scopeTop = scopeTop.parentElement;
  }
  // console && console.info('Found zindex scope root:', scopeTop);
  let q: Element[] = [];
  let max = 0;
  if (scopeTop && scopeTop.firstElementChild) {
    q.push(scopeTop.firstElementChild);
  }
  // find max zindex in local scope
  while (q.length > 0) {
    let n = q.shift();
    if (n.nextElementSibling) {
        q.splice(0, 0, n.nextElementSibling);
    }
    if (n.nodeType != Node.ELEMENT_NODE) continue;
    let el :HTMLElement = n as HTMLElement;
    let styles = w.getComputedStyle(el);
    if (getPosition(styles) != "fixed"){
      appendFirstChild(n, q);
      continue;
    }
    let v = getZIndex(styles);
    // dive in only when there is no new scope
    if (v <= 0) {
      appendFirstChild(n, q);
      continue;
    }
    if (v > 1) {
      if (ignoreClass){
        let ignore = false;
        let classes = (n as HTMLElement).classList;
        for (let i = 0; i < classes.length; i ++){
          if (ignoreClass.indexOf(classes.item(i)) > -1){
            ignore = true;
            logger.debug(`zindex: ignored as class is ${classes.item(i)}`);
            break;
          }
        }
        if (ignore){
          continue;
        }
      }
      if (!isVisible(styles)){
        logger.debug(`zindex: ignored as is invisible.`);
        logger.debug(n);
        continue;
      }
      // console && console.debug("found fix-positioned z-indexed element: ", n, v);
      if (max < 1 || v < max){
        max = v;
      }
    }
  }
  return max;
}