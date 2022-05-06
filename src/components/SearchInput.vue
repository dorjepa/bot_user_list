<template>
  <div>
    <v-text-field
        label="Search"
        :rules="rules"
        hide-details="auto"
    ></v-text-field>

  </div>
</template>

<script>
export default {
  data: () => ({
    rules: [
      value => !!value || 'Required.',
      value => (value && value.length >= 1) || 'Min 1 characters',
    ],
  }),
  methods: {
    //
    // searchFruits (e) {
    //   if (!this.searchTerm) {
    //     this.fruits = this.fruitsCopy;
    //   }
    //
    //   this.fruits = this.fruitsCopy.filter(fruit => {
    //     return fruit.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1
    //   })
    // }
  }
}
</script>

<style>
</style>