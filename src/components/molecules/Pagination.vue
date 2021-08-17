<template>
  <nav class="pagination">
    <ul class="pagination__list flex justify-center items-center">
      <li class="pagination__item p-2" @click="movePrev">
        <a href="#" class="pagination__link">
          <svg
            class="icon"
            width="8px"
            height="10px"
            viewBox="18 18 8 10"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <title>Arrow Left</title>
            <polygon
              id="Left-Icon"
              stroke="none"
              fill-rule="evenodd"
              transform="translate(22.027061, 23.000000) scale(-1, 1) translate(-22.027061, -23.000000) "
              points="22.9427745 22.9999999 19 26.9458774 20.0541226 28 25.0541226 23 20.0541226 18 19 19.0541226"
            ></polygon>
          </svg>
        </a>
      </li>
      <slot :current-item="currentStep" />
      <li class="pagination__item p-2" @click="moveNext">
        <a href="#" class="pagination__link">
          <svg
            class="icon"
            width="8px"
            height="10px"
            viewBox="18 18 8 10"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <title>Arrow Right</title>
            <polygon
              id="Left-Iocn"
              stroke="none"
              fill-rule="evenodd"
              points="22.9427745 22.9999999 19 26.9458774 20.0541226 28 25.0541226 23 20.0541226 18 19 19.0541226"
            ></polygon>
          </svg>
        </a>
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
      end: 6,
    };
  },
  methods: {
    next(payload) {
      this.currentStep = payload;
    },
    moveNext(event) {
      event.preventDefault();
      //   this.currentStep = this.currentStep + 1;
      if (this.currentStep >= this.end) {
        return;
      } else {
        this.currentStep = this.currentStep + 1;
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