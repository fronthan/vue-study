<template>
  <div align="center">
    <h2>게시판 상세보기</h2>

  <BoardRead />

  <router-link
    :to="{ name: 'BoardModifyView', params: { boardNo:100 } }"
  >수정
  </router-link>
  <button>삭제</button>

  <router-link
    :to="{ name: 'BoardListView' }"
  >목록
  </router-link>
  </div>
</template>

<script>
import BoardRead from '@/components/BoardRead.vue'

export default {
  components: {BoardRead }
}
</script>