const app = {
  this.flicks = []
  init(selectors) {
    this.max = 0
    this.list = document.querySelector(selectors.listSelector)
    document
      .querySelector(formSelector)
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
    console.log(listItem)
    this.max++
  },
  buildListItem(flick) {
    const item = document.createElement('li')
    this.list.appendChild(item)
    //TODO: add flick to this.flicks
    return item
  },
}

app.init({
  formSelector: `#flick-form`
  listSelector: `#flick-list`
})
