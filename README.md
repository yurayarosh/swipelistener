# swipelistener

### Install

```html
yarn add swipelistener
```

```js
import Swipe from './main'

const swipe = new Swipe(el, options)
swipe.init()

function up() {
  printText('Swipe up')
}

swipe
  .on('swipeup', up)
  .on('swipedown', () => {
    printText('Swipe down')
  })

swipe.off('swipeup', up)
```

### Options

Standart options
```js
{
  moveCallbacks: false,
  resistance: 0,
}
```

### Methods

```js
swipe.on(eventName, callback)
popup.off(eventName, callback)
swipe.destroy() 
```

### Events names

* swipeup
* swipedown
* swipeleft
* swiperight
* moveup
* movedown
* moveleft
* moveright
