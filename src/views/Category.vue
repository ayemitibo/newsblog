<template>
  <section class="skewed-bottom-right">
    {{ country && country.country }}
    <div class="bg-gray-50 pt-12 lg:pt-20 pb-20 radius-for-skewed">
      <div class="container mx-auto px-4">
        <!-- blog card -->
        <div class="flex mt-4">
          <div class="w-9/12">
            <div class="flex flex-wrap">
              <spinner v-if="loading" />
              <template v-for="(item, index) in news && news.articles" v-else>
                <blog-card :key="index" :news="item" />
              </template>
            </div>
            <pagination ref="paginate" @get-blog="getBlog">
              <template #default="{ currentItem }">
                <li
                  class="pagination__item p-2"
                  v-for="item in paginationItem"
                  :key="item"
                  @click="paginate(item)"
                >
                  <a
                    href="#"
                    class="pagination__link"
                    :class="[currentItem === item ? 'active' : null]"
                    >{{ item }}
                  </a>
                </li>
              </template>
            </pagination>
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
import BlogCard from "@/components/molecules/BlogCard.vue";
import Category from "@/components/molecules/Category.vue";
import Pagination from "@/components/molecules/Pagination.vue";
import Spinner from "@/components/atoms/Spinner.vue";
export default {
  name: "Home",
  components: {
    BlogCard,
    Category,
    Pagination,
    Spinner,
  },
  data() {
    return {
      country: null,
      gettingLocation: false,
      errorStr: null,
      news: [],
      loading: false,
    };
  },
  watch: {
    "$route.params": {
      deep: true,
      handler() {
        this.getBlog();
      },
    },
  },
  async mounted() {
    let country = await this.$http.get("https://www.iplocate.io/api/lookup/");
    this.country = country;
    await this.getBlog();
  },
  computed: {
    paginationItem() {
      return Math.ceil(this.news?.totalResults / 5) || 1;
    },
  },
  methods: {
    async getBlog(item) {
      this.loading = true;
      let news = await this.$http.get("/top-headlines", {
        params: {
          country: this.country.country_code,
          page: item || 1,
          category: this.$route.params?.category,
        },
      });
      this.news = news;
      this.loading = false;
    },
    async paginate(item) {
      await this.getBlog(item);
      this.$nextTick(async () => {
        await this.$refs.paginate.next(item);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.pagination__link {
  &.active {
    @apply underline;
  }
}
</style>

