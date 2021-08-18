<template>
  <section class="skewed-bottom-right">
    <div class="pt-12 lg:pt-20 pb-20 radius-for-skewed">
      <div class="container mx-auto">
        <div class="flex capitalize font-extrabold justify-between">
          <slot name="header" />
          <slot name="homeRoute" />
          <slot name="search" :search="searchBlog" />
          <div class="flex items-center font-normal">
            <country-flag
              :country="countryCode"
              size="big"
              v-if="countryCode"
            />
            <span class="pl-2 mr-3">{{ country && country.country }}</span>
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
          <div class="sm:w-full md:w-9/12 lg:w-9/12">
            <spinner v-show="loading" />
            <div v-show="!loading">
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
                :end="paginationItem"
                v-if="paginationItem"
              >
              </pagination>
            </div>
          </div>
          <div class="w-full md:w-1/4 lg:w-1/4">
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
import Spinner from "../atoms/Spinner.vue";
import ReadLaterButton from "../atoms/ReadLaterButton";
import ReadList from "../molecules/ReadList";
import Pagination from "../molecules/Pagination.vue";
export default {
  name: "Home",
  components: {
    BlogCard,
    Category,
    Spinner,
    ReadLaterButton,
    ReadList,
    Pagination,
  },
  data() {
    return {
      country: null,
      gettingLocation: false,
      errorStr: null,
      news: [],
      loading: false,
      page: 1,
      searchValue: "",
      savedNews: localStorage.getItem("blogItems"),
    };
  },
  async mounted() {
    let country = await this.$http.get("https://www.iplocate.io/api/lookup/");
    this.country = country;
    await this.getBlog();
  },
  computed: {
    paginationItem() {
      return this.news?.totalResults;
    },
    countryCode() {
      return this.country?.country_code;
    },
    blogItemsFromStorage: {
      get() {
        let blogItems;
        if (this.savedNews === null) {
          blogItems = [];
        } else {
          blogItems = JSON.parse(this.savedNews);
        }
        return blogItems;
      },
      set(value) {
        this.savedNews = value;
      },
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
          q: this.searchValue || "",
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
      this.blogItemsFromStorage = JSON.stringify(blogItems);
    },
    searchBlog(e) {
      if (e.target.value) {
        this.searchValue = e.target.value;
        this.debounce(async () => {
          this.loading = true;
          let news = await this.$http.get("/everything", {
            params: {
              q: this.searchValue,
            },
          });
          this.news = news;
          this.loading = false;
        }, 1000);
      }
    },
  },
  created() {
    this.debounce = this.$utils.createDebounce();
  },
};
</script>
<style lang="postcss" scoped>
.pagination__link {
  &.active {
    @apply underline;
  }
}

.paginate {
  ul.VuePagination__pagination {
    display: flex;
  }
}
</style>

