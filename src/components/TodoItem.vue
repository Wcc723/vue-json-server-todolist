<template>
  <div class="mb-4">
    <div class="todo-item" :class="{stared: todo.stared}">
      <div class="handle text-muted"><i class="fas fa-ellipsis-v"></i></div>
      <div class="todo-header">
        <div class="todo-check">
          <input type="checkbox" :id="`todo-check-${todo.id}`" v-model="todo.completed"
            @change="updateStatus('completed', todo.completed)"
            :true-value="'completed'"
            :false-value="'progress'">
          <label :for="`todo-check-${todo.id}`"></label>
        </div>
        <label class="todo-title" :for="`todo-check-${todo.id}`">
          <span :class="{completed: todo.completed === 'completed' }">{{ todo.message }}</span>
        </label>
        <div class="todo-control">
          <a href="#" class="text-muted" @click.prevent="updateStatus('stared', !todo.stared)">
            <i class="far fa-star mr-3" v-if="!todo.stared"></i>
            <i class="fas fa-star mr-3" v-else></i>
          </a>
          <a href="#" class="text-muted" @click.prevent="editTodo"><i class="fas fa-pencil-alt"></i></a>
        </div>
      </div>
      <div class="todo-footer text-secondary">
        <i class="far fa-calendar-alt" v-if="todo.startDate || todo.endDate"></i>
        <span>from: {{ todo.endDate }}</span>
        <span v-if="todo.startDate && todo.endDate"> ~ </span>
        <span>to: {{ todo.endDate }}</span>
        <!-- <i class="far fa-file ml-3"></i> -->
        <i class="fas fa-comment-dots ml-3"></i> {{ todo.comments.length }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['todo'],
  name: 'Todo',
  methods: {
    updateStatus (field, state) {
      const vm = this
      const api = `http://localhost:5000/todos/${vm.todo.id}`
      const todo = {
        ...vm.todo
      }
      todo[field] = state
      vm.$http.put(api, todo).then((response) => {
        console.log(response)
        vm.$emit('updateData')
      })
    },
    editTodo () {
      this.$emit('editTodo', this.todo.id)
    }
  }
}
</script>
