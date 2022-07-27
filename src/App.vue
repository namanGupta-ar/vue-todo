<template>
  <div id="app">
    <to-do></to-do>
  </div>
</template>

<script>

import toDo from './components/toDo.vue';
export default {
  name: 'App',
  components: {
    "to-do": toDo,
}
}
</script>

<style>
  body{
    background-color: rgb(27, 19, 19);
  }
</style>
