export class FAB {
  $node: HTMLElement
  $trigger: HTMLElement
  $items: NodeListOf<HTMLElement>

  constructor(node: HTMLElement) {
    this.$node = node
    this.$trigger = node.querySelector('.js-fab__trigger')
    this.$items = node.querySelectorAll('.js-fab__item')

    this.build()
  }

  build(): void {
    // this.initPopups()
    this.$trigger.addEventListener('click', () => this.$node.classList.toggle('open'))
    this.$items.forEach((item) => {
      item.addEventListener('click', () => this.$node.classList.remove('open'))
    })
  }

  // initPopups(): void {
  //   this.$items.forEach((item) => {
  //     if (item.classList.contains('js-popup-open')) {
  //       console.log('js-popup-open:', item)
  //     }
  //   })
  // }

  public static init(el: HTMLElement): void {
    el && new FAB(el)
  }
}
