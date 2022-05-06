<template>
  <div class="text-center">
<!--    <v-btn class="ma-2" color="orange darken-2" dark @click="changePage(previousPageUrl)" >-->
      <v-btn
          class="ma-2"
          color="orange darken-2"
          dark
          @click="changePage(offset - limit)"
      >
      <v-icon dark left> mdi-arrow-left </v-icon>Previous Page<!-- {{previousPageUrl}}-->
    </v-btn>

<!--    <v-btn class="ma-2" color="orange darken-2" dark @click="changePage(nextPageUrl)" >-->
      <v-btn
          class="ma-2"
          color="orange darken-2"
          dark
          @click="changePage(offset + limit)"
      >
<!--      {{nextPageUrl}} -->Next Page <v-icon dark right> mdi-arrow-right </v-icon>
    </v-btn>

  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
    };
  },
  props: {
    nextPageUrl: String,
    previousPageUrl: String,

    // временные свойства
    limit: Number,
    offset: Number,
  },
  methods: {
    changePage(url) {
      this.$emit('updateParent', {
        // pageUrlRequire: {
        //   url: url,
        // },
        pageUrlRequire: {
          limit: this.limit,
          offset: url,
        }
      })
    },
  },
};
</script>