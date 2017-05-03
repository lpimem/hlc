import { Block } from 'rangeblock';
import { BlockDecorator } from '../decorator/decorator';

export interface IApp{
  /**
   * If user selected some text in the current window, highlight it.
   * Else do nothing.
   * @param renderOption: instructions on how the highlights should be rendered
   * @param onSuccess: [optional] callback upon successful highlight
   * @param onFail: [optional] callback when no highlight is generated
   */
  highlightSelection(renderOption?: IBlockConfig, 
                     onSuccess?: (block: Block)=>void,
                     onFail?:(reason: string)=>void): void;

  /**
   * remove a highlighted block with given id
   * @param blockId: ID of the block to remove from the app
   * @param onSuccess: [optional] callback upon successful delete
   * @param onFail: [optional] callback upon failed delete
   */
  removeHighlight(blockId: string, 
                  onSuccess?:(blockId: string)=>void, 
                  onFail?: (blockId: string, reason: string)=>void): void;

  /** 
   * @return the text content of a block
   */
  getText(blockId: string): string;

  /**
   * Copy content of a block to clipboard
   * Requires browser support.
   * @return success or not.
   */
  copy(blockId: string): boolean ;

  /**
   * Generate notes of highlighted text in markdown format.
   */
  generateMarkdownNotes(): string;
}

export interface IBlockConfig{
  decoratorName?: string;
  decorator? : BlockDecorator;
}