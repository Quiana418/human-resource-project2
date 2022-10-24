<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 顶部工具条 -->
      <PageToolBar :title="`共${total}条记录`">
        <template #right>
          <el-button type="danger" size="mini" @click="exportExcel"
            >普通Excel导出</el-button
          >
          <el-button type="info" size="mini" @click="exportExcel1"
            >复杂表头Excel导出</el-button
          >
          <el-button
            type="success"
            size="mini"
            @click="$router.push('/import?type=user')"
            >Excel导入</el-button
          >
          <el-button
            type="primary"
            size="mini"
            @click="addEmployeeVisible = true"
            >新增员工</el-button
          ></template
        >
      </PageToolBar>

      <el-card>
        <el-table border :data="employee">
          <el-table-column
            :index="form.size * (form.page - 1) + 1"
            label="序号"
            type="index"
            align="center"
          ></el-table-column>

          <el-table-column
            label="姓名"
            sortable
            prop="username"
            align="center"
          ></el-table-column>

          <el-table-column label="头像" prop="staffPhoto" align="center">
            <template v-slot="scope">
              <img
                v-imgerror
                :src="scope.row.staffPhoto"
                alt=""
                style="width: 40px"
                align="center"
                @click="showQrCode"
              />
            </template>
          </el-table-column>

          <el-table-column
            label="手机号"
            prop="mobile"
            align="center"
          ></el-table-column>

          <el-table-column
            label="工号"
            prop="workNumber"
            align="center"
          ></el-table-column>

          <!-- formatter处理数据 -->
          <el-table-column
            label="聘用形式"
            prop="formOfEmployment"
            align="center"
            :formatter="formatterEmployType"
          ></el-table-column>

          <!-- 插槽+过滤器处理数据 -->
          <el-table-column
            label="聘用形式"
            prop="formOfEmployment"
            align="center"
          >
            <template v-slot="scope">
              {{ scope.row.formOfEmployment | formatRentType }}
            </template>
          </el-table-column>

          <el-table-column
            label="部门"
            prop="departmentName"
            align="center"
          ></el-table-column>

          <el-table-column label="入职时间" prop="timeOfEntry" align="center">
            <template v-slot="scope">
              {{ scope.row.timeOfEntry | formatTime }}
            </template>
          </el-table-column>

          <el-table-column label="状态" prop="enableState" align="center">
            <template v-slot="scope">
              <el-switch :value="scope.row.enableState"></el-switch>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" style="width: 450px">
            <template v-slot="scope">
              <el-button
                type="text"
                @click="$router.push('/employee/detail/' + scope.row.id)"
                >查看</el-button
              >
              <el-button type="text">转正</el-button>
              <el-button type="text">调岗</el-button>
              <el-button type="text">离职</el-button>
              <el-button type="text" @click="showRoleDialog(scope.row.id)"
                >角色</el-button
              >
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>

    <!-- 角色对话框 -->
    <el-dialog title="分配角色" :visible.sync="dialogVisible" width="50%">
      <!-- 复选框 -->
      <!-- checkList 存储选中的数据 -->
      <!-- :label="item.id"--选中状态的值 要和v-model="checkList"里面的值一致 -->
      <el-checkbox-group v-model="checkList">
        <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">{{
          item.name
        }}</el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="assignRoles">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 新增员工对话框 -->
    <el-dialog
      title="新增员工"
      :visible.sync="addEmployeeVisible"
      @close="closeAddForm"
    >
      <el-form
        ref="myForm"
        label-width="80px"
        :rules="employeeFormRules"
        :model="employeeForm"
      >
        <el-form-item label="姓名" prop="username">
          <el-input v-model="employeeForm.username"></el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="employeeForm.mobile"></el-input>
        </el-form-item>

        <el-form-item label="入职时间" prop="timeOfEntry">
          <el-date-picker
            v-model="employeeForm.timeOfEntry"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="聘用形式" prop="formOfEmployment">
          <el-select
            v-model="employeeForm.formOfEmployment"
            placeholder="请选择"
          >
            <el-option
              v-for="item in hireType"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            >
            </el-option
          ></el-select>
        </el-form-item>

        <el-form-item label="工号" prop="workNumber">
          <el-input v-model="employeeForm.workNumber"></el-input>
        </el-form-item>

        <el-form-item label="组织名称" prop="departmentName">
          <el-input
            v-model="employeeForm.departmentName"
            @focus="showDepartment"
          ></el-input>
          <el-tree
            v-if="departmentList.length > 0"
            :data="departmentList"
            :props="{ label: 'name' }"
            default-expand-all
            @node-click="handleNodeClick"
          >
          </el-tree>
        </el-form-item>

        <el-form-item label="转正时间" prop="correctionTime">
          <el-date-picker
            v-model="employeeForm.correctionTime"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addEmployeeVisible = false">取 消</el-button>
        <el-button type="primary" @click="addEmployeeVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- qrCode -->
    <el-dialog title="图片二维码" :visible.sync="qrCodeVisible">
      <el-row type="flex" justify="center">
        <canvas ref="canvas"></canvas>
      </el-row>
    </el-dialog>

    <Pagination
      :total="total"
      :page.sync="form.page"
      :limit.sync="form.size"
      @pagination="getEmployee"
    ></Pagination>
  </div>
