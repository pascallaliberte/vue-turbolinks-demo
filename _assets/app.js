import Vue from 'vue'
import PostPreview from './vue/post-preview.vue'

import VueTurbolinks from './vue/mixins/vue-turbolinks.js'

Vue.mixin(VueTurbolinks)

let postPreviewEl = "#post-preview"

document.addEventListener("turbolinks:load", function() {
  if (!document.querySelector(postPreviewEl)) {
    return
  }
  window.postPreview = new Vue({
    el: postPreviewEl,
    data: {
      posts: window.posts
    },
    components: {
      PostPreview
    }
  })
})

document.addEventListener("turbolinks:before-cache", function() {
  if (!document.querySelector(postPreviewEl)) {
    return
  }
  if (window.postPreview) {
    window.postPreview.$destroy()
  }
})
