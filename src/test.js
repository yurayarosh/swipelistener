import Swipe from './main'

const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints

const field = document.querySelector('.page__body')
const footerText = document.querySelector('.page__footer p')

const printText = str => (footerText.textContent = str)

printText(`Touch events are ${isTouch ? 'enabled' : 'disabled'}`)

const swipe = new Swipe(field)
swipe.init()

function up() {
  printText('Swipe up')
}

swipe
  .on('swipeup', up)
  .on('swipedown', () => {
    printText('Swipe down')
  })
  .on('swipeleft', () => {
    printText('Swipe left')
  })
  .on('swiperight', () => {
    printText('Swipe right')
  })
  .on('moveup', () => {
    printText('Move up')
  })
  .on('movedown', () => {
    printText('Move down')
  })
  .on('moveleft', () => {
    printText('Move left')
  })
  .on('moveright', () => {
    printText('Move right')
  })
