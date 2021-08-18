<template>
  <div>
    <h4 class="mt-4 mb-3">Categories</h4>
    <!-- Category item -->
    <template v-for="(item, index) in categories">
      <category-item :key="index" :category="item" />
    </template>
  </div>
</template>
<script>
import CategoryItem from "../atoms/CategoryItem.vue";
import { categories } from "../../categories";
export default {
  components: {
    CategoryItem,
  },
  data() {
    return {
      categories,
    };
  },
};
</script>