<template>
  <blog-post ref="blog">
    <template #header> {{ getRouteName }} Section </template>
    <template #homeRoute>
      <router-link to="/" class="underline" tag="a">Go to Home</router-link>
    </template>
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

