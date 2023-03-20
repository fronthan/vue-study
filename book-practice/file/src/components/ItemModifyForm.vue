<template>
  <div>
    <form @submit.prevent="fireModifyPost">
      <table>
        <tr>
          <th>상품번호</th>
          <td><input :value="item.itemId" type="text" disabled></td>
        </tr>
        <tr>
          <th>상품명</th>
          <td><input type="text" v-model="item.itemName"></td>
        </tr>
        <tr>
          <th>상품가격</th>
          <td><input type="text" v-model="item.price"> 원</td>
        </tr>
        <tr>
          <th>상품사진</th>
          <td><input type="file" @change="changeFile($evnet)"></td>
        </tr>
        <tr>
          <th>미리보기</th>
          <td><img v-bind:src="pictureUrl()" width="200"></td>
        </tr>
        <tr>
          <th>설명</th>
          <td><textarea v-model="item.description" rows="5"></textarea></td>
        </tr>
      </table>
    </form>
    <div>
      <button type="submit">수정</button>
      <router-link
        :to="{ name: 'ItemReadView', params: {itemId}}"
      >취소</router-link>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ItemModifyForm',
  props: {
    item: {
      type: Object, required:true
    },
    itemId:{
      type:String, required:true
    }
  },
  emits:['modify-post'],

  setup(props, context) {
    const file = ref('')

    const fireModifyPost = () => {
      context.emit('modify-post', {
        itemName: props.item.itemName,
        price: props.item.price,
        description:props.item.description,
        file:file.value
      })
    }

    const changeFile = (evt) => {
      file.value = evt.target.files[0]
    }

    const pictureUrl = () => {
      return 'http://localhost:8080/items/display?itemId='+props.itemId+'&timestamp='+new Date().getTime()
    }

    return {
      fireModifyPost, changeFile, pictureUrl
    }
  }
}
</script>

<style>

</style>template