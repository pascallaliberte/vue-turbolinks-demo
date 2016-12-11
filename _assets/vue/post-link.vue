<template>
  <a :href="url" class="post-preview">
    <post-summary :post="post"></post-summary>
  </a>
</template>
<script>
import PostSummary from './post-summary.vue'
export default {
  components: {
    PostSummary
  },
  props: {
    post: {
      type: Object,
      required: true
    },
    baseurl: {
      type: String,
      default: ''
    }
  },
  computed: {
    url () {
      return this.baseurl + this.post.url
    }
  },
  data () {
    return {
      showPostLink: true
    }
  }
}
</script>
