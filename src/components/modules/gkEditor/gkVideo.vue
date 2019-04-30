<template>
  <Upload
    ref="uploadVideo"
    :action="action"
    :headers="headers"
    :name="name"
    :before-upload="beforUpload"
    :on-success="handleSuccess"
    :on-error="handleError"
    :accept="accept"
    multiple
    :on-exceed="handleExceed"
    :file-list="fileList"
    :on-remove="handleRemove">
    <i class="mce-ico mce-i-media"></i>
  </Upload>

</template>

<script>
export default {
  props: {
    action: {
      type: String,
      default: `http://120.78.190.101:1339/video-server/videos`
    },
    name: {
      type: String,
      default: 'video'
    },
    accept: {
      type: String,
      default: 'video/mp4,video/webm,video/ogg'
    }
  },
  data () {
    return {
      fileList: [],
      headers: {
        Authorization: '523b87c4419da5f9186dbe8aa90f37a3876b95e448fe2a'
      },
      notification: null
    }
  },
  destroyed () {
    if (this.notification) this.$Notice.close('notification')
    this.notification = null
  },
  methods: {
    handleSuccess (res) {
      switch (res.code) {
        case 200:
          this.$Message.success('视频上传成功')
          this.$emit('success', `${res.url}?token=${this.headers.Authorization}`)
          this.$Notice.close('notification')
          this.notification = null
          break
        default:
          this.$Message.error(`上传视频失败:${res.message}`)
      }
    },
    beforUpload (file) {
      let fileType = this.accept.split(',')
      const isAccept = fileType.indexOf(file.type) > -1
      if (!isAccept) {
        let accept = []
        fileType.forEach(type => {
          accept.push(type.substr(type.lastIndexOf('/') + 1))
        })
        this.$Message.error(`请上传${accept.join('或')}格式的文件`)
        return false
      }
      this.$Notice.warning({
        title: '提示',
        desc: '正在上传视频文件，请耐心等待',
        duration: 0,
        name: 'notification'
      })
      this.notification = 'notification'
      return true
    },
    handleExceed () {
      this.$Message.error('视频数量超出限制')
    },
    handleError () {
      this.$Message.error(`上传视频失败`)
      this.$Notice.close('notification')
      this.notification = null
    },
    handleRemove (file, fileList) {
      this.$emit('success', fileList.length ? fileList : '')
    }
  }
}
</script>

<style lang="css">
  .el-upload__tip {
    margin-top: 0;
    line-height: 20px;
  }

  .red {
    color: #f00;
  }
</style>
