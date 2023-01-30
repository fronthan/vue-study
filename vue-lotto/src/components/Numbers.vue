<template>
  <div>

    <p v-for="n in nbrs">
      <span class="txt">{{n}}</span>
    </p>
  </div>
</template>
<script>
import { ref, computed } from 'vue';
import axios from '@/axios';

export default {

  setup() {
    const nbrs = ref([]);
    const getNumbers = async () => {
      try {
        const res = await axios.get('numbers');
        nbrs.value = res.data;

        //1번이라도 반복되는 숫자 찾기
        const comparedNbr = nbrs.value.filter((n,idx) => {
         console.log(n, idx);
          const prt = n;
          
          // for (var i=idx+1; i<nbrs.value.length; i++) {
          //   if (prt == nbrs.value[i]) {
          //     console.log(idx);
          //     return idx;
          //   }
          // }
        })

        if (comparedNbr.length) {
          console.log(comparedNbr)
        }

      } catch (e) {
        console.log(e)
      }
    }

    getNumbers();


    return {
      getNumbers,
      nbrs
    }
  }


}
</script>
<style scoped>
  .txt {padding-right: 20px;}
</style>