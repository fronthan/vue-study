<template>
  <div class="todo_list">
    <ul>
      <TodoItem
        v-for="todo in todos"
        v-bind:key="todo.id"
        v-bind:todo="todo"
        v-bind:editingId="editingId"
        v-on:remove-todo="fireRemoveTodo"
        v-on:update-todo="fireUpdateTodo"
        v-on:set-editing-id="fireSetEditingId"
        v-on:reset-editing-id="fireResetEditingId"
      />
    </ul>
  </div>
</template>

<script>
// import { ref } from 'vue';
import TodoItem from './TodoItem.vue';

export default {
  components: { TodoItem },
  props: ['todos', 'editingId'],
  emits: ['remove-todo', 'update-todo', 'set-editing-id', 'reset-editing-id'],

  setup(props, {emit}) {
    // const todos = props.todos;

    // const removeTodo = (idx) => {
    //   emit('remove-todo', idx);
    //   todos.value.splice(idx, 1);
    // }

    // const editInput = ref(null);
    
    const fireSetEditingId = (id) => {
      emit('set-editing-id', id)
    }

    const fireResetEditingId = () => {
      emit('reset-editing-id')
    }

    const fireRemoveTodo = (id) => {
      emit('remove-todo', id)
    }

    const fireUpdateTodo = (content, id) => {
      emit('update-todo', content, id)
    }

    // const isEditing = (index) => {
    //   if(todos[index]) {
    //     return todos[index].id === props.editingId
    //   }

    //   return false
    // }

    return { fireSetEditingId, fireResetEditingId, fireRemoveTodo, fireUpdateTodo }
  }
}
</script>

<style>
.todo_list {background-color: #ff0;}
</style>