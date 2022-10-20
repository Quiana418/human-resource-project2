<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card
        v-loading="isLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        style="min-height=700px"
      >
        <el-tabs>
          <el-tab-pane label="用户管理">
            <!-- 用了一个行列布局 -->
            <!-- 把每一行 封装成组件 -->
            <TreeItem
              :node="titleObj"
              @delDepartment="getDepartmentsList"
            ></TreeItem>

            <el-tree :data="data" default-expand-all>
              <template v-slot="scope">
                <TreeItem
                  :node="scope.node"
                  @delDepartment="getDepartmentsList"
                ></TreeItem>
              </template>
            </el-tree>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <!-- 返回顶部 -->
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import { getDepartmentsList } from '@/api/departments'
import TreeItem from './components/TreeItem.vue'
export default {
  filters: {},
  components: { TreeItem },
  data () {
    return {
      data: [{
        label: '技术部',
        children: [{
          label: '质量监管'
        }]
      }],
      titleObj: {},
      // 刚点进去 是加载状态
      isLoading: true

    }
  },
  computed: {},
  watch: {},
  created () {
    this.getDepartmentsList()
  },
  methods: {
    // 获取组织结构列表 部门
    async getDepartmentsList () {
      try {
        const res = await getDepartmentsList()
        // console.log(res)
        // 数据需要处理一下 通过pid找儿子 提取出去公用
        function transferListToTree (list, pid) {
          var list1 = []
          list.forEach(item => {
            if (item.pid === pid) {
              list1.push(item)
              item.children = transferListToTree(list, item.id)
            }
          })
          return list1
        }
        this.data = transferListToTree(res.depts, '')
        this.titleObj = res.depts[0]
        this.isLoading = false
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped lang='scss'>
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
</style>
