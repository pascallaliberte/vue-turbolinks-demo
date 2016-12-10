<template>
  <div class="post-preview-summary">
    <h1 class="post-preview-title">{{ post.title }}</h1>
    <p ref="excerpt" class="post-preview-excerpt">{{ post.excerpt }}</p>
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
