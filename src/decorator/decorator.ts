import { DefaultColor, DefaultOpacity, DefaultZIndex } from '../constants';
import { Dimension } from '../core/data';
import {CSSProperties} from '@types/react';

export interface Decorator { (dim: Dimension, styles: CSSProperties): void; }

export function basicDecorator(dim: Dimension, styles: CSSProperties): void{
  styles.position = "absolute";
  styles.top = dim.Top;
  styles.left = dim.Left;
  styles.width = dim.Width;
  styles.height = dim.Height;
  styles.backgroundColor = DefaultColor();
  styles.opacity = DefaultOpacity();
  styles.zIndex = DefaultZIndex();
  styles.pointerEvents = "none";
}