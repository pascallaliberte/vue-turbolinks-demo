<template>
  <div>
    <button @click="showPrevious">Previous</button>
    <button @click="showNext">Next</button>
    <a :href="currentPost.url">
      <h1>{{ currentPost.title }}</h1>
      <p>{{ currentPost.excerpt }}</p>
    </a>
    <div>Next up: <strong>{{ nextPost.title }}</strong></div>
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
    computed: {
      nextPostId() {
        return (this.currentPostId == this.postsRandomized.length -1)? 0: this.currentPostId + 1
      },
      previousPostId() {
        return (this.currentPostId == 0)? this.postsRandomized.length -1: this.currentPostId - 1
      },
      nextPost() {
        return this.postsRandomized[this.nextPostId]
      },
      previousPost() {
        return this.postsRandomized[this.previousPostId]
      }
    },
    methods: {
      showNext () {
        this.currentPostId = this.nextPostId
      },
      showPrevious() {
        this.currentPostId = this.previousPostId
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
