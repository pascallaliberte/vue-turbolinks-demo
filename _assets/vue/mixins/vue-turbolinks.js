import Vue from 'vue'

export default {
  beforeMount() {
    if (this !== this.$root) {
      return
    }
    this._turbolinksOriginalEl = this.$el.outerHTML
    let state = this.$el.getAttribute('turbolinks-state')

    if (state) {
      this._turbolinksState = JSON.parse(state)
    }
  },
  beforeUpdate() {
    let id = this._turbolinksGetUniqueLabel(this)
    if (!this.$root.hasOwnProperty('_turbolinksState') || undefined === this.$root._turbolinksState[id]) {
      this.$emit('turbolinks:restored')
      return
    }
    let data = this.$root._turbolinksState[id]
    for (let key of Object.keys(data)) {
      if (this.hasOwnProperty(key)) {
        this[key] = data[key]
      }
    }
    delete this.$root._turbolinksState[id]
    this.$emit('turbolinks:restored')
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
      let id = this._turbolinksGetUniqueLabel(currentInstance)
      root._turbolinksState[id] = JSON.parse(JSON.stringify(currentInstance.$data))
    }

    this.$el.outerHTML = this._turbolinksOriginalEl
    document.querySelector(this.$options.el).setAttribute('turbolinks-state', JSON.stringify(this._turbolinksState))
  },
  methods: {
    _turbolinksGetUniqueLabel(vm) {
      return (vm === vm.$root)? 'root': vm.$vnode.tag
    }
  }
}
