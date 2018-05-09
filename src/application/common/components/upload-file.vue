<template>
  <div>
    <div class="demo-upload-list" v-for="(item, index) in uploadList" :key="index" >
      <template v-if="item.status === 'finished'">
        <img :src="item.url">
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
        </div>
      </template>
      <template v-else>
        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
      </template>
    </div>
    <Upload
      ref="upload"
      :show-upload-list="false"
      :on-success="handleSuccess"
      :format="['jpg','jpeg','png']"
      :max-size="2048"
      :before-upload="handleBeforeUpload"
      multiple
      :with-credentials="true"
      type="drag"
      action="http://10.10.10.31:7001/upload"
      style="display: inline-block;width:113px;margin-left: 120px" v-show="uploadList.length==0">
      <div style="width: 113px;height:113px;line-height: 113px;">
        <Icon type="camera" size="30"></Icon>
      </div>
    </Upload>
    <Modal title="View Image" v-model="visible">
      <img :src="uploadList[0].url" v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>
<script>
// 我现在的操作是父组件点击取消的时候 要把子组件里面的值情况
export default {
  data () {
    return {
      imgName: '',
      visible: false,
      uploadList: []
    }
  },
  methods: {
    handleView (name) {
      this.imgName = name
      this.visible = true
    },
    handleRemove (file) {
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
      this.$emit('getImgUrl', '')
    },
    handleSuccess (res, file) {
      console.log(res)
      if (res.code === 200) {
        file.url = res.data.path
        file.name = res.data.filename
      }
      console.log(this.uploadList)
      this.$emit('getImgUrl', res.data.path)
    },
    // handleFormatError (file) {
    //   this.$Notice.warning({
    //     title: 'The file format is incorrect',
    //     desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
    //   })
    // },
    // handleMaxSize (file) {
    //   this.$Notice.warning({
    //     title: 'Exceeding file size limit',
    //     desc: 'File  ' + file.name + ' is too large, no more than 2M.'
    //   })
    // },
    handleBeforeUpload () {
      const check = this.uploadList.length < 1
      if (!check) {
        this.$Notice.warning({
          title: '一次性只能上次一张图片'
        })
      }
      return check
    }
  },
  mounted () {
    this.uploadList = this.$refs.upload.fileList
  }
}
</script>
<style scoped>
</style>
