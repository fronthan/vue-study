<template>
  <TodoHeader />

  <TodoInput />
  <TodoList />

  <TodoFooter />
</template>

<script>
import TodoHeader from './components/TodoHeader.vue';
import TodoInput from './components/TodoInput.vue';
import TodoList from './components/TodoList.vue';
import TodoFooter from './components/TodoFooter.vue';

export default {
  components: { TodoHeader, TodoInput, TodoList, TodoFooter }


}
</script>

<style scoped>
  body {background-color: #fefefe; text-align: center;}
</style>