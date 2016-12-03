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
  import KnuthShuffle from 'knuth-shuffle'

  let shuffle = KnuthShuffle.knuthShuffle

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
        currentPost: {},
        postsRandomized: []
      }
    },
    created() {
      this.postsRandomized = shuffle(this.posts.slice(0)) // makes a copy
      this.currentPostId = 0
    },
    methods: {
      nextArticle () {
        this.currentPostId = (this.currentPostId == this.postsRandomized.length -1)? 0: this.currentPostId + 1
      },
      previousArticle() {
        this.currentPostId = (this.currentPostId == 0)? this.postsRandomized.length -1: this.currentPostId - 1
      }
    },
    watch: {
      currentPostId (newVal, oldVal) {
        if (this.postsRandomized[newVal] !== undefined) {
          this.currentPost = this.postsRandomized[newVal]
        }
      }
    }
  }
</script>
