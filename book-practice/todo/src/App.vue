<template>
  <div>
    <TodoHeader />

    <TodoInput v-on:add-todo="handleAddTodo" />

    <TodoFilter v-bind:filter="filter" v-on:set-filter="handleSetFilter" />

    <TodoList
      v-on:remove-todo="handleRemoveTodo"
      v-on:update-todo="handleEditTodo"
      v-on:set-editing-id="handleSetEditingId"
      v-on:reset-editing-id="handleResetEditingId"
      v-on:toggle-todo-status="handleToggleTodoStatus"
    />

    <TodoFooter v-on:remove-all="handleClearAll" />
  </div>
</template>

<script>
import { readonly, provide } from 'vue';

import TodoHeader from "./components/TodoHeader.vue";
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
import TodoFooter from "./components/TodoFooter.vue";

import { useTodos } from "./compositions/useTodos.js";
import TodoFilter from "./components/TodoFilter.vue";

export default {
  components: { TodoHeader, TodoInput, TodoList, TodoFooter, TodoFilter },

  setup() {
     const {
      todos,
      editingId,
      filter,
      filteredTodos,
      addTodo,
      removeTodo,
      clearAll,
      editTodo,
      setEditingId,
      resetEditingId,
      save,
      restore,
      toggleTodoStatus,
      setFilter
    } = useTodos();

    //자식 컴포넌트에 데이터와 함수 전달
    provide('filteredTodos', readonly(filteredTodos))
    provide('editingId', editingId)
    provide('filter', filter)

    //모든 todo 삭제
    const handleClearAll = () => {
      clearAll();
      save();
    };

    //todo 추가
    const handleAddTodo = content => {
      const todo = { content };

      addTodo(todo);
      save();
    };

    //특정 todo 삭제
    const handleRemoveTodo = id => {
      removeTodo(id);
      save();
    };

    //특정 todo 편집
    const handleEditTodo = (content, id) => {
      editTodo({ id, content });
      save();
    };

    const handleSetEditingId = id => {
      setEditingId(id);
    };

    const handleResetEditingId = () => {
      resetEditingId();
    };

    const handleToggleTodoStatus = id => {
      toggleTodoStatus();
      save();
    };

    const handleSetFilter = filter => {
      setFilter(filter);
    };

    restore();

    return {
      todos,
      filteredTodos,
      editingId,
      filter,
      handleClearAll,
      handleAddTodo,
      handleRemoveTodo,
      handleEditTodo,
      handleSetEditingId,
      handleResetEditingId,
      handleToggleTodoStatus,
      handleSetFilter
    };
  }
};
</script>

<style scoped>
body {
  background-color: #fefefe;
  text-align: center;
}
</style>
