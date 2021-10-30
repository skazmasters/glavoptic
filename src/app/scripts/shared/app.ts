import { SliderManager } from '@app/shared/slider'
import { header } from '@app/shared/header'

export const app = (): void => {
  document.addEventListener('DOMContentLoaded', () => {
    header()
    SliderManager.init('.js-slider')
  })
}
