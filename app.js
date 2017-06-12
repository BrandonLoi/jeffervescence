const app = {
  init(selectors) {
    this.flicks = []
    this.max = 0
    this.list = document.querySelector(selectors.listSelector)
    document.querySelector(selectors.formSelector).addEventListener('submit', this.addFlickViaForm.bind(this))
    this.template = document.querySelector(selectors.templateSelector)
    this.load()
  },

  load() {
    //Get the JSON string out of localStorage
    const flicksJSON = localStorage.getItem('flicks')
    //Turn that into an array
    const flicksArray = JSON.parse(flicksJSON)
    //Set this.flicks to that array
    if (flicksArray) {
      flicksArray.reverse().map(this.addFlick.bind(this))
    }
  },

  addFlick(flick) {
    const listItem = this.buildListItem(flick)
    this.list.insertBefore(listItem, this.list.firstChild)
      ++this.max
    this.flicks.unshift(flick)
    this.save()
  },

  addFlickViaForm(ev) {
    ev.preventDefault()
    const f = ev.target
    const flick = {
      id: this.max + 1,
      name: f.flickName.value,
      year: f.flickYear.value
    }
    fav: false
    this.addFlick(flick)
    f.reset()
  },

  save() {
    localStorage.setItem('flicks', JSON.stringify(this.flicks))
  },

  buildListItem(flick) {
    const item = this.template.cloneNode(true)
    item.classList.remove('template')
    item.dataset.id = flick.id
    item.querySelector('.flick-name').textContent = flick.name + ' - ' + flick.year
    item.querySelector('.button.remove').addEventListener('click', this.removeFlick.bind(this))
    item.querySelector('.button.fav').addEventListener('click', this.favFlick.bind(this, flick))
    if (flick.fav) {
      item.classList.add('fav')
    }
    return item
  },

  removeFlick(ev) {
    const listItem = ev.target.closest('.flick')
    //find flick in array
    for (let i = 0; i < this.flicks.length; i++) {
      if (this.flicks[i].id.toString() === listItem.dataset.id.toString()) {
        this.flicks.splice(i, 1);
        break;
      }
    }

    listItem.remove()
    this.save()
  },
  favFlick(flick, ev) {
    const listItem = ev.target.closest('.flick')
    listItem.classList.toggle('fav')
    flick.fav = !flick.fav
    this.save()
  }
}

app.init({
  formSelector: '#flick-form',
  listSelector: '#flick-list',
  templateSelector: '.flick.template',
})
