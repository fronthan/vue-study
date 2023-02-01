<template>
  <div>
    <button @click="clearTodo">모두 삭제</button>
  </div>
</template>

<script>
export default {
  emits: ['remove-all'],

  setup(props, context) {

    //todo 모두 삭제
    const clearTodo = () => {
      context.emit('remove-all');
    }

    return {
      clearTodo
    }
  }
}
</script>

<style scoped>
  div {background-color: #eee;}
</style>