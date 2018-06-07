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
      // TodoList 的資料，另外因為有排序功能，所以在此不會使用 computed
      todos: [],
      // 當前編輯的內容
      currentEdit: {},
      // 是否展開新的 todo
      isNewTodo: false,
      // 判斷目前顯示的分頁
      currentTab: 'all'
    }
  },
  components: {
    TodoItem,
    EditTodoItem,
    draggable
  },
  methods: {
    addTodo () {
      // 新增 Todo 的事件，同時移除其它目前開啟的 Todo
      this.isNewTodo = true
      this.currentEdit = {}
    },
    getData () {
      // 每次新增內容都會取得資料，包含 Todos 及排序
      const vm = this
      const api = 'http://localhost:5000/todos'
      const sortApi = 'http://localhost:5000/sort'
      let todos = []
      vm.todos = []
      // 取得 Todos
      vm.$http.get(api).then((response) => {
        todos = response.data
        // 取得 排序
        return vm.$http.get(sortApi)
      }).then((response) => {
        const sortData = response.data.sort
        // 有排序資料時，則開始整理排序
        if (sortData) {
          // 整理出有對應 ID 的物件
          sortData.forEach((sortId, sortIndex) => {
            const todo = todos.find((item) => item.id === sortId)
            vm.todos.push(todo)
          })
          todos.forEach((todo) => {
            // 沒有排序 id 的內容，依然要存回 todos 內
            const hasSort = sortData.some((sortId) => todo.id === sortId)
            if (!hasSort) {
              vm.todos.push(todo)
            }
          })
        } else {
          vm.todos = todos
        }
      })
    },
    editTodo (id) {
      // 編輯 Todo，並把目前的 Todo 資訊傳入
      const vm = this
      this.isNewTodo = false
      vm.currentEdit = vm.todos.find((item) => item.id === id)
    },
    closeEdit () {
      // 關閉 編輯
      this.currentEdit = {}
      this.isNewTodo = false
    },
    updateSort () {
      // 排序後，更新排序內容
      const vm = this
      const api = 'http://localhost:5000/sort'
      // 排序資料以 [...id] 的形式逐一加入
      const sort = vm.todos.map((item, index) => item.id)
      vm.$http.post(api, {sort}).then((response) => {
        console.log(response)
        vm.getData()
      })
    }
  },
  // 元件啟動後，取得資料
  created () {
    const vm = this
    vm.getData()
  }
}
</script>

<style lang="scss">
// 排序功能的樣式
.sortable-ghost {
  opacity: .5;
  box-shadow: 0 0 0 2px blue;
}

.draggable .handle {
  cursor: move;
}

// 動態效果，但後來移除不使用了
/* .slide-enter-active {
  animation: flipInX .5s;
}
.slide-leave-active {
  animation: fadeOut .5s;
} */
</style>
