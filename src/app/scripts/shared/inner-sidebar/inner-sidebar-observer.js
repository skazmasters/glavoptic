import {offResize, onResize} from '@app/core/resize-observer'
import {Widget} from '@app/core/widget'
import {Layout} from '@app/core/layout'
import {ScrollToLink} from '@app/core/scroll-to-link'

// export class SidebarObserver {
//   constructor(node) {
//     console.log('new node: ', node)
//   }
//
//   static init(el) {
//     el && new SidebarObserver(el)
//   }
// }

export class InnerSidebarObserver extends Widget {
  constructor(node, index) {
    super(node, '.js-sidebar')

    this.nodeID = index

    this.$sections = this.$node.querySelectorAll('.js-sidebar__section')
    this.$navbar = this.$node.querySelector('.js-sidebar__nav')

    this.observer = null
    this.offset = {
      top: null,
      bottom: null,
    }

    this.checkEntries = this.checkEntries.bind(this)
    this.resizeEvents = this.resizeEvents.bind(this)

    this.init()
  }

  build() {
    this.events()
    onResize(this.resizeEvents)
  }

  destroy() {
    this.observer.disconnect()
    offResize(this.resizeEvents)
  }

  resizeEvents() {
    this.updateOffset()
  }

  events() {
    this.updateOffset()

    this.indexingNavigation()
    this.initObserver()
  }

  updateOffset() {
    const viewportHeight = document.documentElement.clientHeight
    this.offset.top = (viewportHeight * 5) / 1e2
    this.offset.bottom = (viewportHeight * 92) / 1e2
  }

  initObserver() {
    this.observer = this.createObserver()

    const anchors = []

    this.$sections.forEach((section, idx) => {
      const uid = `section-${this.nodeID}-${idx}`
      const title = section.querySelector('.tabs-products__section-title').innerHTML
      title.replaceAll(/<br>/g, ' ')

      section.setAttribute('id', uid)
      anchors.push(`<li><a href="#${uid}">${title}</a></li>`)

      this.observer.observe(section)
    })

    // console.log(anchors)
    this.$navbar.insertAdjacentHTML('beforeend', `<ul class="sidebar-nav__list">${anchors.join('')}</ul>`)

    // init nav links
    this.$navbar.querySelectorAll('a').forEach((el) => new ScrollToLink(el))
  }

  createObserver() {
    return new IntersectionObserver(this.checkEntries, this.observerConfig)
  }

  checkEntries(entries) {
    for (let entry of entries) {
      const { target, intersectionRatio, boundingClientRect: cords } = entry

      if (intersectionRatio > 0) {
        const currNavItem = this.getActiveNav()
        this.removeActiveNav(currNavItem)

        const { id } = target
        const nextNavItem = this.getNavById(id)
        this.setActiveNav(nextNavItem)

        return null
      } else if (cords.top > this.offset.top) {
        const { id } = target
        const currNavItem = this.getNavById(id)
        this.removeActiveNav(currNavItem)

        const { index } = currNavItem.dataset
        const prevNavItem = this.getNavByIndex(index - 1)
        this.setActiveNav(prevNavItem)

        return null
      }
    }
  }

  getNavById(id) {
    return this.$navbar.querySelector(`[href="#${id}"]`)
  }

  getNavByIndex(index) {
    return this.$navbar.querySelector(`[data-index="${index}"]`)
  }

  getAllNavItems() {
    return this.$navbar.querySelectorAll('[href]')
  }

  getActiveNav() {
    return this.$navbar.querySelector(`[href].active`)
  }

  setActiveNav(elem) {
    elem && elem.classList.add('active')

    if (elem && (Layout.isMobileLayout() || (Layout.isTabletLayout() && !Layout.isBigTabletLayout()))) {
      this.$node.querySelectorAll('.js-inner-sidebar.fixed .sidebar-nav__list a').forEach(($link) => {
        $link.classList.toggle('active', $link.innerText === elem.innerText)
        if ($link.innerText === elem.innerText) {
          const $row = document.querySelector('.js-inner-sidebar.fixed .sidebar-nav__container')
          $row.scrollLeft = $link.parentElement.offsetLeft - window.innerWidth / 2
        }
      })
    }
  }

  removeActiveNav(elem) {
    elem && elem.classList.remove('active')
  }

  indexingNavigation() {
    const navItems = this.getAllNavItems()

    navItems.forEach((navItem, i) => (navItem.dataset.index = i))
  }

  get observerConfig() {
    return {
      rootMargin: '5% 0% -70% 0%',
      threshold: 0,
    }
  }

  static init(el, index) {
    new InnerSidebarObserver(el, index)
  }
}

// window.InnerSidebarObserver = InnerSidebarObserver
