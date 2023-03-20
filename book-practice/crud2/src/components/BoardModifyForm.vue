<template>
  <div>
    <form @submit.prevent="fireModifyPost">
      <table>
        <tr>
          <th>번호</th>
          <td>
            {{ board.boardNo }}
          </td>
        </tr>
        <tr>
          <th>등록일시</th>
          <td>{{board.regDate}}</td>
        </tr>
        <tr>
          <th>제목</th>
          <td><input type="text" v-model="title"></td>
        </tr>
        <tr>
          <th>작성자</th>
          <td>{{board.writer}}</td>
      </tr>
      <tr>
        <th>내용</th>
        <td>
          <textarea v-model="content" rows="5"></textarea>
        </td>
      </tr>
      </table>

      <div>
        <button type="submit">수정</button>
        <router-link :to="{ name: 'BoardReadView', params: {boardNo: boardNo} }">취소</router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'BoardModifyForm',
  emits: ['modify-post'],
  props: {
    board: {
      type:Object,
      required:true
    },
    boardNo: {
      type:String,
      required:true
    },
  },

  setup(props, context){
    const fireModifyPost = () => {
      context.emit('modify-post', {
        title: props.board.title,
        content: props.board.content
      })
    }

    return {fireModifyPost}
  }  
}
</script>