import { BlockDecorator } from '../decorator/decorator';
export interface IApp{

  /**
   * If user selected some text in the current window, highlight it.
   * Else do nothing.
   * @return if there is a selected block
   */
  highlightSelection(option?: IBlockConfig): boolean;

  /**
   * remove a highlighted block with given id
   * @return true if delete succeed.
   */
  removeHighlight(blockId: string): boolean;

  /** 
   * return highlighted text of block
   */
  getText(blockId: string): string;

  /**
   * copy content of a block to clipboard
   * return success or not.
   */
  copy(blockId: string): boolean ;

  /**
   * generate notes of highlighted text
   */
  generateMarkdownNotes(): string;

  /**
   * Setup app according to options
   */
  configure(options: IAppOptions): void ;
}

export interface IAppOptions{

  /**
   * Defines the styles of the highlights
   */
  blockDecorator: BlockDecorator;
}

export interface IBlockConfig{
  decoratorName: string;
}