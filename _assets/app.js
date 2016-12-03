import Vue from 'vue'
import PostPreview from './vue/post-preview.vue'

new Vue({
  el: '#post-preview',
  data: {
    posts: window.posts
  },
  components: {
    PostPreview
  }
})
