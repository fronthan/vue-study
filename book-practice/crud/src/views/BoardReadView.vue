<template>
  <div align="center">
    <h2>게시판 상세보기</h2>

    <BoardRead v-if="board" :board="board"/>
    <p v-else>loading... </p>

    <router-link
      :to="{ name: 'BoardModifyView', params: { boardNo } }"
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
import client from '@/modules/client.js';
import { ref } from 'vue'

export default {
  components: {BoardRead },

  props: {
    boardNo: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const board = ref({})

    client.get(`/boards/${props.boardNo}`)
    .then(res => {
      board.value = res.data
    }).catch(err => {
      alert(err.response.data.message)
    })

    return {
      board,

    }
  }, 
}
</script>