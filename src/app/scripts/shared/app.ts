import { SliderManager } from '@app/shared/slider'
import { header } from '@app/shared/header'
import { TabsUI } from '@app/shared/tabs-brands'
import { InnerSidebar } from '@app/shared/inner-sidebar/inner-sidebar'
import { ScrollToLink, ScrollToTop } from '@app/core/scroll-to-link'
import { manager } from '@app/shared/popups'

export const app = (): void => {
  document.addEventListener('DOMContentLoaded', () => {
    header()
    SliderManager.init('.js-slider')
    TabsUI.init()
    InnerSidebar.init(document.querySelectorAll('.js-sidebar'))
    document.querySelectorAll('.js-scroll-to').forEach((element: HTMLElement) => new ScrollToLink(element))
    document.querySelectorAll('.js-scroll-to-top').forEach((element: HTMLElement) => new ScrollToTop(element))

    document.querySelectorAll('.js-popup').forEach((popup: HTMLElement): void => manager.add(popup))
    manager.updatePopups()

    const trigger = document.querySelector('.js-fab > .trigger')
    trigger.addEventListener('click', (e: MouseEvent) => {
      e.preventDefault()
      ;(e.currentTarget as HTMLElement).parentElement.classList.toggle('open')
    })
  })
}
