<template>
  <div class="modal-wrapper" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            <slot name="title"></slot>
          </h1>
          <button type="button" class="btn-close"
            @click.stop="onClose"
          ></button>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="d-flex justify-content-end">
          <slot name="footer"></slot>          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useContext } from 'vue';

export default {
  setup() {
    const { emit } = useContext();
    
    const onClose = () => {
      emit('close')
    };    

    return {
      onClose,
    }

  },
}
</script>

<style scoped>
  .modal-wrapper {
    position: fixed;
    top:0; left:0;
    width:100%; height:100%;
    background-color: rgba(0,0,0, .6);
    z-index: 1;
  }

  .modal-dialog {top:50px; bottom:0; min-width:260px; max-width:400px; padding:10px; border-radius: 5px; background-color: #fff;}
</style>