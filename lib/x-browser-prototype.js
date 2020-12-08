'use babel';

import XBrowserPrototypeView from './x-browser-prototype-view';
import { CompositeDisposable } from 'atom';

const open = require('open');



export default {

  xBrowserPrototypeView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.xBrowserPrototypeView = new XBrowserPrototypeView(state.xBrowserPrototypeViewState);

    this.modalPanel = atom.workspace.addRightPanel({
      item: this.xBrowserPrototypeView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'x-browser-prototype:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.xBrowserPrototypeView.destroy();
  },

  serialize() {
    return {
      xBrowserPrototypeViewState: this.xBrowserPrototypeView.serialize()
    };
  },

  toggle() {
    console.log('XBrowserPrototype was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  },
};
