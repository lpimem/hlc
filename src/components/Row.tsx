import * as React from "react";

export interface RowProps{
  onClick: React.MouseEventHandler<HTMLElement>;
  onContextMenu: React.MouseEventHandler<HTMLElement>;
  className: string;
  style: React.CSSProperties;
}

/**
 * Row represents one highlight unit
 */
export const Row = (props: RowProps) => 
  <div {...props}></div>;