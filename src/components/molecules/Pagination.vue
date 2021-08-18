<template>
  <nav class="pagination">
    <ul class="pagination__list flex justify-center items-center">
      <li
        class="pagination__item p-2"
        @click="movePrev"
        :class="[
          currentStep == start ? 'cursor-not-allowed' : 'cursor-pointer',
        ]"
      >
        PREV
      </li>
      <li
        class="pagination__item p-2"
        @click="moveNext"
        :class="[currentStep == end ? 'cursor-not-allowed' : 'cursor-pointer']"
      >
        NEXT
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      currentStep: 1,
      start: 1,
    };
  },
  props: {
    end: {
      type: Number,
    },
  },
  methods: {
    moveNext(event) {
      event.preventDefault();
      if (this.currentStep >= this.end) {
        console.log("here");
        return;
      } else {
        this.currentStep = this.currentStep + 1;
        console.log(this.currentStep, "curreent");
        this.$emit("get-blog", this.currentStep);
      }
    },
    movePrev(event) {
      event.preventDefault();
      if (this.currentStep <= this.start) {
        return;
      } else {
        this.currentStep = this.currentStep - 1;
        this.$emit("get-blog", this.currentStep);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>