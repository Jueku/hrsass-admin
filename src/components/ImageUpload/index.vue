<template>
  <div class="image-upload" :class="{ disabled: fileList.length >= limit }">
    <!-- action: 要把图片上传到哪台服务器（图片服务器的地址）
      自己搭建服务器 一般使用action上传，不使用action时  要把action 配置 #
    -->
    <!-- list-type：上传组件样式的控制 -->
    <!-- on-preview：预览 -->
    <!-- limit 上传的最大文件数 -->
    <!-- on-exceed 上传到最大限制时会自动执行这个钩子函数 -->
    <!-- on-remove: 删除时，执行的钩子函数 -->
    <!-- :http-request 自定义上传 -->
    <!-- :on-change 文件状态改变，添加文件、上传成功、上传失败都会执行 -->
    <!-- :before-upload 上传前执行 -->
    <el-upload
      action="#"
      list-type="picture-card"
      :file-list="fileList"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :limit="limit"
      :on-exceed="onExceed"
      :http-request="httpRequest"
      :on-change="onChange"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog
      :visible.sync="dialogVisible"
      title="图片预览"
      :close-on-click-modal="false"
    >
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import cos from '@/utils/cos'
export default {
  props: {
    limit: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: []
    }
  },
  computed: {
    isAllUploadSuccess() {
      return this.fileList.every(item => item.status === 'success')
    }
  },
  methods: {
    httpRequest({ file }) {
      // console.log(file)
      const curFile = this.fileList.find(item => item.uid === file.uid)
      curFile.status = 'uploading'
      cos.uploadFile({
        Bucket: 'hrsass-154-1300011331', /* 填写自己的 bucket(存储桶的名字)，必须字段 */
        Region: 'ap-beijing', /* 存储桶所在地域，必须字段 */
        Key: +new Date() + file.name, /* 文件名 */
        Body: file, // 上传文件对象
        SliceSize: 1024 * 1024 * 5, /* 触发分块上传的阈值，超过5MB使用分块上传，小于5MB使用简单上传。可自行设置，非必须 */
        onProgress: function(progressData) {
          // 上传的进度
          // console.log(JSON.stringify(progressData))
          curFile.percentage = progressData.percent * 100
        }
      }, (err, data) => {
        // 上传之后的结果
        // err上传失败
        // data 上传成功
        if (err) {
          this.$message.error('上传失败，请稍后再试')
        } else {
          // 延迟的目的 让进度条明显一点
          setTimeout(() => {
            curFile.status = 'success'
          }, 500)
          // '//' 会默认跟你网站的协议保持统一
          curFile.url = '//' + data.Location
        }
      })
    },
    /**
     * 上传之前执行
     * file 上传的那个文件
     */
    beforeUpload(file) {
      // console.log(file)
      const imageType = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/svg+xml', 'image/bmp']
      if (!imageType.includes(file.type)) {
        this.$message.warning('图片格式不正确')
        return false
      }
      if (file.size / 1024 / 1024 > 2) {
        this.$message.warning('图片大小不能大于2M')
        return false
      }
    },
    /**
     * 文件状态改变时的钩子
     * file 上传的文件
     * fileList 页面结构中展示的文件
     */
    onChange(file, fileList) {
      // console.log(file)
      // console.log(fileList)
      // 把上传之后的文件 同步给data中的fileList
      this.fileList = [...fileList]
    },
    /**
     * 超出限制时 会自动执行这个函数
     */
    onExceed() {
      // console.log('超出限制了')
      this.$message.warning('图片已达到最大限制')
    },
    /**
     * 删除时执行
     * file 删除的那个文件
     * fileList 未删除的文件
     */
    handleRemove(file, fileList) {
      // 通过拷贝的方式赋值
      // this.fileList = [...fileList]
      // console.log(file)
      // console.log(this.fileList)
      this.fileList = this.fileList.filter((item) => item.uid !== file.uid)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.disabled {
  ::v-deep {
    .el-upload--picture-card {
      display: none;
    }
  }
}
</style>
