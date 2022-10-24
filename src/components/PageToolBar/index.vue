<template>
  <el-card>
    <!-- 顶部工具条 -->
    <el-row type="flex" justify="space-between" align="middle">
      <!-- 前插槽 -->
      <el-col>
        <el-alert
          v-if="title.length > 0"
          type="info"
          show-icon
          :closable="false"
        >
          {{ title }}
        </el-alert>
      </el-col>

      <!-- 后插槽 -->
      <el-col>
        <el-row type="flex" justify="end">
          <slot name="right"> </slot>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  filters: {},
  components: {},
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.el-alert {
  display: inline;
  width: unset;
  ::v-deep .el-alert__icon {
    font-size: 14px;
  }
}
</style>
