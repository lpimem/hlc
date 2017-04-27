import { IApp, IBlockConfig } from './app_define';


export class LocalHighlighter implements IApp{
  

  public highlightSelection(option: IBlockConfig): boolean {
    throw new Error('Not implemented yet.');
  }

  public removeHighlight(blockId: string): boolean {
    throw new Error('Not implemented yet.');
  }

  public getText(blockId: string): string {
    throw new Error('Not implemented yet.');
  }

  public copy(blockId: string): boolean {
    throw new Error('Not implemented yet.');
  }

  public generateMarkdownNotes(): string {
    throw new Error('Not implemented yet.');
  }
}