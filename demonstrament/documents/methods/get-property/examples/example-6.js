import { Recourse, get } from '/dependencies/recourse.js'
console.log("------------------------")
console.log("Get Property | Example 6")
console.log("------------------------")
document.querySelector('body').insertAdjacentHTML('afterbegin', `
<application>
  <menu data-id="menu-a">
    <button data-id="button-a">BUTTON A</button>
    <button data-id="button-b">BUTTON B</button>
    <button data-id="button-c">BUTTON C</button>
    <menu>
      <button data-id="button-d">BUTTON D</button>
      <button data-id="button-e">BUTTON E</button>
      <button data-id="button-f">BUTTON F</button>
      <menu>
        <button data-id="button-g">BUTTON G</button>
        <button data-id="button-h">BUTTON H</button>
        <button data-id="button-i">BUTTON I</button>
      </menu>
    </menu>
  </menu>
  <menu data-id="menu-b">
    <button data-id="button-j">BUTTON J</button>
    <button data-id="button-k">BUTTON K</button>
    <button data-id="button-l">BUTTON I</button>
    <menu>
      <button data-id="button-m">BUTTON M</button>
      <button data-id="button-n">BUTTON N</button>
      <button data-id="button-o">BUTTON O</button>
      <menu>
        <button data-id="button-p">BUTTON P</button>
        <button data-id="button-q">BUTTON Q</button>
        <button data-id="button-r">BUTTON R</button>
      </menu>
    </menu>
  </menu>
</application>
`)
const buttonsAThroughCQueryString = 'application > menu[data-id="menu-a"] > button'
const buttonsSecondLayerQueryString = 'application > menu > menu > button'
const buttonsThirdLayerQueryString = 'menu > menu > menu > button'
const allButtonsQueryString = 'button[data-id]'
const querySelectors = {
  menus: {
    menuA: document.querySelector('[data-id="menu-a"]'),
    menuB: document.querySelector('[data-id="menu-b"]'),
  },
  buttonSequences: {
    buttonsAThroughC: document.querySelectorAll(buttonsAThroughCQueryString),
  },
  buttonLayers: {
    secondLayer: {
      buttons: document.querySelectorAll(buttonsSecondLayerQueryString),
      thirdLayer: {
        buttons: document.querySelectorAll(buttonsThirdLayerQueryString),
      },
    },
  },
  allButtons: document.querySelectorAll(allButtonsQueryString),
}
const getOptionsA = { pathMatch: true }
const pathMatchA = 'menus.*'
const pathMatchB = 'buttonSequences.buttonsAThroughC'
const pathMatchC = 'buttonLayers.**.buttons'
const pathMatchesA = Recourse.get(querySelectors, 'menus.*', getOptionsA)
const pathMatchesB = Recourse.get(querySelectors, 'buttonSequences.buttonsAThroughC', getOptionsA)
const pathMatchesC = Recourse.get(querySelectors, 'buttonLayers.**.buttons', getOptionsA)
console.log("pathMatchesA", pathMatchesA)
console.log("pathMatchesB", pathMatchesB)
console.log("pathMatchesC", pathMatchesC)
