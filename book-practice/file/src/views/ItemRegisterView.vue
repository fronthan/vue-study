<template>
  <div align="center">
    <h2>상품 등록</h2>

    <ItemRegisterForm @add-post="addPost"/>
  </div>
</template>

<script>
import client from '@/modules/client.js';

import ItemRegisterForm from '@/components/ItemRegisterForm.vue'

export default {
  name: 'ItemRegisterView',
  components: { ItemRegisterForm },

  setup() {
    const addPost = (payload) => {
      const { itemName, price, description, file } = payload;

      const itemObject = {
        itemName:itemName,
        price:price,
        description: description,
      }

      //form Data 객체 구성
      const formData = new FormData()
      formData.append('file', file)
      formData.append('item', JSON.stringify(itemObject))

      client.post('/items', 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then(res => {
        alert('등록되었습니다.');
        router.push({
          name: 'ItemReadView',
          params: { itemId: res.data.itemId }
        })
      }).catch(err => {
        alert(err.response.data.msg)
      })    
    } 

    return {addPost}
    
  },
}
</script>