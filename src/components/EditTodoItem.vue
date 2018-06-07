<template>
  <div class="mb-4">
    <div class="todo-item active">
      <div class="todo-header">
        <div class="todo-check">
          <!-- <input type="checkbox" :id="`todo-check-${todo.id}`" v-model="todo.completed"
            disabled
            :true-value="'completed'"
            :false-value="'progress'">
          <label :for="`todo-check-${todo.id}`"></label>
          <label for="todo-check1"></label> -->
        </div>
        <div class="todo-title">
          <input type="text" v-model="cacheTodo.message" class="form-control">
        </div>
        <!-- <div class="todo-control">
          <a href="#"><i class="far fa-star mr-3"></i></a>
          <a href="#"><i class="fas fa-pencil-alt"></i></a>
        </div> -->
      </div>
      <div class="todo-body">
        <div class="todo-content">
          <div class="todo-row">
            <div class="todo-icon">
              <i class="far fa-calendar-alt"></i>
            </div>
            <div>
              <label for="">Deadline</label>
              <div class="form-inline todo-form-control">
                <input type="date" class="form-control border-0" v-model="cacheTodo.startDate">
                <input type="date" class="form-control border-0 ml-2" v-model="cacheTodo.endDate">
              </div>
            </div>
          </div>
          <div class="todo-row" v-if="todo">
            <div class="todo-icon">
              <i class="far fa-comment-dots"></i>
            </div>
            <div class="todo-form-control">
              <label for="">Comment</label>
              <div class="bg-white p-3 my-3" v-for="(item, i) in cacheTodo.comments" :key="i">{{ item }}</div>
              <div>
                <textarea name="" class="form-control w-100 border-0" @keydown.shift.enter="updateComment"
                  v-model="comment"></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="todo-btn-group d-flex">
          <button class="btn text-danger w-50 btn-lg" @click="closeEdit">
            <i class="fas fa-times"></i> Cancel
          </button>
          <button class="btn btn-primary w-50 btn-lg" @click="updateTodo">
            <i class="fas fa-plus"></i> Update Task
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['todo'],
  name: 'EditTodo',
  data () {
    return {
      // 編輯的欄位都會先以 cacheTodo 暫存
      // 避免直接編輯到原有的資料
      cacheTodo: {},
      comment: '',
      // 判斷是否為新的資料，會觸發的 API 略有不同
      isNew: false
    }
  },
  methods: {
    // 更新留言
    updateComment () {
      const vm = this
      const api = `http://localhost:5000/todos/${vm.todo.id}`
      if (!vm.comment) {
        return
      }
      const todo = {
        ...vm.todo
      }
      // 留言使用 push 的方式新增，並與先前的全部加入到 Json-server 上
      todo.comments.push(vm.comment)
      vm.$http.put(api, todo).then((response) => {
        console.log(response)
        vm.comment = ''
        vm.$emit('updateData')
      })
    },
    // 更新或新增 Todo
    updateTodo () {
      const vm = this
      const todo = {
        ...vm.cacheTodo
      }
      // Message 不能為空
      if (!vm.cacheTodo.message) {
        alert('請輸入訊息')
        return
      }
      if (this.isNew) {
        const api = 'http://localhost:5000/todos'
        // 假設是新的，預設加入一些欄位
        todo.timestamp = Math.floor(Date.now() / 1000)
        todo.stared = false
        todo.completed = 'progress'
        todo.comments = []
        vm.$http.post(api, todo).then((response) => {
          vm.$emit('closeEditTodo')
          vm.$emit('updateData')
        })
      } else {
        const api = `http://localhost:5000/todos/${vm.todo.id}`
        // 假設是舊的，就推到指定 ID
        vm.$http.put(api, todo).then((response) => {
          console.log(response)
          vm.$emit('closeEditTodo')
          vm.$emit('updateData')
        })
      }
    },
    closeEdit () {
      // 關閉內容時，讓外層了解並觸發
      this.$emit('closeEditTodo')
    }
  },
  watch: {
    todo () {
      // 如果為舊有資料則使用解構傳至 cacheTodo 避免物件參考特性
      this.cacheTodo = { ...this.todo }
    }
  },
  created () {
    // 判斷是否為新資料
    // 如果為舊有資料則使用解構傳至 cacheTodo 避免物件參考特性
    if (!this.todo) {
      this.isNew = true
    } else {
      this.cacheTodo = { ...this.todo }
    }
  }
}
</script>
