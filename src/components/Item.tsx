import { Row } from './Row';
import { DecoratedBlock } from '../decorator/decorated_block';
import * as React from "react";

export interface ItemProps{
  block: DecoratedBlock;
  onClick?: EventListener;
}

export const Item = (props: ItemProps) => 
<div onClick={(e)=>props.onClick}>
  {props.block.styles.map((stl, i)=><Row key={i} style={stl}/>)}
</div>