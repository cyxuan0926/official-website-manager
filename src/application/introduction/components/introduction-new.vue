<template>
    <div class="introduction-new">
      <i-card class="content-card">
        <div class="content-card__header">
          <span>新增简介</span>
        </div>
        <div class="edit">
          <div class="edit__fields">
            <i-form label-position="top">
              <i-row :gutter="20">
                <i-col :span="12" :offset="6">
                  <i-form-item label="公司简介标题" class="i-form-item__must">
                    <i-input clearable></i-input>
                  </i-form-item>
                </i-col>
              </i-row>
              <i-row :gutter="20">
                <i-col :span="12" :offset="6">
                  <i-form-item label="公司简介内容" class="i-form-item__must">
                    <i-input clearable :rows="5" type="textarea"></i-input>
                  </i-form-item>
                </i-col>
              </i-row>
              <i-row :gutter="20">
                <i-col :span="12" :offset="6">
                  <i-form-item label="公司简介图片" class="i-form-item__must" >
                    <i-input  v-show="false"></i-input>
                    <div class="demo-upload-list" v-for="(item, index) in uploadList" :key="index" >
                      <template v-if="item.status === 'finished'">
                        <img >
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
                      style="display: inline-block;width:113px;margin-left: 120px" >
                      <div style="width: 113px;height:113px;line-height: 113px;">
                        <Icon type="camera" size="30"></Icon>
                      </div>
                    </Upload>
                    <Modal title="View Image" v-model="visible">
                      <img :src="uploadList[0].url" v-if="visible" style="width: 100%">
                    </Modal>
                  </i-form-item>
                </i-col>
              </i-row>
            </i-form>
          </div>
        </div>
      </i-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      uploadList: [],
      imgName: '',
      visible: false
    }
  },
  mounted () {
    this.uploadList = this.$refs.upload.fileList
  },
  methods: {
    handleBeforeUpload () {
      const check = this.uploadList.length < 3
      if (!check) {
        this.$Notice.warning({
          title: '最多能上次三张图片'
        })
      }
      return check
    },
    handleView (name) {
      this.imgName = name
      this.visible = true
    },
    handleRemove (file) {
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
    },
    handleSuccess (res, file) {
      console.log(res)
      if (res.code === 200) {
        file.url = res.data.path
        file.name = res.data.filename
        this.$Message.success({
          content: res.msg,
          duration: 5,
          closable: true
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.ivu-upload
  margin-left 0px !important
.demo-upload-list
  margin-left 0px !important
</style>
