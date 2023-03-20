<template>
  <div>
    <table>
      <tr>
        <th>번호</th>
        <td>
          <input type="text" :value="board.boardNo" readonly>
        </td>
      </tr>
      <tr>
        <th>등록일시</th>
        <td><input type="text" :value="board.regDate" readonly></td>
      </tr>
      <tr>
        <th>제목</th>
        <td><input type="text" :value="board.title" readonly></td>
      </tr>
      <tr>
        <th>작성자</th>
        <td><input type="text" :value="board.writer" readonly></td>
      </tr>
      <tr>
        <th>내용</th>
        <td><textarea :value="board.content" readonly></textarea></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    board: {
      type: Object,
      required: true
    }
  },


}
</script>