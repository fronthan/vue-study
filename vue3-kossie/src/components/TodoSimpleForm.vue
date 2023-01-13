<template>
  <form @submit.prevent="onSubmit">
    <div class="d-flex">
      <div class="flex-grow-1 me-2">
        <input class="form-control" type="text"
        v-model="todo"
        placeholder="새로운 할 일을 입력"
        >
      </div>
      <div>
        <button type="submit" class="btn btn-primary">
          Add
        </button>
      </div>
    </div>
    <div v-show="hasError" class="error">입력된 값이 없습니다.</div>
  </form>
</template>

<script>
  import { ref } from 'vue';

  export default {
    setup(props, context) {
      const todo = ref('');
      const hasError = ref(false);

      const onSubmit = () => {
        if (todo.value == '') {
          hasError.value = true;
        } else {     
          context.emit('add-todo', {//부모 컴포넌트로 보내는 함수
            id: Date.now(),
            subject: todo.value,
            completed:false
          });   
          
          hasError.value = false;
          todo.value = '';
        }
      };

      return {
        todo,
        hasError,
        onSubmit
      }
    }
  }
</script>

<style></style>