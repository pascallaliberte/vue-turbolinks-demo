<template>
  <div class="post-preview-wrapper">
    <post-link :post="currentPost" :baseurl="baseurl"></post-link>
    <div class="post-preview-nav">
      <button @click="showPrevious" class="post-preview-previous">Go Back</button>
      <button @click="showNext" class="post-preview-next">Next One</button>
      <div class="post-preview-next-title">Next up: <strong>{{ nextPost.title }}</strong></div>
    </div>
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
      },
      baseurl: {
        type: String,
        default: ''
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
