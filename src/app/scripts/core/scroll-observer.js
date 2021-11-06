import { Observer } from '@app/core/observer'

class ScrollObserver extends Observer {
  constructor() {
    super()

    this.ticking = false
    this.observeScroll()
  }

  observeScroll() {
    document.addEventListener(
      'scroll',
      () => {
        if (this.ticking) return null
        this.ticking = true
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            this.listeners.forEach((fn) => fn())
            this.ticking = false
          })
        )
      },
      true
    )
  }
}

export const scrollObserver = new ScrollObserver()
export const onScroll = (fn) => scrollObserver.subscribe(fn)
export const offScroll = (fn) => scrollObserver.unsubscribe(fn)
