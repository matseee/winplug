import { Renderer } from './renderer';
export class WinPlug {
  protected renderer: Renderer;

  constructor() {
    this.initialize();
  }

  render() {
    this.renderer.render();
  }

  protected initialize() {
    this.renderer = new Renderer();
    this.renderer.createWindow();
  }
}

const winplug = new WinPlug();
winplug.render();
