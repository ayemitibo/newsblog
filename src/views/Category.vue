<template>
  <blog-post ref="blog">
    <template #header> {{ getRouteName }} Section </template>
  </blog-post>
</template>

<script>
import BlogPost from "@/components/organisms/BlogPost.vue";

export default {
  name: "Home",
  components: {
    BlogPost,
  },
  watch: {
    "$route.params": {
      deep: true,
      handler() {
        this.$refs.blog.getBlog();
      },
    },
  },
  computed: {
    getRouteName() {
      return this.$route.params.category;
    },
  },
};
</script>

