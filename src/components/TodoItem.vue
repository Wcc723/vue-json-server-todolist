<template>
  <div class="mb-4">
    <div class="todo-item">
      <div class="handle text-muted"><i class="fas fa-ellipsis-v"></i></div>
      <div class="todo-header">
        <div class="todo-check">
          <input type="checkbox" id="123">
          <label for="123"></label>
        </div>
        <label class="todo-title">
          <span>第一筆資訊</span>
        </label>
        <div class="todo-control">
          <a href="#" class="text-muted">
            <i class="far fa-star mr-3"></i>
            <!-- <i class="fas fa-star mr-3"></i> -->
          </a>
          <a href="#" class="text-muted" @click.prevent="editTodo"><i class="fas fa-pencil-alt"></i></a>
        </div>
      </div>
      <div class="todo-footer text-secondary">
        <i class="far fa-calendar-alt"></i>
        <span>from: 2018-06-28</span>
        <span> ~ </span>
        <span>to: 2018-06-28 </span>
        <!-- <i class="far fa-file ml-3"></i> -->
        <i class="fas fa-comment-dots ml-3"></i> 3
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['todo'],
  name: 'Todo',
  methods: {
  }
}
</script>
