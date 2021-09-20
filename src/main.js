import defaultConfig from './defaultConfig'

export default class Swipe {
  constructor(target = document, options = {}) {
    this.options = { ...defaultConfig, ...options }
    this.target = target

    this.callbacks = []
    this.swipeEvent = {}
    this.event = ''
    this.xDown = null
    this.yDown = null
  }

  hasCallback(event = '') {
    return !!this.callbacks.find(({ event: e }) => e === event)
  }

  init() {
    this.addListeners()
  }

  destroy() {
    this.removeListeners()
    this.callbacks = []
  }

  addListeners() {
    this.target.addEventListener('touchstart', this.handleTouchStart)
    this.target.addEventListener('touchmove', this.handleTouchMove)
    this.target.addEventListener('touchend', this.handleTouchEnd)
  }

  removeListeners() {
    this.target.removeEventListener('touchstart', this.handleTouchStart)
    this.target.removeEventListener('touchmove', this.handleTouchMove)
    this.target.removeEventListener('touchend', this.handleTouchEnd)
  }

  chooseEventCallback(optionalEvent = '', defaultEvent = '') {
    if (this.options.moveCallbacks && this.hasCallback(optionalEvent)) {
      this.event = optionalEvent
      this.triggerCallback(optionalEvent)

      setTimeout(() => {
        this.event = defaultEvent
      })
    } else {
      this.event = defaultEvent
    }
  }

  triggerCallback(event = '') {
    const currentCallbacks = this.callbacks.filter(({ event: e }) => e === event)
    currentCallbacks.forEach(({ callback }) => callback())

    setTimeout(() => {
      this.event = ''
    })
  }

  handleTouchStart = e => {
    const [firstTouch] = e.touches
    this.xDown = firstTouch.clientX
    this.yDown = firstTouch.clientY

    this.swipeEvent.touchStart = e
  }

  handleTouchMove = e => {
    if (!this.xDown || !this.yDown) return
    this.swipeEvent.touchMove = e

    const xUp = e.touches[0].clientX
    const yUp = e.touches[0].clientY

    const xDiff = this.xDown - xUp
    const yDiff = this.yDown - yUp

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > this.options.resistance) {
        this.chooseEventCallback('moveleft', 'swipeleft')
      } else if (xDiff < this.options.resistance * -1) {
        this.chooseEventCallback('moveright', 'swiperight')
      }
    } else if (yDiff > this.options.resistance) {
      this.chooseEventCallback('moveup', 'swipeup')
    } else if (yDiff < this.options.resistance * -1) {
      this.chooseEventCallback('movedown', 'swipedown')
    }

    if (this.options.moveCallbacks) {
      this.xDown = xUp
      this.yDown = yUp
    }
  }

  handleTouchEnd = e => {
    this.swipeEvent.touchEnd = e

    this.triggerCallback(this.event)

    this.xDown = null
    this.yDown = null
  }

  on(event = '', callback = () => {}) {
    this.callbacks.push({
      event,
      callback,
    })

    return this
  }

  off(event = '', callback = () => {}) {
    this.callbacks = this.callbacks.filter(
      ({ callback: c, event: e }) => !(callback === c && event === e)
    )
  }
}
