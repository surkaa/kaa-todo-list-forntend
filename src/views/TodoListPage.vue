<template>
  <div class="todo-list">
    <el-empty class="todo-empty-view" v-if="isEmpty" description="暂无待办事项">
      <el-button @click="reload">轻触刷新</el-button>
    </el-empty>
    <div class="insert-todo">
      <el-dialog title="新增代办" :visible.sync="dialogForInsert">
        <el-form ref="insert-form" :model="insertTodo" label-position="right" :rules="rules">
          <el-row>
            <el-form-item class="title-input" label="代办标题" prop="title">
              <el-input v-model="insertTodo.title"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="预计完成时间 (默认三天后)" prop="targetTime">
              <el-date-picker
                  type="datetime"
                  style="width: 100%"
                  :picker-options="pickerOptions"
                  :editable="false"
                  v-model="insertTodo.targetTime"
                  value-format="timestamp"
              ></el-date-picker>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="详细信息">
              <el-input v-model="insertTodo.description" type="textarea"></el-input>
            </el-form-item>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="handleAdd">确定</el-button>
        </div>
      </el-dialog>
    </div>
    <todo-item v-if="!isEmpty" v-for="item in data" :todo="item" :key="item.id"/>
    <el-button class="add-btn" @click="dialogForInsert = true" type="primary" icon="el-icon-circle-plus"/>
  </div>
</template>

<script>
import TodoItem from "@/components/TodoItem.vue";
import router from "@/router";
import request from '@/utils/request'
import {defineComponent} from "vue";
import dayjs from "dayjs";
import {Message} from "element-ui";

export default defineComponent({
  name: "TodoListPage",
  components: {
    TodoItem
  },
  data() {
    return {
      isEmpty: true,
      data: [],
      dialogForInsert: false,
      insertTodo: {
        title: '',
        targetTime: new Date(),
        description: ''
      },
      rules: {
        title: [{required: true, message: '请1输入代办标题', trigger: 'blur'}],
        targetTime: [{required: false, message: '请输入代办标题', trigger: 'blur'}]
      },
      pickerOptions: {
        shortcuts: [{
          text: '三个小时后',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 3);
            picker.$emit('pick', date);
          }
        }, {
          text: '明天这个时候',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周后',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      }
    }
  },
  created() {
    Message.info("正在加载待办事项")
    request.get('/todos').then((res) => {
      if (res.data.code > 0) {
        Message.error("请先登录后查看哦~")
        router.push('/login')
      }
      this.data = res.data.data
      if (this.data.length !== 0) {
        this.isEmpty = false
        // 根据预计完成时间最早排序
        this.data.sort((a, b) => {
          let aTarget = dayjs(a.targetTime).unix()
          let bTarget = dayjs(b.targetTime).unix()
          return aTarget - bTarget
        })
      }
      // 默认三天的预计完成时间
      this.insertTodo.targetTime.setTime(new Date().getTime() + 3600 * 1000 * 24 * 3)
    }).catch(_ => {
      Message.error("刷新失败, 请尝试重新登陆")
      window.location.href = '/todolist/login'
    })
    Message.success("加载成功")
  },
  methods: {
    reload() {
      location.reload()
    },
    cancel() {
      this.dialogForInsert = false
    },
    handleAdd() {
      let flag = false;
      this.$refs['insert-form'].validate(value => {
        if (!value) {
          flag = true
        }
      })
      if (flag) return
      this.dialogForInsert = false
      request.post(
          '/todos',
          this.insertTodo
      ).then(res => {
        if (res.data.code !== 0) {
          Message.error("保存失败")
          this.dialogForInsert = true
        }
        router.go(0)
        Message.success("保存成功")
      }).catch(error => {
        Message.error(error)
      })
      Message.success("添加成功")
    }
  }
})

</script>

<style scoped>
>>> .el-dialog {
  background-color: rgb(238, 238, 238, 95%);
  border-radius: 20px;
}

.todo-list {
  width: 62%;
  height: 90%;
  background-color: rgba(238, 238, 238, 0.05);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .todo-list {
    width: 95%;
  }

  >>> .el-dialog {
    width: 85%;
  }
}

.add-btn {
  width: 20rem;
  border-radius: 2rem;
  opacity: 0.7;
  font-size: 3rem;
  margin-top: 3rem;
}

.todo-list .add-btn {
  align-self: center;
}

/* 滚动条 */
.todo-list::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.todo-list::-webkit-scrollbar-track {
  width: 6px;
  background: rgba(16, 31, 28, 0.1);
  -webkit-border-radius: 1em;
  -moz-border-radius: 1em;
  margin: 0.5rem 0;
  border-radius: 1em;
}

.todo-list::-webkit-scrollbar-thumb {
  background-color: rgba(238, 238, 238, 0.1);
  background-clip: padding-box;
  min-height: 28px;
  -webkit-border-radius: 1em;
  -moz-border-radius: 1em;
  border-radius: 1em;
  transition: background-color .3s;
  cursor: pointer;
}

.todo-list::-webkit-scrollbar-thumb:hover {
  background-color: rgba(144, 147, 153, .3);
}

.todo-empty-view {
  height: 100%;
  opacity: 0.5;
}
</style>