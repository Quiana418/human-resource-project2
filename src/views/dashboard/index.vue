<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <input
      type="file"
      accept="image/jpg,image/png,image/jpeg,image/gif"
      @change="handleChange"
    />
    <img :src="'http://' + src" alt="" />
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
import { mapGetters } from 'vuex'
var cos = new COS({
  SecretId: 'AKIDSjlY6ORFo8C1auynMfjYAXfXAXfXAXfX',
  SecretKey: 'f4D7mCMGvLVQ8bpnWzCAtMZXGkyweYDc'
})
console.log(cos)
export default {
  name: 'Dashboard',
  data () {
    return {
      src: ''
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    handleChange (e) {
      console.dir(e.target)
      cos.putObject({
        Bucket: 'quiana-123-1301725345', /* 必须 */
        Region: 'ap-shanghai', /* 存储桶所在地域，必须字段 */
        Key: 'quiana', /* 必须 */
        StorageClass: 'STANDARD',
        Body: e.target.files[0], // 上传文件对象
        onProgress: function (progressData) {
          console.log(JSON.stringify(progressData))
        }
      }, (err, data) => {
        console.log(err || data)
        this.src = data.Location
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
