import {debug, warn} from './log';
export function asArray(collection: any) {
  return Array.prototype.slice.apply(collection);
}

export function select(w: Window, r: Range) {
  let sel = w.getSelection();
  sel.removeAllRanges();
  sel.addRange(r);
}

export function getSelectedRange(w: Window): Range {
  try {
    return w.getSelection().getRangeAt(0);
  } catch (ignore) {
    return null;
  }
}

export function clearSelection(w: Window) {
  w.getSelection().removeAllRanges();
}

/**
 * Find the first element containing n that can be used as a position anchor.
 */
export function findPositionAnchor(
    w: Window, n: Node, anchorType = 'relative'): HTMLElement {
  let e: HTMLElement = null;
  if (n.nodeType != Node.ELEMENT_NODE) {
    e = n.parentElement;
  } else {
    e = n as HTMLElement;
  }
  if (e == null) {
    throw 'no element parent found';
  }
  do {
    let stl = w.getComputedStyle(e);
    if (stl.position == anchorType) {
      return e;
    } else {
      e = e.parentElement;
    }
  } while (e);
  warn('no position anchor found, using body (static).');
  return window.document.body;
}

export function computeUniquePath(n: Node): string {
  let path = '';
  if (n.nodeType == Node.ELEMENT_NODE) {
    let e = n as HTMLElement;
    if (e.id) {
      return `#${e.id}`;
    }
  }
  if (n.nodeName == 'BODY') {
    return '';
  }
  let siblings: Node[] = asArray(n.parentNode.childNodes);
  let idx = siblings.indexOf(n);
  return computeUniquePath(n.parentNode) + `/${idx}`;
}

export function getNodeByPath(doc: Document, uPath: string): Node {
  let n: Node = doc.body;
  let parts: string[] = uPath.split('/');
  for (let p of parts) {
    if (!p.trim()) {
      continue;
    }
    if (p.indexOf('#') == 0) {
      n = doc.getElementById(p.substring(1));
      continue;
    }
    n = n.childNodes[parseInt(p)];
  }
  return n;
}

export enum BoxSizing {
  ContentBox,
  BorderBox,
}

export function getBoxSizing(w: Window, e: HTMLElement): BoxSizing {
  let bs = w.getComputedStyle(e).boxSizing;
  if (bs == 'content-box') {
    return BoxSizing.ContentBox;
  } else if (bs = 'border-box') {
    return BoxSizing.BorderBox;
  } else {
    throw 'unknown box sizing option.';
  }
}
