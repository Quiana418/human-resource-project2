<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane label="角色管理" name="first">
            <RoleManage></RoleManage>
          </el-tab-pane>
          <el-tab-pane label="公司设置" name="second">
            <CompanyInfo></CompanyInfo>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import CompanyInfo from './components/CompanyInfo.vue'
import RoleManage from './components/RoleManage.vue'
export default {
  filters: {},
  components: {
    RoleManage,
    CompanyInfo
  },
  data () {
    return {
      activeName: 'first'
    }
  },
  computed: {},
  watch: {},
  created () { },
  methods: {}
}
</script>

<style scoped lang='scss'>
</style>
