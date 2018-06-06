<template>
  <div id="app">
    <div class="bg-primary">
      <div class="container justify-content-between d-flex todo-nav">
        <a href="#" class="active" >My Task</a>
        <a href="#">In Progress</a>
        <a href="#">Completed</a>
      </div>
    </div>
    <div class="container my-4">
      <div class="position-relative">
        <i class="fas fa-plus fa-lg text-black-50 position-absolute" style="left: 1rem; top: 1.15rem"></i>
        <input type="text" class="form-control form-control-lg pl-5">
      </div>

      <div class="mt-4">

        <edit-todo-item></edit-todo-item>

        <todo-item></todo-item>
      </div><!-- outer -->

      <!-- <router-view/> -->
    </div>

  </div>
</template>

<script>
import TodoItem from './components/TodoItem'
import EditTodoItem from './components/EditTodoItem'

export default {
  name: 'App',
  data () {
    return {
      todos: [
        {
          message: '第二筆資訊',
          startDate: '2018-06-06',
          endDate: '2018-06-28',
          timestamp: 1528254270,
          stared: false,
          comments: [ ],
          id: 2,
          completed: 'progress'
        }
      ]
    }
  },
  components: {
    TodoItem,
    EditTodoItem
  }
}
</script>

<style>
.sortable-ghost {
  opacity: .5;
  box-shadow: 0 0 0 2px blue;
}

.draggable .handle {
  cursor: move;
}
</style>
