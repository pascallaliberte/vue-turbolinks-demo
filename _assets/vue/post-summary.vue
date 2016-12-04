<template>
  <div>
    <h1>{{ post.title }}</h1>
    <p>{{ post.excerpt }}</p>
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
