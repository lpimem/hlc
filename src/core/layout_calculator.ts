import {Dimension} from "./data";

export interface LayoutCalculator{
  (doc: Document, el: HTMLElement): Dimension
}