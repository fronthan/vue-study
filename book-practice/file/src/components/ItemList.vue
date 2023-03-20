<template>
  <div>
    
    <table border="1">
      <tr>
        <th width="80">상품아이디</th>
        <th width="320">상품명</th>
        <th width="100">상품가격</th>
      </tr>
      <tr v-if="!items || (Array.isArray(items) && items.length === 0)">
        <td colspan="3">상품이 없습니다.</td>
      </tr>
      <tr v-else
        v-for="item in items"
        :key="item.itemId"
      >
        <td>{{item.itemId}}</td>
        <td>
          <router-link :to="{ name: 'ItemReadView', params: {itemId: item.itemId.toString() }}"
          >{{item.itemName}}
          </router-link>
        </td>
        <td>{{item.price}} 원</td>
      </tr>
    </table>


    
  </div>
</template>

<script>
export default {
  name: 'ItemList',
  props: {
    items: {
      type:Array
    }
  },

  

}
</script>