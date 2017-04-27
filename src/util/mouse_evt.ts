export function monitorDelayedMouseDownEvent(e: HTMLElement, delay: number): string{
  const evtname = `mousedown_for_${delay}`;
  let timer : any = null;
  e.addEventListener("mouseup", (evt)=>{
    if (timer){
      clearTimeout(timer);
      timer = null;
    }
  });
  e.addEventListener("mousedown", (evt)=>{
    if (timer){
      clearTimeout(timer);
    }
    // only handles main key events
    if (evt.button != 0 ){
      return;
    }
    timer = setTimeout(()=>{
      timer = null;
      // raise event;
      e.dispatchEvent(new CustomEvent(evtname));
    }, delay);
  });
  return evtname;
}