<template>
  <div class="staff-container">
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="登录账户设置" name="first">
          <!-- {{ $router.params.id }} -->
          <!-- {{ id }} -->
          <el-form
            ref="myForm"
            style="width: 400px; margin-left: 200px; margin-top: 50px"
            :rules="userInfoRules"
            :model="userInfo"
          >
            <el-form-item label="用户名" label-width="80px" prop="username">
              <el-input v-model="userInfo.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" label-width="80px" prop="password2">
              <el-input v-model="userInfo.password2"></el-input>
            </el-form-item>
            <el-form-item label-width="80px">
              <el-button type="primary" @click="save">更新</el-button>
              <el-button type="info">取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="个人详情" name="second">
          <UserInfo :id="id"></UserInfo>
        </el-tab-pane>

        <el-tab-pane label="岗位信息" name="third">
          <JobInfo></JobInfo>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import JobInfo from "./components/JobInfo.vue";
import UserInfo from "./components/UserInfo.vue";
import { getUserDetailById } from "@/api/user";
import { saveEmployee } from "@/api/employee";
export default {
  name: "StaffDetails",
  filters: {},
  components: { UserInfo, JobInfo },
  props: {
    // id: {
    //   type: [Number, String],
    //   required: false
    // },
  },
  data() {
    return {
      activeName: "first",
      // 登录表单校验规则
      userInfoRules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
      },
      // 登录表单数据
      userInfo: {
        username: "",
        password2: "",
      },
      userId: this.$route.params.id,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getUserDetailById();
  },
  methods: {
    // 页面一加载 就发请求 回写登录表单数据
    async getUserDetailById() {
      this.userInfo = await getUserDetailById(this.userId);
    },
    save() {
      this.$refs.myForm.validate(async (valid) => {
        if (!valid) return this.$message.error("表单数据校验失败");
        const res = await saveEmployee({
          ...this.userInfo,
          password: this.userInfo.password2,
        });
        console.log(res);
      });
    },
  },
};
</script>

<style scoped lang="scss"></style>
