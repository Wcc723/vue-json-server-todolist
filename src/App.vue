<template>
  <div id="app">
    <div class="bg-primary">
      <div class="container justify-content-between d-flex todo-nav">
        <a href="#" :class="{active: currentTab === 'all'}" @click="currentTab = 'all'">My Task</a>
        <a href="#" :class="{active: currentTab === 'progress'}" @click="currentTab = 'progress'">In Progress</a>
        <a href="#" :class="{active: currentTab === 'completed'}" @click="currentTab = 'completed'">Completed</a>
      </div>
    </div>
    <div class="container my-4">
      <div class="position-relative">
        <i class="fas fa-plus fa-lg text-black-50 position-absolute" style="left: 1rem; top: 1.15rem"></i>
        <input type="text" class="form-control form-control-lg pl-5"
          v-model="message" @focus="addTodo" v-if="isNewTodo === false">
      </div>

      <div class="mt-4">
        <transition name="slide">
          <edit-todo-item v-if="isNewTodo && !currentEdit.id" @closeEditTodo="closeEdit"
          @updateData="getData"
          ></edit-todo-item>
        </transition>

        <draggable v-model="todos" :options="{handle: '.handle'}" @end="updateSort">
          <div v-for="item in todos" :key="item.id" v-if="currentTab === 'all' || currentTab == item.completed">
            <todo-item
              :todo="item"
              @updateData="getData"
              @editTodo="editTodo"
              v-if="currentEdit.id !== item.id"
            ></todo-item>
            <edit-todo-item :todo="currentEdit" v-if="currentEdit.id === item.id"
              @updateData="getData" @closeEditTodo="closeEdit"></edit-todo-item>
          </div>
        </draggable>
      </div><!-- outer -->

      <!-- <router-view/> -->
    </div>

  </div>
</template>

<script>
import TodoItem from './components/TodoItem'
import EditTodoItem from './components/EditTodoItem'
import draggable from 'vuedraggable'

export default {
  name: 'App',
  data () {
    return {
      message: '',
      todos: [],
      currentEdit: {},
      isNewTodo: false,
      currentTab: 'all'
    }
  },
  components: {
    TodoItem,
    EditTodoItem,
    draggable
  },
  methods: {
    openAddTodo () {

    },
    addTodo () {
      this.isNewTodo = true
      this.currentEdit = {}
      // const vm = this
      // const api = 'http://localhost:5000/todos'
      // if (!vm.message) {
      //   return
      // }
      // const data = {
      //   timestamp: Math.floor(Date.now() / 1000),
      //   message: vm.message,
      //   stared: false,
      //   comments: []
      // }
      // vm.$http.post(api, data).then((response) => {
      //   console.log(response.data)
      //   vm.message = ''
      //   vm.todos.push({
      //     ...response.data
      //   })
      //   vm.updateSort()
      // })
    },
    getData () {
      const vm = this
      const api = 'http://localhost:5000/todos'
      const sortApi = 'http://localhost:5000/sort'
      let todos = []
      vm.todos = []
      vm.$http.get(api).then((response) => {
        todos = response.data
        return vm.$http.get(sortApi)
      }).then((response) => {
        const sortData = response.data.sort
        if (sortData) {
          sortData.forEach((sortId, sortIndex) => {
            const todo = todos.find((item) => item.id === sortId)
            vm.todos.push(todo)
          })
        }
        todos.forEach((todo) => {
          const hasSort = sortData.some((sortId) => todo.id === sortId)
          if (!hasSort) {
            vm.todos.push(todo)
          }
        })
      })
    },
    editTodo (id) {
      const vm = this
      this.isNewTodo = false
      vm.currentEdit = vm.todos.find((item) => item.id === id)
    },
    closeEdit () {
      this.currentEdit = {}
      this.isNewTodo = false
    },
    updateSort () {
      const vm = this
      const api = 'http://localhost:5000/sort'
      const sort = vm.todos.map((item, index) => item.id)
      vm.$http.post(api, {sort}).then((response) => {
        console.log(response)
        vm.getData()
      })
    }
  },
  created () {
    const vm = this
    vm.getData()
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

/* .slide-enter-active {
  animation: flipInX .5s;
}
.slide-leave-active {
  animation: fadeOut .5s;
} */
</style>
