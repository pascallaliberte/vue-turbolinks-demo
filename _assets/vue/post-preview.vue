<template>
  <a :href="currentPost.url">
    <h1>{{ currentPost.title }}</h1>
    <p>{{ currentPost.excerpt }}</p>
  </a>
</template>

<script>
  export default {
    props: {
      posts: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        currentPostId: 0,
        currentPost: {}
      }
    },
    created() {
      this.currentPost = this.posts[this.currentPostId]
    }
  }
</script>
