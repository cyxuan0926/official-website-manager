<template>
    <div class="introduction-new">
      <i-card class="content-card">
        <div class="content-card__header">
          <span>新增简介</span>
        </div>
        <div class="edit">
          <div class="edit__fields">
            <i-form label-position="top" :model="introduction" :rules="rules" ref="form">
              <i-row :gutter="20">
                <i-col :span="12" :offset="6">
                  <i-form-item label="公司简介标题" class="i-form-item__must" prop="title">
                    <i-input clearable v-model="introduction.title"></i-input>
                  </i-form-item>
                </i-col>
              </i-row>
              <i-row :gutter="20">
                <i-col :span="12" :offset="6">
                  <i-form-item label="公司简介内容" class="i-form-item__must" prop="content">
                    <i-input clearable :rows="5" type="textarea" v-model="introduction.content"></i-input>
                  </i-form-item>
                </i-col>
              </i-row>
              <i-row :gutter="20">
                <i-col :span="12" :offset="6">
                  <i-form-item label="公司简介图片" class="i-form-item__must" prop="images">
                    <i-input v-model="introduction.images.length" v-show="false"></i-input>
                    <div class="demo-upload-list" v-for="(item, index) in uploadList" :key="index" >
                      <template v-if="item.status === 'finished'">
                        <img :src="item.url">
                        <div class="demo-upload-list-cover">
                          <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                          <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                        </div>
                      </template>
                      <template v-else>
                        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                      </template>
                    </div>
                    <i-upload
                      ref="upload"
                      :show-upload-list="false"
                      :on-success="handleSuccess"
                      :format="['jpg','jpeg','png']"
                      :before-upload="handleBeforeUpload"
                      multiple
                      :with-credentials="true"
                      type="drag"
                      action="http://39.104.114.135:7002/upload"
                      style="display: inline-block;width:113px" v-show="uploadList.length !== 3"
                      :class="uploadList.length===0? '' : 'ivu-upload__img'">
                      <div style="width: 113px;height:113px;line-height: 113px;" >
                        <i-icon type="camera" size="30"></i-icon>
                      </div>
                    </i-upload>
                    <i-modal title="View Image" v-model="visible">
                      <div slot="footer">
                        <Button type="primary" :size="'large'" @click="closeImgView">确定</Button>
                      </div>
                      <img :src="imgUrl" v-if="visible" style="width: 100%">
                    </i-modal>
                  </i-form-item>
                </i-col>
              </i-row>
            </i-form>
          </div>
          <div class="edit__action footer">
            <i-button type="primary" @click="handleNew" :loading="loading">新 增</i-button>
            <i-button @click="handleCancel">取 消</i-button>
          </div>
        </div>
      </i-card>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    const checkImages = (rule, value, callback) => {
      if (value.length === 0) {
        return callback(new Error('请至少上传一张图片'))
      } else {
        callback()
      }
    }
    return {
      uploadList: [],
      imgUrl: '',
      visible: false,
      introduction: {
        title: '',
        content: '',
        images: []
        // imgCopy: []
      },
      rules: {
        title: [{required: true, message: '请填写公司简介标题', trigger: 'blur'}],
        content: [{required: true, message: '请填写公司简介内容', trigger: 'blur'}],
        images: [{validator: checkImages, trigger: 'change'}]
      },
      loading: false
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
    handleView (url) {
      this.imgUrl = url
      this.visible = true
    },
    handleRemove (file) {
      this.$Modal.confirm({
        title: '提示',
        content: '<p style="font-size: 14px">此操作将会删除该图片，是否继续？</p>',
        closable: true,
        onOk: () => {
          const fileList = this.$refs.upload.fileList
          this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
          this.introduction.images.splice(fileList.indexOf(file), 1)
        },
        onCancel: () => {
        }
      })
      // this.introduction.imgCopy.splice(fileList.indexOf(file.url), 1)
    },
    handleSuccess (res, file) {
      if (res.code === 200) {
        file.url = res.data.path
        file.name = res.data.filename
        this.$Message.success({
          content: res.msg,
          duration: 5,
          closable: true
        })
        this.introduction.images.push(res.data)
        // this.introduction.imgCopy.push(res.data.path)
      } else {
        this.$Message.error({
          content: res.msg,
          duration: 5,
          closable: true
        })
      }
    },
    handleCancel () {
      let n = this.uploadList.length
      this.$refs['form'].resetFields()
      for (let i = 0; i < n; i++) {
        this.$refs.upload.fileList.splice(this.introduction.images[i], 1)
      }
      this.introduction.images = []
    },
    handleNew () {
      this.loading = true
      let n = this.uploadList.length
      this.$refs['form'].validate(valid => {
        if (valid) {
          console.log(this.introduction.images)
          let imgUrls = []
          for (let index in this.introduction.images) {
            imgUrls.push(this.introduction.images[index].path)
          }
          axios.post('introduction', {
            title: this.introduction.title,
            content: this.introduction.content,
            images: imgUrls.join()
          }).then(response => {
            this.loading = false
            if (response.data.code === 200) {
              this.$Message.success({
                content: response.data.msg,
                duration: 5,
                closable: true
              })
              this.$refs['form'].resetFields()
              for (let i = 0; i < n; i++) {
                this.$refs.upload.fileList.splice(this.introduction.images[i], 1)
              }
              this.introduction.images = []
            } else {
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
    closeImgView () {
      this.visible = false
      this.$refs.upload.value = null
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.demo-upload-list
  margin-left 0px !important
  & + &
    margin-left 12.86% !important
.ivu-upload__img
  margin-left 13%
</style>
