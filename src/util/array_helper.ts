export function extend(a: Array<any>, b: Array<any>): void{
  for (let o of b){
    a.push(o);
  }
}