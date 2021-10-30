import KeenSlider from 'keen-slider'

type sliderNode = HTMLElement

export class Slider {
  $node: sliderNode

  constructor(el: sliderNode) {
    this.$node = el

    console.log()
    console.log('inited')
    this.setup()
  }

  setup(): void {
    let interval: ReturnType<typeof setInterval> | undefined

    function autoplay(run) {
      clearInterval(interval)
      interval = setInterval(() => {
        if (run && slider) {
          slider.next()
        }
      }, 5000)
    }

    const slider = new KeenSlider(this.$node, {
      loop: true,
      duration: 1000,
      dragStart: () => {
        autoplay(false)
      },
      dragEnd: () => {
        autoplay(true)
      },
      created: function (instance) {
        document.getElementById('arrow-left').addEventListener('click', function () {
          instance.prev()
          autoplay(true)
        })

        document.getElementById('arrow-right').addEventListener('click', function () {
          instance.next()
          autoplay(true)
        })
        const dots_wrapper = document.getElementById('dots')
        const slides = document.querySelectorAll('.keen-slider__slide')
        slides.forEach(function (t, idx) {
          const dot = document.createElement('button')
          dot.classList.add('dot')
          dots_wrapper.appendChild(dot)
          dot.addEventListener('click', function () {
            instance.moveToSlide(idx)
            autoplay(true)
          })
        })
        updateClasses(instance)
      },
      slideChanged(instance) {
        updateClasses(instance)
      },
    })

    this.$node.addEventListener('mouseover', () => {
      autoplay(false)
    })
    this.$node.addEventListener('mouseout', () => {
      autoplay(true)
    })
    autoplay(true)
  }

  public static init(el: HTMLElement): void {
    el && new Slider(el)
  }
}

export class SliderManager {
  public static init(el: string): void {
    document.querySelectorAll(el).forEach((slider: HTMLElement) => {
      new Slider(slider)
    })
  }
}

function updateClasses(instance: KeenSlider) {
  const slide = instance.details().relativeSlide
  const arrowLeft = document.getElementById('arrow-left')
  const arrowRight = document.getElementById('arrow-right')
  slide === 0 ? arrowLeft.classList.add('arrow--disabled') : arrowLeft.classList.remove('arrow--disabled')
  slide === instance.details().size - 1
    ? arrowRight.classList.add('arrow--disabled')
    : arrowRight.classList.remove('arrow--disabled')

  const dots = document.querySelectorAll('.dot')
  dots.forEach(function (dot, idx) {
    idx === slide ? dot.classList.add('dot--active') : dot.classList.remove('dot--active')
  })
}
