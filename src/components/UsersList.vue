<template>
  <div>
    <v-card class="mx-auto" max-width="600" tile>
      <v-list>
        <v-subheader @click="searchUsers()">USERS</v-subheader>

        <v-text-field color="success" loading disabled></v-text-field>
        <SearchInput />

        <v-text-field
            v-model="searchTerm"
            placeholder="Search 2"
            @input="searchUsers"
        ></v-text-field>

        <UsersPagination
            :nextPageUrl="nextPageUrl"
            :previousPageUrl="previousPageUrl"
        />

        <v-list-item-group color="primary">
          <v-list-item
              v-for="(character, i) in allUsers"
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
import SearchInput from "./SearchInput";
import UsersPagination from "./UsersPagination";
import { mapGetters, mapActions, mapMutations } from "vuex";
// GET -> /api/users?searchTerm={value} -> {result: [{id:string, name:string, avatarUrl: string}], nextPageUrl?:string, previousPageUrl?:string }

const responceUrl =
    "https://www.breakingbadapi.com/api/characters?name=w&limit=2&offset=2";

let responceData = {
  url: "https://www.breakingbadapi.com/api/characters",
  name: "w",
  limit: 2,
  offset: 2,
};
export default {
  name: "UsersList",
  computed: {
    ...mapGetters(["allUsers", "nextPageUrl", "previousPageUrl"]),
  },
  async mounted() {
    this.fetchUsers(responceData);
  },
  methods: {
    ...mapActions(["fetchUsers"]),
    searchUsers(){
      responceData.name = 'wa';
      responceData.name = allUsersData.filter(user => {
        return user.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1
      })
      console.log('responceData: ', responceData)
      this.fetchUsers(responceData);
    },

    searchFruits (e) {
      if (!this.searchTerm) {
        this.fruits = this.fruitsCopy;
      }

      this.fruits = this.fruitsCopy.filter(fruit => {
        return fruit.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1
      })
    }
  },
  components: {
    SearchInput,
    UsersPagination,
  },

  data() {
    return {
      searchTerm: "",
      allUsersData: mapGetters(["allUsers"]),
    };
  },
};
</script>

<style>
</style>
