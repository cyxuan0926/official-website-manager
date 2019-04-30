<template>
    <div class="introduction-edit">
      <i-card class="content-card">
        <div class="content-card__header">
          <span>修改简介</span>
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
                    <i-input v-show="false" v-model="introduction.images.length"></i-input>
                    <div class="demo-upload-list" v-for="(item, index) in introduction.images" :key="index" >
                      <template >
                        <img :src="item">
                        <div class="demo-upload-list-cover">
                          <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                          <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                        </div>
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
                      style="display: inline-block;width:113px" v-show="introduction.images.length !== 3"
                      :class="introduction.images.length===0? '' : 'ivu-upload__img'">
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
            <i-button type="primary" @click="handleEdit" :loading="loading">确 认</i-button>
            <i-button @click="handleBack">返 回</i-button>
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
      introduction: {
        title: '',
        content: '',
        images: []
      },
      rules: {
        title: [{required: true, message: '请填写公司简介标题', trigger: 'blur'}],
        content: [{required: true, message: '请填写公司简介内容', trigger: 'blur'}],
        images: [{validator: checkImages, trigger: 'change'}]
      },
      imgUrl: '',
      visible: false,
      loading: false
    }
  },
  methods: {
    handleBack () {
      this.$router.push({path: '/main/introduction/list'})
    },
    handleBeforeUpload () {
      const check = this.introduction.images.length < 3
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
        this.introduction.images.push(res.data.path)
      } else {
        this.$Message.error({
          content: res.msg,
          duration: 5,
          closable: true
        })
      }
    },
    handleEdit () {
      this.loading = true
      let id = this.$route.params.id
      this.$refs['form'].validate(valid => {
        if (valid) {
          axios.put(`introduction/${id}`, {
            title: this.introduction.title,
            content: this.introduction.content,
            images: this.introduction.images.join()
          }).then(response => {
            this.loading = false
            if (response.data.code === 200) {
              this.$refs['form'].resetFields()
              this.introduction.images = []
              this.$Message.success({
                content: response.data.msg,
                duration: 5,
                closable: true
              })
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
  },
  mounted () {
    let id = this.$route.params.id
    axios.get(`introduction/${id}/edit`).then(response => {
      if (response.data.code === 200) {
        Object.assign(this.introduction, response.data.data)
      }
    }).catch(err => {
      console.log(err)
    })
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
