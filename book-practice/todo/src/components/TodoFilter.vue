<template>
  <div>
    <input type="radio"
      v-bind:checked="filter === null"
      v-on:change="setFilter(null)"
    />전체
    <input type="radio"
      v-bind:checked="filter === 'A'"
      v-on:change="setFilter('A')"
    />미완료
    <input type="radio"
      v-bind:checked="filter === 'B'"
      v-on:change="setFilter('B')"
    />완료
  </div>
</template>

<script>
import { inject } from 'vue'

export default {
  emits: ['set-filter'],

  setup(props, context) {
    //공급된 데이터 가져오기
    const filter = inject('filter')

    const setFilter = (filter) => {
      context.emit('set-filter', filter)
    }

    return {filter, setFilter }
  }  
}
</script>

<style scoped>
  div {
    background-color: #0ff;
  }
</style>