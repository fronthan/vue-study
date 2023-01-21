<template>
<div>

  <h1>Todo Page</h1>

  <div v-if="loading">
    loading. . .
  </div>

  <form
   v-else
    @submit.prevent="onSave"
  >
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label>제목</label>
          <input type="text" class="form-control" v-model="todo.subject">
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label>Status</label>
          <div>
            <button
              type="button"
              class="btn"
              :class="todo.completed ? 'btn-success' : 'btn-danger'"
              @click="toggleTodoStatus"
            >{{todo.completed ? 'Completed' : 'Incomplete' }}</button>
          </div>
        </div>
      </div>
    </div>
    
    <button
      class="btn btn-outline-dark me-2"
      @click="movoToTodoListPage"    
    >취소</button>
    <button type="submit" 
      class="btn btn-primary"
    >저장</button>
  </form>
</div>

</template>
<script>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const todo = ref(null);
    const loading = ref(true);
    const todoId = route.params.id;

    const getTodo = async () => {
      const res = await axios.get(`http://localhost:3000/todos/${todoId}`);

      todo.value = res.data;
      loading.value = false;

    };

    getTodo();

    const toggleTodoStatus = () => {
      todo.value.completed = !todo.value.completed;
    };
 
    const movoToTodoListPage = () => {
      router.push({
        name: 'Todos'
      })
    }

    const onSave = async () => {
      const res = await axios.put(`http://localhost:3000/todos/${todoId}`, {
        subject : todo.value.subject,
        completed : todo.value.completed
      });

      console.log(res)
    }

    return {
      todo,
      loading,
      toggleTodoStatus,
      movoToTodoListPage,
      onSave
    }

  }
}
</script>
<style>
  
</style>