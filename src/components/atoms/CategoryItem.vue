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
        <a href="#" class="stretched-link btn-link fw-bold text-white h5">{{
          category.title
        }}</a>
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