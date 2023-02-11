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
        v-on:toggle-todo-status="fireToggleTodoStatus"
      />
    </ul>
  </div>
</template>

<script>
import { inject } from 'vue';
import TodoItem from './TodoItem.vue';

export default {
  components: { TodoItem },
  emits: ['remove-todo', 'update-todo', 'set-editing-id', 'reset-editing-id','toggle-todo-status'],

  setup(props, {emit}) {
    //공급된 provide 데이터 가져오기
    const todos = inject('filteredTodos')
    const editingId= inject('editingId')   

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

    const fireToggleTodoStatus = (id) => {
      emit('toggle-todo-status', id);
    }

    // const isEditing = (index) => {
    //   if(todos[index]) {
    //     return todos[index].id === props.editingId
    //   }

    //   return false
    // }

    return { todos, editingId, fireSetEditingId, fireResetEditingId, fireRemoveTodo, fireUpdateTodo, fireToggleTodoStatus }
  }
}
</script>

<style>
.todo_list {background-color: #ff0;}
</style>