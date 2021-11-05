import { Widget } from '@app/core/widget'
import { InnerSidebarObserver } from '@app/shared/inner-sidebar/inner-sidebar-observer'
import { InnerSidebarDesktop } from '@app/shared/inner-sidebar/inner-sidebar-desktop'
import { InnerSidebarMobile } from '@app/shared/inner-sidebar/inner-sidebar-mobile'
import { ScrollToLink } from '@app/core/scroll-to-link'

export class InnerSidebar extends Widget {
  constructor(node) {
    super(node, '.js-inner-sidebar')

    document.addEventListener('touchmove', (e) => e.preventDefault())
    this.$node.querySelectorAll('a').forEach((el) => new ScrollToLink(el))

    InnerSidebarObserver.init(node)
    InnerSidebarDesktop.init(node)
    InnerSidebarMobile.init(node)
  }

  static init(el) {
    el && new InnerSidebar(el)
  }
}

//
// document.addEventListener('DOMContentLoaded', () => {
//   InnerSidebar.init(document.querySelector('.js-inner-sidebar'))
// })
