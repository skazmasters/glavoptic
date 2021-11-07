import { InnerSidebarObserver } from '@app/shared/inner-sidebar/inner-sidebar-observer'
import { InnerSidebarDesktop } from '@app/shared/inner-sidebar/inner-sidebar-desktop'

export class InnerSidebar {
  constructor(node) {
    node.forEach((item, i) => {
      InnerSidebarObserver.init(item, i)
      InnerSidebarDesktop.init(item)
      // InnerSidebarMobile.init(item)
    })
  }

  static init(el) {
    el && new InnerSidebar(el)
  }
}
