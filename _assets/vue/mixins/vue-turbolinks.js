import Vue from 'vue'

export default {
  beforeMount() {
    if (this === this.$root) {
      this._turbolinksOriginalEl = this.$el.outerHTML
    }
  },
  created() {
    if (!this.$root.hasOwnProperty('_turbolinksState') || undefined === this.$root._turbolinksState[this._uid]) {
      return
    }
    let data = this.$root._turbolinksState[this._uid]
    for (let key of Object.keys(data)) {
      if (this.hasOwnProperty(key)) {
        this[key] = data[key]
      }
    }
  },
  beforeDestroy() {
    if (this !== this.$root) {
      return
    }
    let instancesToParse = []
    let root = this.$root
    root._turbolinksState = {}
    instancesToParse.push(this)
    while (instancesToParse.length > 0) {
      let currentInstance = instancesToParse.pop()
      for (let child of currentInstance.$children) {
        instancesToParse.push(child)
      }
      root._turbolinksState[currentInstance._uid] = JSON.parse(JSON.stringify(currentInstance.$data))
    }

    this.$el.outerHTML = this._turbolinksOriginalEl
    document.querySelector(this.$options.el).setAttribute('turbolinks-state', JSON.stringify(this._turbolinksState))
  }
}
