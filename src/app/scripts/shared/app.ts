import { SliderManager } from '@app/shared/slider'

export const app = (): void => {
  document.addEventListener('DOMContentLoaded', () => {
    // Add class to header on scroll
    const header = document.querySelector('.js-header')
    const headerToggleBtn = document.querySelector('.js-header__btn')
    const headerToggleMenu = document.querySelector('.js-header__nav')

    window.addEventListener('scroll', () => {
      const y: number = window.scrollY

      y > 1 ? header.classList.add('scroll') : header.classList.remove('scroll')
    })

    headerToggleBtn &&
      headerToggleBtn.addEventListener('click', (e) => {
        e.preventDefault()
        headerToggleBtn.classList.toggle('is-active')
        headerToggleMenu.classList.toggle('is-active')
      })

    SliderManager.init('.js-slider')
  })
}
