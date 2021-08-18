<template>
  <div class="w-1/2 px-6">
    <div class="card">
      <div class="relative">
        <img
          class="rounded-2xl"
          :src="news.urlToImage"
          alt="Card image"
          v-if="news.urlToImage"
        />
        <img
          class="rounded-2xl"
          src="@/assets/images/01.jpeg"
          alt="Card image"
          v-else
        />
        <div class="w-full text-center lg:text-left card-image-overlay">
          <slot name="readLater" v-if="!isSavedInStore" />
        </div>
      </div>
      <div class="card-body px-0 pt-3">
        <h4 class="card-title">
          <a
            :href="news.url"
            class="btn-link text-reset font-bold"
            target="_blank"
            >{{ news.source && news.source.name }}</a
          >
        </h4>
        <p class="card-text">
          {{ news.title }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    news: {
      required: true,
      default: () => {},
    },
    savedNews: {
      required: true,
      default: () => [],
    },
  },
  computed: {
    isSavedInStore() {
      const mappedData = this.savedNews.map((item) => {
        return item.title;
      });
      return mappedData.includes(this.news.title);
    },
  },
};
</script>
<style scoped lang="scss">
.card-image-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1.25rem;
  border-radius: 0.7rem;
  padding: 2rem !important;
  @apply flex items-center;

  .bg-danger {
    background-color: #d6293e !important;
  }
  .mb-2 {
    margin-bottom: 0.5rem !important;
  }
  .badge {
    display: inline-block;
    padding: 0.35em 0.65em;
    font-size: 0.85em;
    font-weight: 400;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25rem;
  }

  .card {
    position: relative;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 0 solid rgba(0, 0, 0, 0.1);
    border-radius: 0.7rem;
  }
}

.pt-3 {
  padding-top: 1rem !important;
}
.px-0 {
  padding-right: 0 !important;
  padding-left: 0 !important;
}
.card-body {
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 0.75rem 1.25rem;
  text-align: start;
}

.card-title {
  margin-bottom: 0.5rem;
}
</style>