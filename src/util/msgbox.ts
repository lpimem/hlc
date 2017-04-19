import { warn } from 'logez';

let box: HTMLDivElement = null;
let mbox : HTMLElement = null;

export function init() {
  if (box != null) {
    return;
  }
  let d = top.document;
  const color = "beige";
  box = d.createElement("div");
  box.className = "hlc_msgbox";
  mbox = d.createElement("pre");
  box.appendChild(mbox);
  let cl = d.createElement("div");
  cl.style.width = "30px";
  cl.style.height = "30px";
  cl.innerText = "X";
  cl.style.position = "absolute";
  cl.style.top = "5px";
  cl.style.right = "5px";
  cl.style.marginRight = "15px";
  cl.style.textAlign = "center";
  cl.style.verticalAlign = "middle";
  cl.style.lineHeight = "30px";
  cl.style.border = "1px black dashed";
  cl.style.opacity = "0.25";
  cl.style.boxShadow = "0 0 0";
  cl.style.cursor = "pointer";
  box.appendChild(cl);
  d.body.appendChild(box);
  cl.addEventListener("click", hide);
  cl.addEventListener("mouseover", function () {
    cl.style.opacity = "0.85";
    cl.style.boxShadow = "0 1px 5px rgba(0,0,0,0.25)";
  });
  cl.addEventListener("mouseout", function () {
    cl.style.opacity = "0.25";
    cl.style.boxShadow = "0 0 0";
  });
  hide();
}

export function show(msg: string) {
  if (box) {
    mbox.textContent = `${msg}\r\n`;
    box.style.display = "block";
  } else {
    warn("msgbox is not inited");
  }
}

export function hide() {
  if (box) {
    box.style.display = "none";
  }
}

export function setBoxStyle(style: CSSStyleDeclaration) {
  for (let k in style) {
    box.style[k] = style[k];
  }
}

export function move(left: number, top: number, unit: string = 'px') {
  box.style.left = `${left}${unit}`;
  box.style.top = `${top}${unit}`;
}

export function resize(width?: number, height?: number, unit?: string) {
  if (!unit) {
    unit = "px";
  }
  let w = width ? `${width}${unit}` : "auto";
  let h = height ? `${height}${unit}` : "auto";
  box.style.width = w;
  box.style.height = h;
}

export function isOpen(): boolean {
  return box.style.display != "none";
}