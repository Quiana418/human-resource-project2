<template>
  <el-form style="width: 600px">
    <el-form-item label="企业名称" label-width="80px">
      <el-input :value="companyInfo.name" disabled></el-input>
    </el-form-item>

    <el-form-item label="公司地址" label-width="80px">
      <el-input :value="companyInfo.companyAddress" disabled></el-input>
    </el-form-item>

    <el-form-item label="公司电话" label-width="80px">
      <el-input :value="companyInfo.companyPhone" disabled></el-input>
    </el-form-item>

    <el-form-item label="邮箱" label-width="80px">
      <el-input :value="companyInfo.mailbox" disabled></el-input>
    </el-form-item>

    <el-form-item label="备注" label-width="80px">
      <el-input :value="companyInfo.remarks" disabled></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import { getCompanyInfo } from '@/api/setting'
import { mapGetters } from 'vuex'
export default {
  name: 'CompanyInfo',
  filters: {},
  components: {},
  data () {
    return {
      // 公司信息
      companyInfo: []
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  watch: {},
  async created () {
    const res = await getCompanyInfo(this.companyId)
    console.log(res)
    this.companyInfo = res
  },
  methods: {}
}
</script>

<style scoped lang='scss'>
</style>
