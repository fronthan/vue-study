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
      :disabled="!todoUpdated"
    >저장</button>
  </form>

  <Toast
   v-if="showToast"
   :message="toastMessage"
   :type="toastAlert"
  />
</div>

</template>
<script>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import _ from 'lodash';
import { useToast } from '@/composables/toast.js';
import Toast from '@/components/Toast.vue';

export default {
  components: {
    Toast
  },

  setup() {
    const route = useRoute();
    const router = useRouter();
    const todo = ref(null);
    const originalTodo = ref(null);
    const loading = ref(true);
    const todoId = route.params.id;

    const {
      toastMessage,
      showToast,
      triggerToast,
      toastAlert
    } = useToast();
    
    const getTodo = async () => {
      try {

        const res = await axios.get(`http://localhost:3000/todos/${todoId}`);

        todo.value = { ...res.data};
        originalTodo.value = { ...res.data};
        loading.value = false;
      } catch(err) {
        triggerToast('오류가 발생했습니다.', 'danger');
      }

    };

    getTodo();

    const todoUpdated = computed(() => {
      return !_.isEqual(todo.value, originalTodo.value);
    });

    const toggleTodoStatus = () => {
      todo.value.completed = !todo.value.completed;
    };
 
    const movoToTodoListPage = () => {
      router.push({
        name: 'Todos'
      })
    }

    
    const onSave = async () => {
      try {
        const res = await axios.put(`http://localhost:3000/todos/${todoId}`, {
          subject : todo.value.subject,
          completed : todo.value.completed
        });

      // console.log(res)
        originalTodo.value = { ...res.data }
        triggerToast('저장 성공');
      } catch(err) {
        triggerToast('에러가 발생했습니다.', 'danger');
      }
    }

    return {
      todo,
      loading,
      toggleTodoStatus,
      movoToTodoListPage,
      onSave,
      todoUpdated,
      showToast,
      toastMessage,
      toastAlert
    }

  }
}
</script>
<style>
  
</style>