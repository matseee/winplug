import { Window } from './window';

export class Renderer {
  protected window: Window;
  protected html: HTMLElement;

  constructor() {
    this.initialize();
  }

  render() {
    this.html.insertBefore(this.window.render(), this.html.firstChild);
  }

  createWindow() {
    this.window = new Window(300, 300);
  }

  protected initialize() {
    this.getHTML();
  }

  protected getHTML() {
    let array = document.getElementsByTagName('html');
    this.html = array[0];
  }
}
