import { SliderManager } from '@app/shared/slider'
import { header } from '@app/shared/header'
import { TabsUI } from '@app/shared/tabs-brands'
import { InnerSidebar } from '@app/shared/inner-sidebar/inner-sidebar'
import { ScrollToLink, ScrollToTop } from '@app/core/scroll-to-link'

export const app = (): void => {
  document.addEventListener('DOMContentLoaded', () => {
    header()
    SliderManager.init('.js-slider')
    TabsUI.init()
    InnerSidebar.init(document.querySelectorAll('.js-sidebar'))
    document.querySelectorAll('.js-scroll-to').forEach((element: HTMLElement) => new ScrollToLink(element))
    document.querySelectorAll('.js-scroll-to-top').forEach((element: HTMLElement) => new ScrollToTop(element))
  })
}
