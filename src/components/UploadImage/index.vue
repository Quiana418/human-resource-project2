<template>
  <div class="container">
    <el-upload
      action="#"
      list-type="picture-card"
      accept="image/png,image/jpg,image/jpeg,image/gif"
      :limit="limit"
      :class="{ hidden: fileList.length === limit }"
      :on-change="handleChange"
      :file-list="fileList"
      :http-request="handleRequest"
    >
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{ file }">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in"></i>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleDownload(file)"
          >
            <i class="el-icon-download"></i>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <!-- 进度条 -->
    <el-progress :percentage="percent" style="width: 180px"></el-progress>

    <el-dialog :visible.sync="dialogVisible" title="预览">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
var cos = new COS({
  SecretId: 'AKIDSjlY6ORFo8C1auynMfjYAXfXAXfXAXfX',
  SecretKey: 'f4D7mCMGvLVQ8bpnWzCAtMZXGkyweYDc'
})
export default {
  name: 'UploadImage',
  filters: {},
  components: {},
  props: {
    limit: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      fileList: [],
      percent: 0
    }
  },
  computed: {},
  watch: {},
  created () { },
  methods: {
    handleRemove (file) {
      this.fileList = this.fileList.filter(item => item.uid !== file.uid)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload (file) {
      console.log(file)
    },
    handleChange (file, fileList) {
      this.fileList = fileList
    },
    handleRequest (obj) {
      // 腾讯云cos上传图片
      cos.putObject({
        Bucket: 'quiana-123-1301725345', /* 必须 */
        Region: 'ap-shanghai', /* 存储桶所在地域，必须字段 */
        Key: Date.now() + obj.file.name, /* 必须 */
        StorageClass: 'STANDARD',
        Body: obj.file, // 上传文件对象
        onProgress: (progressData) => {
          this.percent = Math.ceil(progressData.loaded / progressData.total * 100)
        }
      }, (err, data) => {
        console.log(err || data)
        this.src = data.Location
      })
    }
  }
}
</script>

<style scoped lang='scss'>
.container {
  display: flex;
  width: 900px;
}
// 原理：hidden类名是动态绑定
.hidden ::v-deep .el-upload--picture-card {
  display: none;
}
.el-progress {
  position: absolute;
  top: 150px;
  line-height: 1;
}
</style>