</template>

<script>
import QRCode from "qrcode";
import { getDepartmentsList } from "@/api/departments";
import { validMobile } from "@/utils/validate";
import { getUserDetailById } from "@/api/user";
import { getRoleList } from "@/api/setting";
import { getEmployee, assignRoles } from "@/api/employee";
import employees from "@/constant/employees";
export default {
  name: "Employee",
  filters: {
    // 用插槽+过滤器处理聘用形式数据
    formatRentType(id) {
      var obj = employees.hireType.find((item) => item.id === id - 0);
      if (obj) {
        return employees.hireType.find((item) => item.id === id - 0).value;
      } else {
        return "未知";
      }
    },
  },
  components: {},
  data() {
    // 自定义手机号校验规则
    const validateMobile = (rule, value, callback) => {
      validMobile(value) ? callback() : callback(new Error("手机号格式不正确"));
    };
    return {
      form: {
        page: 1,
        size: 10,
      },
      // 员工列表
      employee: [],
      // 每页显示总条数
      total: 0,
      // 控制角色对话框
      dialogVisible: false,
      // 角色对话框复选框 选中的数组
      checkList: [],
      // 角色列表数组
      roleList: [],
      // 员工id
      id: "",
      // 控制新增员工对话框
      addEmployeeVisible: false,
      // 新增员工 表单信息
      employeeForm: {
        username: "",
        mobile: "",
        formOfEmployment: "",
        workNumber: "",
        departmentName: "",
        timeOfEntry: "",
        correctionTime: "",
      },
      // 新增员工表单校验规则
      employeeFormRules: {
        mobile: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validateMobile, trigger: "blur" },
        ],
        timeOfEntry: [{ required: true, message: "必填", trigger: "blur" }],
        workNumber: [{ required: true, message: "必填", trigger: "blur" }],
      },
      // 聘用形式
      hireType: employees.hireType,
      // 部门列表
      departmentList: [],
      qrCodeVisible: false,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getEmployee();
  },
  methods: {
    // 获取员工列表
    async getEmployee() {
      const res = await getEmployee(this.form);
      this.employee = res.rows;
      this.total = res.total;
    },
    // 用formatter处理聘用形式数据
    formatterEmployType(row, colum, cellValue, index) {
      var obj = employees.hireType.find((item) => item.id === cellValue - 0);
      if (obj) {
        return employees.hireType.find((item) => item.id === cellValue - 0)
          .value;
      } else {
        return "未知";
      }
    },
    // 点击导出Excel 用懒加载方式导入文件
    /*  exportExcel () {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['编号', '任务名']
        const data = [[1, '吃饭'], [2, '睡觉']]
        excel.export_json_to_excel({
          header: tHeader, // 表头 必填
          data, // 具体数据 必填
          filename: 'excel-list', // 非必填
          autoWidth: true, // 非必填
          bookType: 'xlsx' // 非必填
        })
      })
    } */

    // 点击导出Excel 用懒加载方式导入文件
    async exportExcel() {
      const { rows } = await getEmployee(this.form);
      rows.forEach((item) => {
        delete item.password;
        delete item.staffPhoto;
      });
      // 把列别熬数据进行加工 变成二维数组
      var data = [];
      rows.forEach((item) => {
        data.push(Object.values(item));
      });
      const headers = {
        id: "编号",
        username: "姓名",
        mobile: "手机",
        timeOfEntry: "入职日期",
        formOfEmployment: "聘用形式",
        correctionTime: "转正日期",
        workNumber: "工号",
        departmentName: "部门",
      };
      var tHeader = Object.keys(rows[0]).map((item) => headers[item]);
      // console.log(tHeader)

      import("@/vendor/Export2Excel").then((excel) => {
        excel.export_json_to_excel({
          header: tHeader, // 表头 必填
          data, // 具体数据 必填
          filename: "excel-list", // 非必填
          autoWidth: true, // 非必填
          bookType: "xlsx", // 非必填
        });
      });
    },

    // 导出复杂表头Excel
    exportExcel1() {
      const multiHeader = [["", "主要信息", "", "", "", "", ""]];
      const merges = ["A1:A2", "B1:F1", "G1:G2"];
      const tHeader = [
        "姓名",
        "手机号",
        "入职日期",
        "聘用形式",
        "转正日期",
        "工号",
        "部门",
      ];
      const data = [
        ["张三", "13000000", "2019-1-1", "正式", "2019-1-2", "110", "java部门"],
        ["李四", "13000000", "2019-1-1", "正式", "2019-1-2", "111", "java部门"],
      ];

      import("@/vendor/Export2Excel").then((excel) => {
        excel.export_json_to_excel({
          header: tHeader, // 表头 必填
          multiHeader, // 第一行表头 复杂表头
          data, // 具体数据 必填
          filename: "excel-list", // 非必填
          autoWidth: true, // 非必填
          bookType: "xlsx", // 非必填
          merges, // 设置合并规则
        });
      });
    },

    // 点击角色 弹出对话框
    async showRoleDialog(id) {
      this.id = id;
      // 请求获取表单内所有的角色
      const { rows } = await getRoleList({ page: 1, pagesize: 9999 });
      this.roleList = rows;
      // 请求获取每个员工已有的角色（在表单内打上勾）
      const { roleIds } = await getUserDetailById(id);
      this.checkList = roleIds;
      this.dialogVisible = true;
    },

    // 点击角色对话框的确定 分配角色
    async assignRoles() {
      const res = await assignRoles({
        id: this.id,
        roleIds: this.checkList,
      });
      console.log(res);
      this.dialogVisible = false;
    },

    // 关闭新增员工表单 重置表单
    closeAddForm() {
      this.$refs.myForm.resetFields();
      this.departmentList = [];
    },

    // 光标订到组织结构输入框内 显示所有部门
    async showDepartment() {
      const res = await getDepartmentsList();
      // 我们的数据不能直接使用，而是先加工处理一下才能使用 递归在写的时候慢慢就意识到了 层次不确定
      function transferListToTree(list, pid) {
        var list1 = [];
        list.forEach((item) => {
          if (item.pid === pid) {
            list1.push(item);
            item.children = transferListToTree(list, item.id);
          }
        });
        return list1;
      }
      this.departmentList = transferListToTree(res.depts, "");
    },

    // 点击tree里面的节点 关闭tree 同时把点击的节点赋值给表单
    handleNodeClick(obj) {
      this.employeeForm.departmentName = obj.name;
      this.departmentList = [];
    },

    // 点击图片显示qrcode
    showQrCode() {
      this.qrCodeVisible = true;
      this.$nextTick(() => {
        QRCode.toCanvas(this.$refs.canvas, "sample text", function (error) {
          if (error) console.error(error);
          console.log("success");
        });
      });
    },
  },
};
</script>

<style scoped lang="scss"></style>
