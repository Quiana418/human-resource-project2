<template>
  <div style="width: 100%">
    <el-row
      type="flex"
      justify="space-between"
      align="middle"
      style="height: 40px; padding: 30px 30px; font-size: 14px; width: 100%"
    >
      <el-col>
        <span>{{ node.data ? node.data.name : node.name }}</span>
      </el-col>
      <el-col :span="4">
        <el-row type="flex" justify="end">
          <!-- 两个内容 -->
          <el-col>{{ node.data ? node.data.manager : "负责人" }}</el-col>
          <el-col>
            <!-- 下拉菜单 element -->
            <el-dropdown @command="onCommand">
              <span> 操作<i class="el-icon-arrow-down" /> </span>
              <!-- 下拉菜单 -->
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">添加子部门</el-dropdown-item>
                <template v-if="node.data">
                  <el-dropdown-item command="b">编辑部门</el-dropdown-item>
                  <el-dropdown-item command="c">删除部门</el-dropdown-item>
                </template>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <!-- 点击添加 弹出弹框 -->
    <el-dialog title="新增部门" :visible.sync="dialogFormVisible" width="50%">
      <el-form :model="form" :rules="rules" :label-width="formLabelWidth">
        <el-form-item label="部门名称">
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder="1-50个字符"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门编码">
          <el-input v-model="form.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门负责人">
          <el-select
            v-model="form.manager"
            class="chooseManager"
            placeholder="请选择活动区域"
            :label-width="formLabelWidth"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门介绍">
          <el-input
            v-model="form.introduce"
            type="textarea"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { delDepartment } from '@/api/departments'
export default {
  filters: {},
  components: {},
  props: {
    node: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      dialogFormVisible: false,
      // 添加部门 的表单数据
      form: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      // 添加部门的表单规则
      rules: [],
      formLabelWidth: '100px'
    }
  },
  computed: {},
  watch: {},
  created () { },
  methods: {
    // 点击右侧操作
    async onCommand (key) {
      if (key === 'a') {
        this.dialogFormVisible = true
        console.log('添加')
      } else if (key === 'b') {
        console.log('编辑')
      } else {
        // 删除
        try {
          await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          await delDepartment(this.node.data.id)
          console.log('用户确定删除')
          this.$emit('delDepartment')
          // this.$message({
          //   message: '删除成功',
          //   type: 'success'
          // })
        } catch (err) {
          console.log(err)
          this.$message({
            message: '取消删除',
            duration: 1000
          })
        }
      }
    }
  }
}
</script>

<style scoped lang='scss'>
::v-deep.chooseManager {
  .el-input__inner {
    width: 791.5px;
  }
}
</style>
