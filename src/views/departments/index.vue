<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="用户管理">
            <!-- 用了一个行列布局 -->
            <!-- 把每一行 封装成组件 -->
            <TreeItem :node="titleObj"></TreeItem>

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
      titleObj: {}
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
        // 数据需要处理一下 通过pid找儿子
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
    font-size: 18px;
  }
}
::v-deep .el-tree-node__content {
  padding: 20px 0 !important;
}
</style>
