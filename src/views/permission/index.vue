<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageToolBar>
        <template #right>
          <el-button type="primary" size="mini" @click="showDialog('0')"
            >添加权限</el-button
          >
        </template>
      </PageToolBar>

      <!-- 卡片 表格 -->
      <el-card style="margin-top: 20px">
        <el-table
          border
          :data="permissions"
          row-key="id"
          :tree-props="{ children: 'children' }"
        >
          <el-table-column label="名称" prop="name"></el-table-column>
          <el-table-column label="标识" prop="code"></el-table-column>
          <el-table-column label="描述" prop="description"></el-table-column>
          <el-table-column label="操作" align="center">
            <template v-slot="scope">
              <el-button
                v-if="scope.row.pid === '0'"
                type="text"
                @click="showDialog(scope.row.id)"
                >添加</el-button
              >
              <el-button type="text" @click="editPermission(scope.row)"
                >编辑</el-button
              >
              <!-- 控制按钮权限 -->
              <el-button
                type="text"
                :disabled="checkPermission('point-user-delete')"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <!-- 新增或者编辑的对话框 -->
    <el-dialog
      :title="id === null ? '编辑权限' : '新增权限'"
      :visible.sync="dialogVisible"
      @close="resetPermissionForm"
    >
      <el-form
        ref="permissionFormRef"
        label-width="80px"
        :model="permissionForm"
        :rules="permissionFormRules"
      >
        <el-form-item label="权限名称" prop="name"
          ><el-input v-model="permissionForm.name"></el-input
        ></el-form-item>
        <el-form-item label="权限标识" prop="code"
          ><el-input v-model="permissionForm.code"></el-input
        ></el-form-item>
        <el-form-item label="权限描述" prop="description"
          ><el-input v-model="permissionForm.description"></el-input
        ></el-form-item>
        <el-form-item label="开启" prop="enVisible">
          <el-switch v-model="permissionForm.enVisible"></el-switch>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button size="mini" type="primary" @click="confirmAddPermission"
          >确定</el-button
        >
        <el-button size="mini" @click="dialogVisible = false">取消</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { transferListToTree } from '@/utils'
import { getPermissions, addPermission, editPermission } from '@/api/permission'
export default {
  filters: {},
  components: {},
  data () {
    return {
      // 所有权限
      permissions: [],
      dialogVisible: false,
      permissionFormRules: {
        name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      },
      permissionForm: {
        enVisible: false,
        name: '',
        code: '',
        description: '',
        type: '',
        pid: ''
      },
      id: null
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getPermissions()
  },
  methods: {
    // 获取所有权限 渲染页面
    async getPermissions () {
      const res = await getPermissions()
      this.permissions = transferListToTree(res, '0')
    },
    showDialog (id) {
      this.id = id
      this.dialogVisible = true
    },
    resetPermissionForm () {
      this.permissionForm = {
        enVisible: false,
        name: '',
        code: '',
        description: '',
        type: '',
        pid: ''
      }
      this.$refs.permissionFormRef.resetFields()
    },
    // 确认提交编辑 或者提交添加
    async confirmAddPermission () {
      if (this.id) {
        // 有id 是新增
        // 通过pid判断点击的是一层的添加按钮 还是二层的添加按钮1
        this.permissionForm.pid = this.id ? this.id : '0'
        this.permissionForm.type = this.id === '0' ? 1 : 2
        await addPermission(this.permissionForm)
      } else {
        // 无id是编辑
        await editPermission(this.permissionForm)
      }
      this.dialogVisible = false
      this.getPermissions()
    },
    editPermission (row) {
      this.dialogVisible = true
      // 回写数据 解构赋值避免数据之间受到影响
      this.permissionForm = { ...row }
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
