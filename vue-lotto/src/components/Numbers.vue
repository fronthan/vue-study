<template>
  <div>
    <p v-for="n in dupNbrs">
      <span class="txt">대상 숫자: {{n[0]}}</span>
      <span class="txt">당첨 횟수: {{n[1] }}</span>
    </p>
  </div>
</template>
<script>
import { ref, computed } from 'vue';
import axios from '@/axios';

export default {

  setup() {
    const nbrs = ref([]);
    const dupNbrs = ref([]);
    const getNumbers = async () => {
      try {
        const res = await axios.get('numbers');
        nbrs.value = res.data;
       
        const loopFind = () => {
          let dupeNbrsIdx = [];
          for (var j=1; j<nbrs.value.length; j++) {
            //1번이라도 반복되는 숫자의 인덱스 찾기
            if (nbrs.value[0] == nbrs.value[j]) {
              dupeNbrsIdx.push(j);
            }
          }
          
          let obj = [
            nbrs.value[0], dupeNbrsIdx.length+1
          ]
          
          dupNbrs.value.push(obj);
          //대상 n 값 삭제
          for (var k=0; k<dupeNbrsIdx.length; k++) {
            nbrs.value.splice(dupeNbrsIdx[k], 1);
          }
          nbrs.value.shift();

          if (nbrs.value.length) {
            loopFind();
          } else {
            pickBest();
          }
        }
        loopFind();

      } catch (e) {
        console.log('getNumbers ERROR:: ', e);
      }
    }

    getNumbers();

    const pickBest = () => {
      dupNbrs.value.sort(function(a, b) {
        return b[1] - a[1];
      });
    }

    return {
      getNumbers,
      dupNbrs,
      pickBest
    }
  }


}
</script>
<style scoped>
  .txt {padding-right: 20px;}
</style>