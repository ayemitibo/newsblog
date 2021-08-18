<template>
  <section class="skewed-bottom-right">
    <div class="pt-12 lg:pt-20 pb-20 radius-for-skewed">
      <div class="container mx-auto">
        <div class="flex capitalize font-extrabold justify-between">
          <slot name="header" />
          <div class="flex items-center font-normal">
            <country-flag
              :country="countryCode"
              size="big"
              v-if="countryCode"
            />
            <span class="pl-2">{{ country && country.country }}</span>
            <read-list :storedItem="blogItemsFromStorage">
              <template #activator>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </template>
              <template #title>
                <h1 class="text-center font-bold mb-2">Read Later List</h1>
              </template>
            </read-list>
          </div>
        </div>
      </div>
      <div class="container mx-auto px-4">
        <!-- blog card -->
        <div class="flex mt-4">
          <div class="w-9/12">
            <spinner v-if="loading" />
            <template v-else>
              <div class="flex flex-wrap">
                <template v-for="(item, index) in news && news.articles">
                  <blog-card
                    :key="index"
                    :news="item"
                    :savedNews="blogItemsFromStorage"
                  >
                    <template #readLater>
                      <read-later-button @click="saveIntoStorage(item)" />
                    </template>
                  </blog-card>
                </template>
              </div>
              <pagination
                ref="paginate"
                @get-blog="getBlog"
                v-if="paginationItem"
              >
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
            </template>
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
import BlogCard from "../molecules/BlogCard.vue";
import Category from "../molecules/Category.vue";
import Pagination from "../molecules/Pagination.vue";
import Spinner from "../atoms/Spinner.vue";
import ReadLaterButton from "../atoms/ReadLaterButton";
import ReadList from "../molecules/ReadList";
export default {
  name: "Home",
  components: {
    BlogCard,
    Category,
    Pagination,
    Spinner,
    ReadLaterButton,
    ReadList,
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
  async mounted() {
    let country = await this.$http.get("https://www.iplocate.io/api/lookup/");
    this.country = country;
    await this.getBlog();
  },
  computed: {
    paginationItem() {
      return Math.ceil(this.news?.totalResults / 5);
    },
    countryCode() {
      return this.country?.country_code;
    },
    blogItemsFromStorage() {
      let blogItems;
      if (localStorage.getItem("blogItems") === null) {
        blogItems = [];
      } else {
        blogItems = JSON.parse(localStorage.getItem("blogItems"));
      }
      return blogItems;
    },
  },
  methods: {
    async getBlog(item) {
      this.loading = true;
      let news = await this.$http.get("/top-headlines", {
        params: {
          country: this.country.country_code,
          page: item || 1,
          category: this.$route.params.category,
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
    saveIntoStorage(blogItem) {
      let blogItems = this.blogItemsFromStorage;

      blogItems.push(blogItem);

      localStorage.setItem("blogItems", JSON.stringify(blogItems));
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

