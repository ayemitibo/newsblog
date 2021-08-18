<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div @click.stop="showFunc">
    <slot name="activator" />
    <div
      class="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      v-if="shown"
    >
      <div
        class="
          flex
          items-end
          justify-center
          min-h-screen
          pt-4
          px-4
          pb-20
          text-center
          sm:block
          sm:p-0
        "
        style="position: absolute; right: 0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          @click.stop="clickOutside"
        ></div>

        <div
          class="
            inline-block
            h-screen
            overflow-auto
            align-bottom
            bg-white
            rounded-lg
            text-left
            shadow-xl
            transform
            transition-all
            sm:align-middle
            sm:max-w-lg
            sm:w-full
          "
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4" ref="content">
            <slot name="title" />
            <div class="sm:flex sm:items-start">
              <div class="card overflow-auto">
                <div
                  class="flex border-b border-dashed border-red-200 pb-2"
                  v-for="(item, index) in storedItem"
                  :key="index"
                >
                  <div class="w-1/3 pr-2">
                    <img
                      :src="item.urlToImage"
                      alt=""
                      srcset=""
                      class="rounded-l"
                    />
                  </div>
                  <div class="w-2/3">
                    <h6 class="font-bold text-sm">{{ item.title }}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      shown: false,
    };
  },
  props: {
    storedItem: {
      default: () => [],
      required: true,
    },
  },
  methods: {
    showFunc() {
      if (this.shown) {
        return;
      }
      document.body.style.overflow = "hidden";
      this.shown = true;
    },
    clickOutside() {
      document.body.style.overflow = "auto";
      this.shown = false;
    },
  },
};
</script>