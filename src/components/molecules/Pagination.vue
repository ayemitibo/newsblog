<template>
  <nav class="pagination">
    <ul class="pagination__list flex justify-center items-center">
      <slot :current-item="currentStep" />
    </ul>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      currentStep: 1,
      start: 1,
      end: 6,
    };
  },
  methods: {
    next(payload) {
      this.currentStep = payload;
    },
  },
};
</script>