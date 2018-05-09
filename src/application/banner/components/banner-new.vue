<template>
    <div class="banner-new">
      <i-card class="content-card">
        <div class="content-card__header">
          <span>新增标题栏</span>
        </div>
        <div class="edit">
          <div class="edit__fields">
            <i-form label-position="top" :model="banner" :rules="rules" ref="form">
              <i-row :gutter="20">
                <i-col :span="12" >
                  <i-form-item label="标题" prop="title" class="i-form-item__must">
                    <i-input clearable v-model="banner.title"></i-input>
                  </i-form-item>
                </i-col>
                <i-col :span="12">
                  <i-form-item label="标题地址" prop="url" class="i-form-item__must">
                    <i-input clearable v-model="banner.url"></i-input>
                  </i-form-item>
                </i-col>
              </i-row>
              <i-row :gutter="20">
                <i-col :span="12" >
                  <i-form-item label="标题图片" class="i-form-item__must" prop="imgUrl">
                    <i-input  v-model="banner.imgUrl" v-show="false"></i-input>
                    <div class="demo-upload-list" v-for="(item, index) in uploadList" :key="index" v-show="banner.imgUrl">
                      <template v-if="item.status === 'finished'">
                        <img :src="banner.imgUrl">
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
                      style="display: inline-block;width:113px;margin-left: 120px" v-show="!(banner.imgUrl)">
                      <div style="width: 113px;height:113px;line-height: 113px;">
                        <Icon type="camera" size="30"></Icon>
                      </div>
                    </Upload>
                    <Modal title="View Image" v-model="visible">
                      <img :src="uploadList[0].url" v-if="visible" style="width: 100%">
                    </Modal>
                  </i-form-item>
                </i-col>
                <i-col :span="12">
                  <i-form-item label="标题描述" prop="description">
                    <i-input clearable type="textarea" :rows="5" v-model="banner.description"></i-input>
                  </i-form-item>
                </i-col>
              </i-row>
            </i-form>
          </div>
          <div class="edit__action footer">
            <i-button type="primary" @click="handleNew" :loading="loading">新 增</i-button>
            <i-button  @click="handleCancel">取 消</i-button>
          </div>
        </div>
      </i-card>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      banner: {
        title: '',
        description: '',
        url: '',
        imgUrl: ''
      },
      rules: {
        imgUrl: [{required: true, message: '图片不能为空', trigger: 'change'}],
        title: [{required: true, message: '标题不能为空', trigger: 'blur'}],
        url: [{required: true, message: '标题地址不能为空', trigger: 'blur'}]
      },
      loading: false,
      imgName: '',
      visible: false,
      uploadList: []
    }
  },
  methods: {
    handleNew () {
      this.loading = true
      this.$refs['form'].validate((valid) => {
        if (valid) {
          axios.post('banner', {
            title: this.banner.title,
            description: this.banner.description,
            url: this.banner.url,
            imgUrl: this.banner.imgUrl
          }).then(response => {
            if (response.data.code === 200) {
              this.$refs['form'].resetFields()
              const fileList = this.$refs.upload.fileList
              this.$refs.upload.fileList.splice(fileList.indexOf(this.uploadList[0]), 1)
              this.loading = false
              this.$Message.success({
                content: '新增标题栏成功',
                duration: 5,
                closable: true
              })
            } else {
              this.loading = false
              this.$Message.error({
                content: response.data.msg,
                duration: 5,
                closable: true
              })
            }
          }).catch(err => {
            this.loading = false
            console.log(err)
          })
        } else {
          console.log('bad submit')
          this.loading = false
          return false
        }
      })
    },
    handleCancel () {
      this.$refs['form'].resetFields()
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(this.uploadList[0]), 1)
    },
    handleBeforeUpload () {
      const check = this.uploadList.length < 1
      if (!check) {
        this.$Notice.warning({
          title: '一次性只能上次一张图片'
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
      this.banner.imgUrl = ''
    },
    handleSuccess (res, file) {
      console.log(res)
      if (res.code === 200) {
        file.url = res.data.path
        file.name = res.data.filename
        this.banner.imgUrl = res.data.path
        this.$Message.success({
          content: res.msg,
          duration: 5,
          closable: true
        })
      }
    }
  },
  mounted () {
    this.uploadList = this.$refs.upload.fileList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

</style>
