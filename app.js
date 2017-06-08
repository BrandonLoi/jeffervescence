const app = {
    init(selectors) {
    this.flicks = []
    this.max = 0
    this.list = document.querySelector(selectors.listSelector)
    document
    .querySelector(selectors.formSelector)
    .addEventListener('submit', this.addFlick.bind(this))
    this.template = document.querySelector(selectors.templateSelector)

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
    const item = this.template.cloneNode(true)
    item.classList.remove('template')
    item.dataset.id = flick.id
    item.querySelector('.flick-name').textContent = flick.name
    item.querySelector('.button.remove').addEventListener('click', this.removeFlick.bind(this))
    this.list.insertBefore(item, this.list.firstChild)
    this.flicks.unshift(flick)
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
  removeFlick(ev) {
    console.log(this)
    const listItem = ev.target.closest('.flick')
    //find flick in array
    for (let i = 0; i < this.flicks.length; i++) {
      if (this.flicks[i].id === listItem.dataset.id.toString()) {
        this.flicks.splice(i,1);
        break;
      }
    }

    listItem.remove()
  },
}

app.init({
  formSelector: '#flick-form',
  listSelector: '#flick-list',
  templateSelector: '.flick.template',
})
