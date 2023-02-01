<template>
  <TodoHeader />

  <TodoInput v-on:add-todo="addTodo" />
  <TodoList v-bind:todos="todos"
    v-on:remove-todo="removeTodo"
    v-on:update-todo="editTodo"
  />

  <TodoFooter v-on:remove-all="clearAll"/>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import TodoHeader from './components/TodoHeader.vue';
import TodoInput from './components/TodoInput.vue';
import TodoList from './components/TodoList.vue';
import TodoFooter from './components/TodoFooter.vue';

export default {
  components: { TodoHeader, TodoInput, TodoList, TodoFooter },

  setup() {
    const store = useStore();
    
    const todos = computed(() => store.state.todos)
    store.dispatch('restore');

    //모든 todo 삭제
    const clearAll = () => {
      store.dispatch('clearAll');
      store.dispatch('save');
    }

    //todo 추가
    const addTodo = (content) => {
      const isEditing = false
      const todo = {isEditing, content}

      store.dispatch('addTodo', todo)
      store.dispatch('save')
    }

    //특정 todo 삭제
    const removeTodo = (index) => {
      store.dispatch('removeTodo', index)
      store.dispatch('save')
    }

    const editTodo = (content, index) => {
      store.dispatch('editTodo', { content, index })
      store.dispatch('save')
    }

    return { todos, clearAll, addTodo, removeTodo, editTodo }
  }



}
</script>

<style scoped>
  body {background-color: #fefefe; text-align: center;}
</style>
