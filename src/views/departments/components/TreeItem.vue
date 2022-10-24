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
                <!-- <template v-if="node.data"> -->
                <template v-if="!isRoot">
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
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      width="50%"
      @close="handleAddClose"
    >
      <el-form
        ref="addFormRef"
        :model="addDepartmentForm"
        :rules="addDepartmentFormRules"
        :label-width="formLabelWidth"
      >
        <el-form-item label="部门名称" prop="name">
          <el-input
            v-model="addDepartmentForm.name"
            autocomplete="off"
            placeholder="3-10个字符"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门编码" prop="code">
          <el-input
            v-model="addDepartmentForm.code"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门负责人" prop="manager">
          <!-- filterable 选择框的输入筛选功能 -->
          <el-select
            v-model="addDepartmentForm.manager"
            placeholder="请选择"
            :label-width="formLabelWidth"
            style="width: 100%"
            filterable
          >
            <!-- label是展示到页面的  value是对应发给后台的 -->
            <el-option
              v-for="item in users"
              :key="item.id"
              :label="item.username"
              :value="item.username"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门介绍" prop="introduce">
          <el-input
            v-model="addDepartmentForm.introduce"
            type="textarea"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onConfirm">确 定 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getSimpleUserList } from "@/api/user";
import {
  delDepartment,
  addDepartment,
  getDepartmentsList,
  editDepartment,
} from "@/api/departments";
export default {
  filters: {},
  components: {},
  props: {
    node: {
      type: Object,
      required: true,
    },
    isRoot: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    // 自定义校验规则 不能添加重复的部门 并且编辑的时候 也不能修改成兄弟部门的名字（不能重复）
    const validateDepartmentName = async (rule, value, callback) => {
      // 拿到所有的部门名称
      const res = await getDepartmentsList();
      // 判断是编辑还是添加
      if (this.isEditOrAdd) {
        // 编辑---标题不存在编辑
        const pid = this.node.pid;
        // 找到当前要编辑的所有兄弟(item => item.pid === pid)（排除自身item.id === this.node.id）
        // some(item => item.name === value) 说明正在修改的名字和兄弟的名字重复了
        const isRepeat = res.depts
          .filter((item) => item.pid === pid && item.id !== this.node.id).some((item) => item.name === value)

        isRepeat  ? callback(new Error("部门名称不能重复"))
          : callback();
      } else {
        // 添加
        const id = this.node ? this.node.id : "";
        // filter筛选 如果子部门的pid值和当前部门id值一样 说明就是他的子部门
        res.depts
          .filter((item) => item.pid === id)
          .some((item) => item.name === value)
          ? callback(new Error("部门名称不能重复"))
          : callback();
      }
    };
    return {
      // 添加和编辑的对话框 共用
      dialogFormVisible: false,
      // 添加部门 的表单数据
      addDepartmentForm: {
        name: "",
        code: "",
        manager: "",
        introduce: "",
      },
      // 添加部门的表单规则
      addDepartmentFormRules: {
        name: [
          { required: true, message: "部门名称不能为空", trigger: "blur" },
          { min: 3, max: 10, message: "长度在3-10个字符", trigger: "blur" },
          { validator: validateDepartmentName, trigger: "change" },
        ],
      },
      formLabelWidth: "100px",
      // 用户数据
      users: [],
      // 判断是在做添加还是编辑 true是编辑部门
      isEditOrAdd: false,
    };
  },
  computed: {
    // 新增和编辑共用同一个对话框，所以用计算属性 区分何时显示不同的标题
    title() {
      return this.isEditOrAdd ? "编辑部门" : "新增部门";
    },
  },
  watch: {},
  created() {},
  methods: {
    // 点击右侧操作
    async onCommand(key) {
      if (this.users.length === 0) {
        this.getSimpleUserList();
      }
      if (key === "a") { // 新增部门
        this.isEditOrAdd = false;
        this.dialogFormVisible = true;
        // 放在这里每次点击新增部门都要拿数据 提取出去判断一下
        // this.getSimpleUserList()
      } else if (key === "b") { // 编辑部门
        this.isEditOrAdd = true;
        this.dialogFormVisible = true;
        // { ...this.node.data }浅拷贝，先把{}去掉，在加上，让两次对象的地址不一致
        this.addDepartmentForm = { ...this.node }; // 回显数据
      } else {  // 删除

        try {
          await this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          });
          await delDepartment(this.node.id);
          this.$emit("delDepartment");
          this.$message({
            message: "删除成功",
            type: "success",
          });
        } catch (err) {
          this.$message({
            message: "取消删除",
            duration: 1000,
          });
        }
      }
    },

    // 获取新增部门变淡里面的数据 发起请求
    async getSimpleUserList() {
      // try catch已经写在请求拦截器里面了
      const res = await getSimpleUserList();
      // console.log(res)
      this.users = res;
    },

    // 点击添加部门表单内的确认/取消 实现重置表单
    handleAddClose() {
      this.$refs.addFormRef.resetFields();
    },

    // 新增部门 或者编辑部门
    async onConfirm() {
      if (this.isEditOrAdd) {
        // console.log(this.addDepartmentForm)
        delete this.addDepartmentForm.children;
        await editDepartment(this.addDepartmentForm);
      } else {
        // 给谁添加子部门 就把当前这个的id作为pid
        this.addDepartmentForm.pid = this.node ? this.node.id : "";
        await addDepartment(this.addDepartmentForm);
      }
      this.dialogFormVisible = false;
      this.$emit("delDepartment");
    },
  },
};
</script>

<style scoped lang="scss"></style>
