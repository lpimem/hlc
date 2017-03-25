import * as React from "react";
import { CSSProperties } from "react";

export interface RowProps{
  style: CSSProperties;
  onMouseOver?: EventListener;
  onMouseOut?: EventListener;
  onClick?: EventListener;
}

/**
 * Row represents one highlight unit
 */
export const Row = (props: RowProps) => 
<div style={props.style}
  onClick={()=>props.onClick} 
  onMouseOver={()=>props.onMouseOver}
  onMouseOut={()=>props.onMouseOut}></div>