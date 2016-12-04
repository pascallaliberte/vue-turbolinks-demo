import Vue from 'vue'
import PostPreview from './vue/post-preview.vue'

import VueTurbolinks from './vue/mixins/vue-turbolinks.js'

Vue.mixin(VueTurbolinks)

new Vue({
  el: '#post-preview',
  data: {
    posts: window.posts
  },
  components: {
    PostPreview
  }
})
