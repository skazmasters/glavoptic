import { Observer } from '@app/core/observer'

class ResizeObserver extends Observer {
  constructor() {
    super()

    this.observeResize()
  }

  observeResize() {
    window.addEventListener('resize', () => {
      if (!this.listeners.length) return false
      this.listeners.forEach((fn) => fn())
    })
  }
}

const resizeObserver = new ResizeObserver()
export const onResize = (fn) => resizeObserver.subscribe(fn)
export const offResize = (fn) => resizeObserver.unsubscribe(fn)
