<template>
  <div id="app">
    <v-app>
<!--      <UsersList />-->
<!--       <UsersListTable />-->
       <UsersListA />
    </v-app>
  </div>
</template>

<script>
import UsersList from "./components/UsersList";
import UsersListTable from "./components/UsersListTable";
import UsersListA from "./components/UsersListA";

export default {
  name: "App",
  components: {
    UsersList,
    UsersListTable,
    UsersListA,
  },
};
</script>

<style>
</style>
