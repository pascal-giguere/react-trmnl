export class ReconcilerNode {
  content?: string;
  children: ReconcilerNode[] = [];
  // Styling, layout, etc. would go here

  constructor(content?: string) {
    this.content = content;
  }

  appendChild(child: ReconcilerNode): void {
    this.children.push(child);
  }

  removeChild(child: ReconcilerNode): void {
    this.children = this.children.filter((c) => c !== child);
  }
}
