'use babel';

const open = require('open');
function launch() {
  (async () => {
    if (this.element.querySelector('#ie-checkbox').checked) {
      await open('https://sindresorhus.com', { app: 'iexplore' });
    }
    if (this.element.querySelector('#chrome-checkbox').checked) {
      await open('https://sindresorhus.com', { app: 'google chrome' });
    }
  })();
}
function checkChecked(element, boxID) {
  return element.querySelector(boxID).checked;
}
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
            </div><button class="btn" id="closebtn">Launchtest</button>
          </div>
          <div></div>
        </div>
      </section>
    </div>
    `
    this.element.querySelector('#closebtn').onclick = function () {
      if (this.element.querySelector('#ie-checkbox').checked) {
        open('https://sindresorhus.com', { app: 'iexplore' });
      }
      if (this.element.querySelector('#chrome-checkbox').checked) {
        open('https://sindresorhus.com', { app: 'chrome' });
      }
    }.bind(this);
    //console.log(this.xBrowserPrototypeView.getElementById('closebtn'));
    //this.xBrowserPrototypeView.getElementById('closebtn').onclick = function(){
    //  window.open('http://stackoverflow.com');
    //}
    console.log(this.element.querySelector('#closebtn'));
    console.log('test');
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
