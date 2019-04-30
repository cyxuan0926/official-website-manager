<template>
  <Upload
    ref="uploadImg"
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
    <i class="mce-ico mce-i-image"></i>
  </Upload>

</template>

<script>
export default {
  props: {
    action: {
      type: String,
      default: `http://120.78.190.101:1339/image-server/avatars`
    },
    name: {
      type: String,
      default: 'avatar'
    },
    accept: {
      type: String,
      default: 'image/jpeg,image/jpg'
    }
  },
  data () {
    return {
      fileList: [],
      headers: {
        Authorization: '523b87c4419da5f9186dbe8aa90f37a3876b95e448fe2a'
      }
    }
  },
  methods: {
    handleSuccess (res) {
      switch (res.code) {
        case 200:
          this.$Message.success('图片上传成功')
          this.$emit('success', res.url)
          break
        default:
          this.$Message.error(`上传图片失败:${res.message}`)
      }
    },
    beforUpload (file) {
      let fileType = this.accept.split(',')
      const isAccept = fileType.indexOf(file.type) > -1
      const isSize = file.size / 1024 / 1024 < 1
      if (!isAccept) {
        let accept = []
        fileType.forEach(type => { accept.push(type.substr(type.lastIndexOf('/') + 1)) })
        this.$Message.error(`请上传${accept.join('或')}格式的文件`)
        return false
      }
      if (!isSize) {
        this.$Message.error('文件大小不能超过1MB!')
        return false
      }
      return true
    },
    handleExceed () {
      this.$Message.error('图片数量超出限制')
    },
    handleError (e) {
      console.log(e)
    },
    handleRemove (file, fileList) {
      this.$emit('success', fileList.length ? fileList : '')
    }
  }
}
</script>

<style lang="css">
.el-upload__tip {
  margin-top: 0px;
  line-height: 20px;
}

.red {
  color: #f00;
}
</style>
