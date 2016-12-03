<template>
  <div>
    <button @click="previousArticle">Previous</button>
    <button @click="nextArticle">Next</button>
    <a :href="currentPost.url">
      <h1>{{ currentPost.title }}</h1>
      <p>{{ currentPost.excerpt }}</p>
    </a>
  </div>
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
        currentPostId: null,
        currentPost: {}
      }
    },
    created() {
      this.currentPostId = 0
    },
    methods: {
      nextArticle () {
        this.currentPostId = (this.currentPostId == this.posts.length -1)? 0: this.currentPostId + 1
      },
      previousArticle() {
        this.currentPostId = (this.currentPostId == 0)? this.posts.length -1: this.currentPostId - 1
      }
    },
    watch: {
      currentPostId (newVal, oldVal) {
        if (this.posts[newVal] !== undefined) {
          this.currentPost = this.posts[newVal]
        }
      }
    }
  }
</script>
