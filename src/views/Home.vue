<template>
  <section class="skewed-bottom-right">
    <div class="bg-gray-50 pt-12 lg:pt-20 pb-20 radius-for-skewed">
      <div class="container mx-auto px-4">
        <!-- blog card -->
        <div class="flex mt-4">
          <div class="w-9/12">
            <div class="flex flex-wrap">
              <blog-card />
              <blog-card />
              <blog-card />
              <blog-card />
            </div>
          </div>
          <div class="w-1/4">
            <category />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import BlogCard from "@/components/molecules/BlogCard.vue";
import Category from "@/components/molecules/Category.vue";
export default {
  name: "Home",
  components: {
    BlogCard,
    Category,
  },
};
</script>

