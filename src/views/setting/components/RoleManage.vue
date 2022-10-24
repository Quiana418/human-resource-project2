<template>
  <div class="roleManage">
    <el-button
      type="primary"
      size="mini"
      icon="el-icon-plus"
      @click="
        roleDialogVisible = true;
        isEdit = false;
        form = {};
      "
      >新增角色</el-button
    >
    <el-table :data="roleList" border>
      <!-- :index="paramsObj.pagesize * (paramsObj.page - 1) + 1"让每页序号连贯 -->
      <el-table-column
        type="index"
        :index="paramsObj.pagesize * (paramsObj.page - 1) + 1"
        label="序号"
        width="120px"
        align="center"
      ></el-table-column>
      <el-table-column
        align="center"
        label="角色名"
        prop="name"
        width="240px"
        sortable
      ></el-table-column>

      <el-table-column
        align="center"
        label="描述"
        prop="description"
        sortable
      ></el-table-column>

      <el-table-column label="操作" align="center">
        <template v-slot="scope">
          <el-button type="primary" @click="showRightDialog(scope.row.id)"
            >分配权限</el-button
          >
          <el-button type="warning" @click="showRoleDialog(scope.row)"
            >编辑</el-button
          >
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <!-- <el-row type="flex" justify="end">
      <el-pagination
        :current-page="paramsObj.page"
        :page-sizes="[1, 3, 4, 5, 10]"
        :page-size="paramsObj.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
      >
      </el-pagination>
    </el-row> -->
    <Pagination
      :total="total"
      :page.sync="paramsObj.page"
      :limit.sync="paramsObj.pagesize"
      @pagination="getRoleList"
    ></Pagination>

    <!-- 权限对话框 -->
    <el-dialog title="分配权限" :visible.sync="RightDialogVisible" width="30%">
      <!-- 树形结构 -->
      <!-- v-if="RightDialogVisible" 保证每次关闭对话框时 让tree销毁 再次点击时 时一个最新的tree -->
      <!--只要是vue的项目，当你出现一个很奇怪的问题的时候，可以试一试v-if或$nextTick,或setTimeout数据没有同步更新->
<!-·v-if作用：保证每次对话框关闭的时候让tree销毁，再显示对话框的时候，看到的tree是一个新的el-tree-->
      <el-tree
        v-if="RightDialogVisible"
        ref="myTree"
        :data="permissions"
        :props="{ label: 'name' }"
        default-expand-all
        show-checkbox
        node-key="id"
        :default-checked-keys="selectedPermissions"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="RightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 新增和编辑的对话框 -->
    <el-dialog
      :title="isEdit ? '编辑' : '新增'"
      :visible.sync="roleDialogVisible"
      @close="reset"
    >
      <el-form ref="myForm" label-width="80px" :rules="rules" :model="form">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="onClick"> 确认 </el-button>
        <el-button @click="roleDialogVisible = false">取消</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { transferListToTree } from "@/utils/index";
import {
  getPermissions,
  getPermissionsById,
  assignPermission,
} from "@/api/permission";
import { getRoleList, delRole, addRole, editRole } from "@/api/setting";
export default {
  filters: {},
  components: {},
  data() {
    return {
      // 请求角色列表的参数
      paramsObj: {
        page: 1,
        pagesize: 10,
      },
      // 角色列表
      roleList: [],
      // 显示总条数
      total: 0,
      // 控制权限对话框
      RightDialogVisible: false,
      // 所有权限列表
      permissions: [],
      // 一打开就选中的权限
      selectedPermissions: [],
      // 角色id
      id: null,
      // 控制新增和编辑的对话框
      roleDialogVisible: false,
      // 新增和编辑角色 对话框的表单数据
      form: {
        name: "",
        description: "",
      },
      rules: {
        name: [
          { required: true, message: "角色名称不能为空", trigger: "blur" },
          { min: 2, max: 8, message: "角色名在2-8个字符", trigger: "blur" },
        ],
      },
      // 控制点开的是修改 还是新增 false==新增 true表示编辑
      isEdit: false,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getRoleList();
  },
  methods: {
    // 请求角色列表
    async getRoleList() {
      try {
        const res = await getRoleList(this.paramsObj);
        this.roleList = res.rows;
        // 用于做分页
        this.total = res.total;
      } catch (err) {
        console.log(err);
      }
    },
   /*  // 切换每页条数
    onSizeChange(pagesize) {
      this.paramsObj.pagesize = pagesize;
      this.getRoleList();
    },
    // 切换当前页码
    onCurrentChange(page) {
      this.paramsObj.page = page;
      this.getRoleList();
    }, */
    // 根据id删除角色
    del(id) {
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          // 在then里面发起请求
          await delRole(id);
          // 如果当前页的数据只剩一条 那么让页数往前跳1（要排除当前页是第一页的情况）
          if (this.roleList.length === 1 && this.paramsObj.page > 1) {
            this.paramsObj.page--;
          }
          this.getRoleList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 点击分配权限按钮 弹出对话框
    async showRightDialog(id) {
      // 存角色id 供下面请求使用
      this.id = id;
      this.RightDialogVisible = true;
      const res = await getPermissions();
      this.permissions = transferListToTree(res, "0");

      // 根据角色id发请求 拿数据 数据回写到对话框
      const res1 = await getPermissionsById(id);
      // 默认选中的权限
      this.selectedPermissions = res1.permIds;
    },
    // 点击分配权限对话框的 确定按钮 发起请求分配权限
    async save() {
      const permIds = this.$refs.myTree.getCheckedKeys();
      // console.log(this.$refs.myTree.getCheckedKeys())
      await assignPermission(this.id, permIds);
      this.RightDialogVisible = false;
    },
    // 点击新增 或者修改（通过isEdit判断）对话框里的确定按钮 发起添加/修改请求
    onClick() {
      this.$refs.myForm.validate(async (valid) => {
        if (!valid) return this.$message.error("表单非法");
        if (this.isEdit) {
          // 编辑
          await editRole(this.form);
        } else {
          // 新增
          await addRole(this.form);
        }
        this.getRoleList();
        this.roleDialogVisible = false;
      });
    },
    // 新增对话框的表单重置
    reset() {
      this.$refs.myForm.resetFields();
    },
    // 点击编辑 显示编辑对话框 实现数据回写!!!!!!!!!!!!!!!!
    showRoleDialog(row) {
      this.isEdit = true;
      this.roleDialogVisible = true;
      // 浅拷贝1
      // this.form = { ...row }
      // 浅拷贝2
      this.form = Object.assign({}, row);
    },
  },
};
</script>

<style scoped lang="scss">
.el-table {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
