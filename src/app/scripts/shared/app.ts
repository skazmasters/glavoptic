import { SliderManager } from '@app/shared/slider'
import { header } from '@app/shared/header'
import { TabsUI } from '@app/shared/tabs-brands'

export const app = (): void => {
  document.addEventListener('DOMContentLoaded', () => {
    header()
    SliderManager.init('.js-slider')
    TabsUI.init()
  })
}
