<template>
  <div>
    <h1 class="post-preview-title">{{ post.title }}</h1>
    <p class="post-preview-excerpt">{{ post.excerpt }}</p>
  </div>
</template>
<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showPostSummary: true
    }
  }
}
</script>
