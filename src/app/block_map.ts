import { Block } from 'rangeblock';

interface IBlockMap {
  [blockId: string]: Block;
}

export class BlockMap {

  public addBlock(block: Block): void{
    this.m_blockMap[block.id] = block;
  }

  public getBlock(id: string){
    return this.m_blockMap[id];
  }

  public getKeys(): string[]{
    return Object.keys(this.m_blockMap);
  }

  public deleteBlock(blockId: string): void{
    delete this.m_blockMap[blockId];
  }

  private m_blockMap = {} as IBlockMap;
}

let _global_ins : BlockMap = new BlockMap();
export function getGlobalBlockMap(): BlockMap{
  return _global_ins;
}