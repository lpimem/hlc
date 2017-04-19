import { Row } from './Row';
import * as React from "react";
import { CSSProperties } from "react";

export interface ItemProps {
  /* item id */
  id: string;
  /* class name for the invisible container of visible highlights */
  containerClass?: string;
  /* class name for visible highlights */
  rowStyleClass?: string;
  /* layouts for each highlights */
  layouts: CSSProperties[];
  /* options to generate raw props */
  rowOptions?: RowOptions;
}

export interface RowOptions {
  onClick: (id: string, e: MouseEvent) => void;
  onContextMenu: (id: string, e: MouseEvent) => void;
}

export class Item extends React.Component<ItemProps, any>{
  constructor() {
    super();
  }

  onClick(evt: React.MouseEvent<HTMLElement>) {
    this.props.rowOptions.onClick(this.props.id, evt as any);
  }

  onContextMenu(evt: React.MouseEvent<HTMLElement>) {
    this.props.rowOptions.onContextMenu(this.props.id, evt as any);
  }

  render(): JSX.Element {
    return <div className={this.props.containerClass}>
      {this.props.layouts.map(
        (stl, i) =>
          <Row key={i}
            className={this.props.rowStyleClass}
            style={stl}
            onClick={(e) => this.onClick(e)}
            onContextMenu={(e) => this.onContextMenu(e)} />)}
    </div>;
  }
}