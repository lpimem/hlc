import { BlockStyle } from '../decorator/block_style';
import { debug } from 'logez';
import { Item, ItemProps, RowOptions } from './Item';
import * as React from "react";

interface FootnoteProps {
  id: string;
  styleClass?: string;
  source?: () => BlockStyle[];
  onMount: (instance: Footnote) => void;
  rowOptions?: RowOptions;
}

interface FootnoteState {
  highlights: BlockStyle[];
}

export class Footnote extends React.Component<FootnoteProps, FootnoteState>{
  constructor() {
    super();
    this.state = { highlights: [] } as FootnoteState;
  }

  componentDidMount() {
    if (this.props.source) {
      this.addBatch(this.props.source());
    }
    this.props.onMount(this);
  }

  addHighlight(h: BlockStyle) {
    this.addBatch([h]);
  }

  addBatch(hs: BlockStyle[]) {
    let hlts = this.state.highlights.slice();
    for (let h of hs) {
      hlts.push(h);
      debug(`adding highlight ${h.id}`);
    }
    this.setState({ highlights: hlts });
  }

  removeHighlight(id: string): boolean {
    let hlts = this.state.highlights.slice();
    let found = false;
    for (let idx = 0; idx < hlts.length; idx++) {
      let h = hlts[idx];
      if (h.id == id) {
        hlts.splice(idx, 1);
        found = true;
        this.setState({ highlights: hlts });
        break;
      }
    }
    return found;
  }

  removeAll(): BlockStyle[] {
    let all = this.getAll();
    this.setState({ highlights: [] });
    return all;
  }

  getAll(): BlockStyle[]{
    return this.state.highlights.slice();
  }

  render(): JSX.Element {
    return <div id={this.props.id} className={this.props.styleClass}>
      {this.state.highlights.map((blk, idx) =>
        <Item
          key={blk.id}
          id ={blk.id}
          layouts={blk.RowLayouts}
          containerClass={blk.ItemClass}
          rowStyleClass = {blk.RowClass}
          rowOptions= {this.props.rowOptions} />)}
    </div>;
  }
}