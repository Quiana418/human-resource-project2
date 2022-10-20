<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="el-tree-node">
        <!-- el-tree组件 -->
        <TreeItem :node="company" :isRoot="true"></TreeItem>

        <!-- 树形组织架构 -->
        <el-tree :data="departs" default-expand-all :props="defaultProps">
          <!-- el-tree组件 -->
          <!-- data就是departs里面的每一个对象 -->
          <TreeItem slot-scope="{ data }" :node="data" @delDepartment="getDepartmentsList"></TreeItem>
          <!-- <template v-slot="scope">
            <TreeItem :node="scope.data"></TreeItem>
          </template> -->
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeItem from "@/views/departments/components/TreeItem.vue";
import { getDepartmentsList } from "@/api/departments";
import { transferListToTree } from '@/utils';
export default {
  filters: {},
  components: { TreeItem },
  data() {
    return {
      defaultProps: {
        label: "name",
        children: "children",
      },
      company: {},
      departs: [],
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getDepartmentsList();
  },
  methods: {
    async getDepartmentsList() {
      const res = await getDepartmentsList();
      this.company = { name: res.companyName, manager: "负责人", id:"" }; //这里加id:"" 用于递归查找到所有根节点
      this.departs = transferListToTree(res.depts, '')
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .el-tree-node {
  padding: 10px !important;
  span,
  div {
    font-size: 16px;
  }
}
::v-deep .el-tree-node__content {
  padding: 18px 0 !important;
}
::v-deep .el-col {
  .el-dropdown {
    margin-left: 33px !important;
  }
  .el-col-24 {
    margin-left: -25px !important;
  }
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
