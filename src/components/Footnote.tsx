import { debug } from '../util/log';
import { Item } from './Item';
import { DecoratedBlock } from '../decorator/decorated_block';
import * as React from "react";

interface FootnoteProps {
  id: string
  source?: {
    get: ()=>DecoratedBlock[]
    poll: boolean
    interval?: number
  }
  onMount: (instance: Footnote) => void
}

interface FootnoteState {
  highlights: DecoratedBlock[]
}

export class Footnote extends React.Component<FootnoteProps, FootnoteState>{
  constructor() {
    super();
    this.state = { highlights: [] } as FootnoteState;
  }

  componentDidMount() {
    if (this.props.source) {
      this.addBatch(this.props.source.get());
      if (this.props.source.poll){
        setInterval(()=>{
          this.addBatch(this.props.source.get());
        }, this.props.source.interval);
      }
    }
    this.props.onMount(this);
  }

  addHighlight(h: DecoratedBlock) {
    this.addBatch([h]);
  }

  addBatch(hs: DecoratedBlock[]) {
    let hlts = this.state.highlights.slice();
    for (let h of hs) {
      hlts.push(h);
    }
    this.setState({ highlights: hlts });
  }

  onHighlightClick(i: number, e: MouseEvent) {
    debug(`${i} was clicked.`)
  }

  render(): JSX.Element {
    return <div id={this.props.id} >
      {this.state.highlights.map((blk, idx) =>
        <Item
          key={blk.id}
          block={blk}
          onClick={(e: MouseEvent) => this.onHighlightClick(idx, e)} />)}
    </div>;
  }
}