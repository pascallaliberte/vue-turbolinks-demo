<template>
  <a :href="post.url" class="post-preview">
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
    }
  },
  data () {
    return {
      showPostLink: true
    }
  }
}
</script>
