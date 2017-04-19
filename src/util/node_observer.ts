
export class NodeObserver {
  constructor(n: Node, callback: MutationCallback, options: MutationObserverInit = DefaultMutationObserverInit) {
    this.m_node = n;
    this.createOb(callback);
    this.m_ob.observe(this.m_node, {});
  }

  start(options?: MutationObserverInit) {
    if (!options) {
      options = DefaultMutationObserverInit;
    }
  }

  stop(): MutationRecord[] {
    let r = this.m_ob.takeRecords();
    this.m_ob.disconnect();
    return r;
  }

  private createOb(callback: MutationCallback) {
    this.m_ob = new MutationObserver(callback);
  }

  private m_node: Node;
  private m_ob: MutationObserver;
}

var DefaultMutationObserverInit: MutationObserverInit = {
  attributes: true,
  subtree: true,
  attributeFilter: ["style", "top", "left", "height", "width"]
};