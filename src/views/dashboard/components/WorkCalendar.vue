<template>
  <div>
    <el-row type="flex" justify="end" :gutter="10">
      <el-col :span="6">
        <el-select v-model="currentYear" size="mini" @change="handleChange">
          <el-option
            v-for="index in 11"
            :key="index"
            :value="currentYear - 6 + index"
            >{{ currentYear - 6 + index }}</el-option
          >
        </el-select>
      </el-col>

      <el-col :span="6">
        <el-select v-model="currentMonth" size="mini" @change="handleChange">
          <el-option v-for="index in 12" :key="index" :value="index">{{
            index
          }}</el-option>
        </el-select>
      </el-col>
    </el-row>

    <!-- 日历 -->
    <el-calendar ref="calendar" v-model="nowTime">
      <template #dateCell="scope">
        <i> {{ scope.date.getDate() }}</i>
        <span
          v-if="scope.date.getDay() === 0 || scope.date.getDay() === 6"
          class="reset"
        >
          休
        </span>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  filters: {},
  components: {},
  data () {
    return {
      currentMonth: new Date().getMonth() + 1,
      currentYear: new Date().getFullYear(),
      nowTime: new Date()
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () {
    var that = this
    this.$refs.calendar.$el.addEventListener('click', function () {
      console.log(that.$refs.calendar.realSelectedDay)
      that.currentMonth = new Date(that.$refs.calendar.realSelectedDay).getMonth() + 1
    })
  },
  methods: {
    handleChange () {
      var str = this.currentYear + '-' + this.currentMonth
      this.nowTime = new Date(str)
    }
  }
}
</script>

<style scoped lang='scss'>
::v-deep .el-calendar__body {
  padding: 12px 0px 0px;
}
::v-deep .el-calendar__header {
  display: none;
}
::v-deep .el-calendar-table td {
  text-align: center;
}
.reset {
  display: inline-block;
  border-radius: 50%;
  background-color: rgb(223, 80, 32);
  color: #fff;
  width: 18px;
  height: 18px;
  text-align: center;
  line-height: 18px;
  font-size: 12px;
  margin-left: 10px;
}
</style>

