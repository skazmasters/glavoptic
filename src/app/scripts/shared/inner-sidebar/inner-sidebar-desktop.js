import stickybits from 'stickybits'
import { Widget } from '@app/core/widget'

export class InnerSidebarDesktop extends Widget {
  constructor(node) {
    super(node, '.js-inner-sidebar', 'tablet up')

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
    this.stickyElement = stickybits(this.$node, this.stickyOptions)
  }

  get stickyOptions() {
    return {
      stickyBitStickyOffset: 100,
    }
  }

  static init(el) {
    new InnerSidebarDesktop(el)
  }
}

// window.InnerSidebarDesktop = InnerSidebarDesktop
