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
    f.reset()
  },

  buildListItem(flick) {
    const item = document.createElement('li')
    const pButton = document.createElement('button')
    const dButton = document.createElement('button')
    item.textContent = flick.name
    item.dataset.id = flick.id
    pButton.innerHTML = 'Promote';
    dButton.innerHTML = 'Delete'
    pButton.type = 'button'
    dButton.type = 'button'

    item.appendChild(dButton)
    item.appendChild(pButton)

    pButton.addEventListener('click', this.promote)
    dButton.addEventListener('click', this.del)

    //this.list.appendChild(item)
    this.list.insertBefore(item, this.list.firstChild)
    flicks.unshift(flick.name)
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
    const index = flicks.indexOf(ev.target.parentElement.textContent.substring(0, ev.target.parentElement.textContent.length - 13));
    if (index > -1) {
      flicks.splice(index, 1)
      }
  },
}

app.init({
  formSelector: '#flick-form',
  listSelector: '#flick-list'
})
