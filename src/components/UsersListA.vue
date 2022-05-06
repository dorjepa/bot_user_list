<template>
  <div id="watch-example">
      <v-text-field
          label="Search"
          hide-details="auto"
          v-model="userSearchText"
      ></v-text-field>

      <v-text-field color="success" loading disabled v-show="loader"></v-text-field>

    <p>{{ errorMessage }}</p>


    <v-card class="mx-auto" max-width="600" tile>
      <v-list>
        <v-subheader>USERS</v-subheader>

        <UsersPagination
            :nextPageUrl="nextPageUrl"
            :previousPageUrl="previousPageUrl"
            :limit="limit"
            :offset="offset"
            @updateParent="getUsersList"
        />


        <v-list-item-group color="primary">
          <v-list-item
              v-for="(character, i) in usersData.result"
              :key="character.char_id + i"
          >
            <v-list-item-icon>
              <v-img
                  max-height="60"
                  max-width="60"
                  :src="`${character.img}`"
              ></v-img>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="character.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import UsersPagination from "./UsersPagination";

export default {
  name: "UsersListA",
  components: {
    UsersPagination,
  },
  data: () => ({
    userSearchText: '',
    usersData: {},
    errorMessage: '',
    loader: false,
    nextPageUrl: '',
    previousPageUrl: '',
    limit: 2,
    offset: 0,
  }),
  async mounted() {
    this.getUsersList();
  },
  watch: {
    // эта функция запускается при любом изменении поля поиска
    userSearchText: function (newUserSearchText, oldUserSearchText) {
      this.debouncedGetUsersList()
    }
  },
  created: function () {
    // _.debounce — это функция lodash, позволяющая ограничить то,
    // насколько часто может выполняться определённая операция.
    // В данном случае мы ограничиваем частоту обращений к yesno.wtf/api,
    // дожидаясь завершения печати вопроса перед отправкой ajax-запроса.
    // Узнать больше о функции _.debounce (и её родственнице _.throttle),
    // можно в документации: https://lodash.com/docs#debounce
    this.debouncedGetUsersList = _.debounce(this.getUsersList, 500)
  },
  methods: {
    getUsersList: function (pageUrlRequire = {}) {
      this.loader = true
      var vm = this

      let responceData = {
        url: "https://www.breakingbadapi.com/api/characters",
        name: vm.userSearchText.toLowerCase(),
        limit: vm.limit,
        offset: vm.offset,
      };
      let responceUrl = '';
      console.log('pageUrlRequire: ', pageUrlRequire.pageUrlRequire)
      console.log('pageUrlRequire.length: ', pageUrlRequire.length)
      if (pageUrlRequire.pageUrlRequire) {
        // responceUrl = responceData.url + '?' + pageUrlRequire.url

        vm.offset = pageUrlRequire.pageUrlRequire.offset;

        responceUrl =
            responceData.url +
            "?name=" +
            responceData.name +
            "&limit=" +
            pageUrlRequire.pageUrlRequire.limit +
            "&offset=" +
            pageUrlRequire.pageUrlRequire.offset;
      }
      else {
        responceUrl =
            responceData.url +
            "?name=" +
            responceData.name +
            "&limit=" +
            responceData.limit +
            "&offset=" +
            responceData.offset;
      }

      console.log('responceUrl: ', responceUrl)
      axios.get(responceUrl)
          .then(function (response) {
            console.log('response.data: ', response.data)

            // Приводим временно получаемые данные к формату будущего API
            // GET ->
            // /api/users?searchTerm={value} ->
            // {
            //    result: [
            //       {id:string, name:string, avatarUrl: string}
            //    ],
            //    nextPageUrl?:string,
            //    previousPageUrl?:string
            // }
            // и записываем в usersData
            let getUsersData = {
              result: response.data,
              "nextPageUrl?":
                  "name=" +responceData.name +
                  "&limit=" +
                  responceData.limit +
                  "&offset=" +
                  +(responceData.offset + responceData.limit),
              "previousPageUrl?":
                  "name=" +
                  responceData.name +
                  "&limit=" +
                  responceData.limit +
                  "&offset=" +
                  +(responceData.offset - responceData.limit)
            };

            vm.usersData = getUsersData
            vm.nextPageUrl = String(getUsersData['nextPageUrl?'])
            vm.previousPageUrl = String(getUsersData['previousPageUrl?'])
            vm.loader = false
            // return response.data;
          })
          .catch(function (error) {
            vm.errorMessage = 'Ошибка! Не могу связаться с API. ' + error
          })
    }
  }
}
</script>