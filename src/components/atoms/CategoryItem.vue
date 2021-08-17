<template>
  <div>
    <div
      class="
        text-center
        mb-3
        card-bg-scale
        position-relative
        overflow-hidden
        rounded
        bg-dark-overlay-4
      "
      :style="{ backgroundColor: category.color }"
    >
      <div class="p-3">
        <router-link
          tag="a"
          :to="`/category/${category.title}`"
          class="stretched-link btn-link fw-bold text-white h5 capitalize"
          >{{ category.title }}</router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    category: {
      required: true,
      default: () => {},
    },
  },
};
</script>