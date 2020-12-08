'use babel';
import { server } from 'live-server';
import toggle from './x-browser-prototype';

const open = require('open');

var liveServer = require("live-server");

var params = {
  port: 8181, // Set the server port. Defaults to 8080.
  host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
  root: "", // Set root directory that's being served. Defaults to cwd.
  open: false, // When false, it won't load your browser by default.
  ignore: 'scss,my/templates', // comma-separated string for paths to ignore
  file: "index.html", // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
  wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
  mount: [['/components', './node_modules']], // Mount a directory to a route.
  logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
  middleware: [function (req, res, next) { next(); }] // Takes an array of Connect-compatible middleware that are injected into the server middleware stack
};

export default class XBrowserPrototypeView {
  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('x-browser-prototype');

    this.element.innerHTML = `
    <div tabindex="0" class="panels-item" style="">
      <section class="section packages">
        <div class="section-container updates-container">
          <div class="updates-heading-container">
          <div class="control-group">
              <div class="controls">
            <h1 class="section-heading">File and directory to open</h1>
              <label for="filename">Filename</label>
              <input id="filename" type="text" class="input-text native-key-bindings" name="filename" value = "">
              <label for="directory">Directory</label>
              <input id="directory" type="text" class="input-text native-key-bindings" name="directory" value = "">
              </div>
              </div>
            <h1 class="section-heading">Select browsers</h1>
            <div class="control-group">
              <div class="controls">
                <div class="checkbox">
                  <label>
                    <input id="chrome-checkbox" type="checkbox" class="input-checkbox" data-original-title="" title="">
                    <div class="setting-title">Chrome</div>
                  </label>
                </div>
              </div>
            </div>
            <div class="control-group">
              <div class="controls">
                <div class="checkbox">
                  <label>
                    <input id="firefox-checkbox" type="checkbox" class="input-checkbox" data-original-title="" title="">
                    <div class="setting-title">Firefox</div>
                  </label>
                </div>
              </div>
            </div>
            <div class="control-group">
              <div class="controls">
                <div class="checkbox">
                  <label>
                    <input id="safari-checkbox" type="checkbox" class="input-checkbox" data-original-title="" title="">
                    <div class="setting-title">Safari</div>
                  </label>
                </div>
              </div>
            </div>
            <div class="control-group">
              <div class="controls">
                <div class="checkbox">
                  <label>
                    <input id="edge-checkbox" type="checkbox" class="input-checkbox" data-original-title="" title="">
                    <div class="setting-title">Edge</div>
                  </label>
                </div>
              </div>
            </div>
            <div class="control-group">
              <div class="controls">
                <div class="checkbox">
                  <label>
                    <input id="ie-checkbox" type="checkbox" class="input-checkbox" data-original-title="" title="">
                    <div class="setting-title">Internet Explorer</div>
                  </label>
                </div>
              </div>
            </div><button class="btn" id="launchbtn">Launch</button>
          </div>
          <div></div>
        </div>
      </section>
    </div>
    `

    paneItems = atom.workspace.getPaneItems();
    for (item in paneItems) {
      if (paneItems[item].constructor.name == 'TextEditor') {
        fileName = paneItems[item].getFileName();
        if (fileName != undefined){
          this.element.querySelector('#filename').value = fileName;
        }
      }
    }
    dirs = atom.project.getDirectories();
    if (dirs.length > 0) {
      this.element.querySelector('#directory').value = dirs[0].realPath;
    }
    this.element.querySelector('#launchbtn').onclick = function () {
      if (this.element.querySelector('#ie-checkbox').checked) {
        open('http://127.0.0.1:8181', { app: 'iexplore' });
      }
      if (this.element.querySelector('#edge-checkbox').checked) {
        open('http://127.0.0.1:8181', { app: 'msedge' });
      }
      if (this.element.querySelector('#chrome-checkbox').checked) {
        open('http://127.0.0.1:8181', { app: 'chrome' });
      }
      if (this.element.querySelector('#safari-checkbox').checked) {
        open('http://127.0.0.1:8181', { app: 'safari' });
      }
      if (this.element.querySelector('#firefox-checkbox').checked) {
        open('http://127.0.0.1:8181', { app: 'firefox' });
      }
      params.file = this.element.querySelector('#filename').value;
      params.root = this.element.querySelector('#directory').value;
      try {
        liveServer.shutdown();
      }
      finally {}
      var server = liveServer.start(params);
      console.log(atom.workspace.getRightPanels());
      panels = atom.workspace.getRightPanels();
      for (panel in panels) {
        if (panels[panel].item.className == 'x-browser-prototype') {
          panels[panel].hide();
        }
      }

    }.bind(this);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() { }

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
