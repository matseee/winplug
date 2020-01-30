import { Logger } from './utils/logger';

export interface ICSSStyleSheet {
  insertRule(rule: string, index: number): any;
  deleteRule(index: number): any;
  addRule(selector: string, rule: string, index: number): any;
  removeRule(index: number): any;
}

export class Window {
  protected logger: Logger;

  protected height: number;
  protected width: number;

  protected baseDiv: HTMLDivElement;
  protected window: HTMLDivElement;

  protected style: StyleSheet;

  constructor(height: number, width: number) {
    this.height = height;
    this.width = width;

    this.initialize();
  }

  render(): HTMLDivElement {
    this.baseDiv.appendChild(this.window);
    return this.baseDiv;
  }

  protected initialize() {
    this.logger = Logger.getInstance();

    this.createStyleSheet();
    this.createStyle();

    this.createBaseDiv();
    this.createWindow();
  }

  protected createBaseDiv() {
    this.baseDiv = document.createElement('div') as HTMLDivElement;
    this.baseDiv.className = 'winplug base';
  }

  protected createWindow() {
    this.window = document.createElement('div') as HTMLDivElement;
    this.window.className = 'winplug window';
  }

  protected createStyle() {
    window.addEventListener('resize', () => {
      this.deleteCSSRule(0);
      this.addCSSRule(
        '.winplug .window',
        `position: absolute; left: ${window.innerWidth -
          (this.width + 20)}px; top: ${window.innerHeight -
          (this.height + 20)}px`
      );
    });

    this.addCSSRule(
      '.winplug .window',
      `background-color: white; z-index: 9001`
    );

    this.addCSSRule(
      '.winplug .window',
      `height: ${this.height}px; width: ${this.width}px;`
    );

    this.addCSSRule(
      '.winplug .window',
      `position: absolute; left: ${window.innerWidth -
        (this.width + 20)}px; top: ${window.innerHeight - (this.height + 20)}px`
    );
  }

  protected createStyleSheet() {
    const styleElement = document.createElement('style');
    styleElement.title = `winplug-stylesheet`;
    document.head.appendChild(styleElement);

    const styleSheets = document.styleSheets;
    if (styleSheets.length > 0) {
      for (let i = 0; i < styleSheets.length; i++) {
        if (styleSheets.item(i).title === 'winplug-stylesheet') {
          this.style = styleSheets.item(i);
        }
      }
    } else {
      this.logger.error(`Couldn't find created stylesheet!!!`);
    }
  }

  protected addCSSRule(selector: string, rules: string) {
    if ('insertRule' in this.style) {
      (this.style as ICSSStyleSheet).insertRule(
        selector + '{' + rules + '}',
        0
      );
    } else if ('addRule' in this.style) {
      (this.style as ICSSStyleSheet).addRule(selector, rules, 0);
    } else {
      this.logger.error(`No style-adding possible!!!`);
    }
  }

  protected deleteCSSRule(index: number) {
    if ('deleteRule' in this.style) {
      (this.style as ICSSStyleSheet).deleteRule(index);
    } else if ('removeRule' in this.style) {
      (this.style as ICSSStyleSheet).removeRule(index);
    } else {
      this.logger.error(`No style-adding possible!!!`);
    }
  }
}
