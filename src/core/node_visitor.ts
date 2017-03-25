import {Dimension, NodeContext} from './data';

export interface NodeVisitor {
  (n: Node, ctx: NodeContext, start: number, end: number): void;
}

