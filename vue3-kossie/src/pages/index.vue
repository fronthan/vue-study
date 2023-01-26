<template>
  <div>
    {{ count }}
  </div>

  <button @click="count++">add</button>

</template>

<script>
//toRefs 예제
import { useCount } from '@/composables/count';

export default {
  setup() {
    const { count } = useCount();

    return {
      count
    }
  }


}
</script>

<style>

</style>