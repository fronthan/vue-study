<template>
  <div>
    <table>
      <tr>
        <th>번호</th>
        <th>제목</th>
        <th>작성자</th>
        <th>등록일시</th>
      </tr>
      <tr v-if="!boards || (Array.isArray(boards) && boards.length === 0)">
        <td colspan="4">게시물이 없음.</td>
      </tr>
      <tr v-else v-for="board in boards" :key="board.boardNo">
        <td>{{board.boardNo}}</td>
        <td><router-link :to="{ name: 'BoardReadView', params: {boardNo: board.boardNo.toString() }}"> {{board.title }}</router-link></td>
        <td>{{board.writer}}</td>
        <td>{{board.regDate}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  
}
</script>