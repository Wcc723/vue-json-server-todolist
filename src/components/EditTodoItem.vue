<template>
  <div class="mb-4">
    <div class="todo-item active">
      <div class="todo-header">
        <!-- <div class="todo-check">
          <input type="checkbox" id="456">
          <label for="456"></label>
        </div> -->
        <div class="todo-title">
          <input type="text" value="可輸入內容" class="form-control">
        </div>
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
                <input type="date" class="form-control border-0">
                <input type="date" class="form-control border-0 ml-2">
              </div>
            </div>
          </div>
          <div class="todo-row">
            <div class="todo-icon">
              <i class="far fa-comment-dots"></i>
            </div>
            <div class="todo-form-control">
              <label for="">Comment</label>
              <div class="bg-white p-3 my-3">留言訊息</div>
              <div>
                <textarea name="" class="form-control w-100 border-0"></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="todo-btn-group d-flex">
          <button class="btn text-danger w-50 btn-lg">
            <i class="fas fa-times"></i> Cancel
          </button>
          <button class="btn btn-primary w-50 btn-lg">
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
    }
  }
}
</script>
