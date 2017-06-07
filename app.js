const app = {
    init(selectors) {
    flicks = []
    this.max = 0
    this.list = document.querySelector(selectors.listSelector)
    document
    .querySelector(selectors.formSelector)
    .addEventListener('submit', this.addFlick.bind(this))
  },

  addFlick(ev) {
    ev.preventDefault()
    const f = ev.target
    const flick = {
      id: this.max + 1,
      name: f.flickName.value
    }
    const listItem = this.buildListItem(flick)
    this.max++
  },

  buildListItem(flick) {
    const item = document.createElement('li')
    const pButton = document.createElement('button')
    const dButton = document.createElement('button')
    item.textContent = flick.name

    pButton.innerHTML = 'Promote';
    dButton.innerHTML = 'Delete'
    pButton.type = 'button'
    dButton.type = 'button'

    item.appendChild(dButton)
    item.appendChild(pButton)

    pButton.addEventListener('click', this.promote)
    dButton.addEventListener('click', this.del)

    this.list.appendChild(item)
    flicks.push(item.textContent)
    return item
  },
  promote(ev) {
    if(ev.target.parentElement.style.backgroundColor === 'yellow') {
      ev.target.parentElement.style.backgroundColor = 'white'
    }
    else {
      ev.target.parentElement.style.backgroundColor = 'yellow'
    }
  },
  del(ev) {
    const element = ev.target.parentElement
    element.remove()
  },
}

app.init({
  formSelector: '#flick-form',
  listSelector: '#flick-list'
})
