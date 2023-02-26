<template>
  <div align="center">
    <h2>게시판 목록 </h2>
    <router-link
      :to="{ name: 'BoardRegisterView' }"
    >
      새로만들기
    </router-link>

    <BoardList />    
  </div>
</template>

<script>
import BoardList from '@/components/BoardList.vue'

export default {
  components: {BoardList }
}
</script>