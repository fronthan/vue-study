
Vue.component('todo-footer', {
  template: '<div>this is another global child component</div>'
})


var cmp = {
  template: '<p>This is another local child component</p>'
}

var app = new Vue({
  el: '#app',
  data: {
    message: 'This is a parent component'
  },
  components: {
    'todo-list' : cmp
  }
});
