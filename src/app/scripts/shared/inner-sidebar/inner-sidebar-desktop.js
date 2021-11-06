import stickybits from 'stickybits'
import { Widget } from '@app/core/widget'

export class InnerSidebarDesktop extends Widget {
  constructor(node) {
    super(node, '.js-sidebar', 'tablet up')

    this.$navbar = this.$node.querySelector('.js-sidebar__nav')

    this.stickyElement = null

    this.init()
  }

  build() {
    this.events()
  }

  destroy() {
    this.stickyElement.cleanup()
  }

  events() {
    this.stickyElement = stickybits(this.$navbar, this.stickyOptions)
  }

  get stickyOptions() {
    return {
      stickyBitStickyOffset: document.querySelector('.js-header').getBoundingClientRect().height,
    }
  }

  static init(el) {
    new InnerSidebarDesktop(el)
  }
}

// window.InnerSidebarDesktop = InnerSidebarDesktop
