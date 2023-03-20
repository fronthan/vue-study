<template>
  <div>
    <table>
      <tr>
        <th>상품번호</th>
        <td>{{item.itemId}}</td>
      </tr>
      <tr>
        <th>상품명</th>
        <td>{{item.itemName}}</td>
      </tr>
      <tr>
        <th>상품가격</th>
        <td>{{item.price}} 원</td>
      </tr>
      <tr>
        <th>미리보기</th>
        <td>
          <img v-bind:src="pictureUrl()" width="200">
        </td>
      </tr>
      <tr>
        <th>상품설명</th>
        <td>{{item.description}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ItemRead',

  props: {
    item: {
      type: Object,
      required:true
    }
  },

  setup(props){
    const pictureUrl= () => {
      return 'http://localhost:8080/items/display?itemId='+props.item.itemId + "&timestamp="+new Date().getTime()
    }

    return {
      pictureUrl,
    }
  }
}
</script>

<style>

</style>