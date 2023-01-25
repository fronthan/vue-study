<template> 
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{name : 'Home'}">frontHan</router-link>  
    
      <ul class="navbar-nav me-auto  mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" :to="{name : 'Todos'}">Todos</router-link>
        </li>
      </ul>
    </div>
  </nav>

  <div class="container">
    <router-view />  
  </div>
</template>

<script>
export default {  
 
}
</script>

<style>
</style>