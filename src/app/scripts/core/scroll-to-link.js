import { onScroll } from '@app/core/scroll-observer'
import { onResize } from '@app/core/resize-observer'
import { startScrollTo } from '@app/core/scroll-to'
import { isMobileLayout } from '@app/core/layout'
import { getScrollPos } from '@app/core/scroll-control'

export class ScrollToLink {
  constructor(nodeElement) {
    this.nodeElement = nodeElement
    this.targetElement = document.querySelector(
      this.nodeElement.getAttribute('href') || this.nodeElement.dataset.scrollTarget
    )

    if (!this.targetElement) return null

    this.init()
  }

  init() {
    this.nodeElement.addEventListener('click', (e) => {
      e.preventDefault()

      setTimeout(() => {
        requestAnimationFrame(() => {
          startScrollTo(this.targetElement)
        })
      })
    })
  }
}

export class ScrollToTop {
  constructor(nodeElement) {
    this.nodeElement = nodeElement

    this.init()
  }

  checkPosition() {
    if (!isMobileLayout()) return

    window.innerHeight < getScrollPos()
      ? this.nodeElement.classList.add('active')
      : this.nodeElement.classList.remove('active')
  }

  init() {
    onScroll(this.checkPosition.bind(this))
    onResize(this.checkPosition.bind(this))

    this.nodeElement.addEventListener('click', (e) => {
      e.preventDefault()

      setTimeout(() => {
        requestAnimationFrame(() => {
          startScrollTo(document.documentElement)
        })
      })
    })
  }
}

// document.addEventListener('DOMContentLoaded', () => {
//   document.querySelectorAll('.js-scroll-to').forEach((element) => new ScrollToLink(element))
//   document.querySelectorAll('.js-scroll-to-top').forEach((element) => new ScrollToTop(element))
// })
