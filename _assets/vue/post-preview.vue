<template>
  <div>
    <button @click="showPrevious">Previous</button>
    <button @click="showNext">Next</button>
    <post-link :post="currentPost"></post-link>
    <div>Next up: <strong>{{ nextPost.title }}</strong></div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import KnuthShuffle from 'knuth-shuffle'
  import CircularJSON from 'circular-json'

  let shuffle = KnuthShuffle.knuthShuffle

  import PostLink from './post-link.vue'

  export default {
    components: {
      PostLink
    },
    props: {
      posts: {
        type: Array,
        required: true
      }
    },
    init () {
    },
    data () {
      return {
        currentPostId: null,
        currentPost: {},
        postsRandomized: []
      }
    },
    created() {
      // this.$set(this.originalElOuterHTML, 'originalElOuterHTML', this.el.outerHTML)
      this.postsRandomized = shuffle(this.posts.slice(0)) // makes a copy
      this.currentPostId = 0
    },
    beforeMount() {
    },
    mounted() {
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
