<template>
  <TodoHeader />

  <TodoInput v-on:add-todo="addTodo" />
  <TodoList v-bind:todos="todos"
    v-bind:editingId="editingId"
    v-on:remove-todo="removeTodo"
    v-on:update-todo="editTodo"
    v-on:set-editing-id="setEditingId"
    v-on:reset-editing-id="resetEditingId"
  />

  <TodoFooter v-on:remove-all="clearAll"/>
</template>

<script>
import { ref, computed } from 'vue';
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

    const editingId = computed(()=> store.state.editingId)
    //모든 todo 삭제
    const clearAll = () => {
      store.dispatch('clearAll');
      store.dispatch('save');
    }

    //todo 추가
    const addTodo = (content) => {
      const id = new Date().getTime();
      const todo = { id, content }

      store.dispatch('addTodo', todo)
      store.dispatch('save')
    }

    //특정 todo 삭제
    const removeTodo = (index) => {
      store.dispatch('removeTodo', index)
      store.dispatch('save')
    }

    const editTodo = (content, id) => {
      store.dispatch('editTodo', { content, id })
      store.dispatch('save')
    }

    const setEidingId = (id) => {
      store.dispatch('setEditingId', id);
    }

    const resetEditingId = () => {
      store.dispatch('resetEditingId')
    }

    return { todos, editingId, clearAll, addTodo, removeTodo, editTodo, setEidingId, resetEditingId}
  }



}
</script>

<style scoped>
  body {background-color: #fefefe; text-align: center;}
</style>
