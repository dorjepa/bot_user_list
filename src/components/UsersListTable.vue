<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="desserts"
        :pagination.sync="pagination"
        :total-items="totalDesserts"
        :loading="loading"
        class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.char_id }}</td>
        <td class="text-xs-right">{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.img }}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalDesserts: 0,
      desserts: [],
      loading: true,
      pagination: {},
      headers: [
        {
          text: "char_id",
          align: "left",
          sortable: false,
          value: "char_id",
        },
        { text: "name", value: "name" },
        { text: "img", value: "img" },
      ],
    };
  },
  watch: {
    pagination: {
      handler() {
        this.getDataFromApi().then((data) => {
          this.desserts = data.items;
          this.totalDesserts = data.total;
        });
      },
      deep: true,
    },
  },
  mounted() {
    this.getDataFromApi().then((data) => {
      this.desserts = data.items;
      this.totalDesserts = data.total;
    });
  },
  methods: {
    getDataFromApi() {
      this.loading = true;
      return new Promise((resolve, reject) => {
        const { sortBy, descending, page, rowsPerPage } = this.pagination;

        let responceData = {
          url: "https://www.breakingbadapi.com/api/characters",
          name: "w",
          limit: 2,
          offset: 2,
        };
        let items = this.getDesserts(responceData);
        console.log('items: ', items)
        const total = items.length;

        if (this.pagination.sortBy) {
          items = items.sort((a, b) => {
            const sortA = a[sortBy];
            const sortB = b[sortBy];

            if (descending) {
              if (sortA < sortB) return 1;
              if (sortA > sortB) return -1;
              return 0;
            } else {
              if (sortA < sortB) return -1;
              if (sortA > sortB) return 1;
              return 0;
            }
          });
        }

        if (rowsPerPage > 0) {
          items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage);
        }

        setTimeout(() => {
          this.loading = false;
          resolve({
            items,
            total,
          });
        }, 1000);
      });
    },
    async getDesserts(responceData) {
      // responceData = {
      //   url: "https://www.breakingbadapi.com/api/characters",
      //   name: "w",
      //   limit: 2,
      //   offset: 2,
      // };
      let responceUrl =
          responceData.url +
          "?name=" +
          responceData.name +
          "&limit=" +
          responceData.limit +
          "&offset=" +
          responceData.offset;

      const res = await fetch(responceUrl);
      const users = await res.json();
      console.log('usersTable: ', users)

      let result = users;

      return result;
      // return [
      //   {
      //     char_id: "Frozen Yogurt",
      //     name: 159,
      //     img: 6.0,
      //   },
      //   {
      //     char_id: "Ice cream sandwich",
      //     name: 237,
      //     img: 9.0,
      //   },
      //   {
      //     char_id: "Eclair",
      //     name: 262,
      //     img: 16.0,
      //   },
      //   {
      //     char_id: "Cupcake",
      //     name: 305,
      //     img: 3.7,
      //   },
      //   {
      //     char_id: "Gingerbread",
      //     name: 356,
      //     img: 16.0,
      //   },
      //   {
      //     char_id: "Jelly bean",
      //     name: 375,
      //     img: 0.0,
      //   },
      // ];
    },
  },
};
</script>