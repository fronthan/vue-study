<template>
  <div>
    <div
    v-for="(todo, idx) in todos"
    :key="todo.id"
    class="card mt-2"
    >
      <div class="card-body p-2 d-flex align-items-center" >
        <div class="form-check flex-grow-1">
          <label
            class="form-check-label"
            :class="{todo : todo.completed}"
            :style="todo.completed ? todoStyle : {}"
            @change="toggleTodo(idx)"
          >
            <input class="form-check-input" type="checkbox" :checked="todo.completed">
            {{ todo.subject }}
          </label>
        </div>
        <div>
          <button 
            class="btn btn-danger btn-sm"
            @click="deleteTodo(idx)"
          >delete
          </button>
        </div>      
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //props: ['todos']
  props: {
    todos: {
      type:Array,
      required:true
    }
  },
  emits: ['delete-todo', 'toggle-todo'],

  setup(props, { emit }){
    const toggleTodo = (index) => {
      emit('toggle-todo', index);
    };

    const deleteTodo = (index) => {
      emit('delete-todo', index);
    }
    return {
      toggleTodo,
      deleteTodo
    }

    const todoStyle = {
      textDecoration: 'line-through',
      color: 'gray'
    };    
  }

}
</script>

<style>

</style>