<template>
    <div class="solution-new">
      <i-card class="content-card">
        <div class="content-card__header">
          <span>新增解决方案</span>
        </div>
        <div class="edit">
          <div class="edit__fields">
            <i-form label-position="top" :model="solution" :rules="rules" ref="form">
              <i-row :gutter="20">
                <i-col :span="12">
                  <i-form-item label="解决方案标题" class="i-form-item__must" prop="title">
                    <i-input clearable v-model="solution.title"></i-input>
                  </i-form-item>
                </i-col>
                <i-col :span="12">
                  <i-form-item label="解决方案地址" class="i-form-item__must" prop="url">
                    <i-input clearable v-model="solution.url"></i-input>
                  </i-form-item>
                </i-col>
              </i-row>
              <i-row :gutter="20">
                <i-col :span="12">
                  <i-form-item label="标题图片" class="i-form-item__must" prop="imgUrl">
                    <i-input  v-model="solution.imgUrl" v-show="false"></i-input>
                    <div class="demo-upload-list" v-for="(item, index) in uploadList" :key="index" v-show="solution.imgUrl">
                      <template v-if="item.status === 'finished'">
                        <img :src="solution.imgUrl">
                        <div class="demo-upload-list-cover">
                          <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
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
                      action="http://localhost:7001/upload"
                      style="display: inline-block;width:113px;margin-left: 120px" v-show="!(solution.imgUrl)">
                      <div style="width: 113px;height:113px;line-height: 113px;">
                        <Icon type="camera" size="30"></Icon>
                      </div>
                    </Upload>
                    <Modal title="View Image" v-model="visible">
                      <img :src="imgUrl" v-if="visible" style="width: 100%">
                    </Modal>
                  </i-form-item>
                </i-col>
                <i-col :span="12">
                  <i-form-item label="解决方案描述" prop="description">
                    <i-input clearable type="textarea" :rows="5" v-model="solution.description"></i-input>
                  </i-form-item>
                </i-col>
              </i-row>
            </i-form>
          </div>
          <div class="edit__action footer">
            <i-button type="primary" @click="handlerNew" :loading="loading">新 增</i-button>
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
    return {
      solution: {
        title: '',
        description: '',
        url: '',
        imgUrl: ''
      },
      rules: {
        imgUrl: [{required: true, message: '图片不能为空', trigger: 'change'}],
        title: [{required: true, message: '解决方案标题不能为空', trigger: 'blur'}],
        url: [{required: true, message: '解决方案地址不能为空', trigger: 'blur'}]
      },
      imgUrl: '',
      visible: false,
      uploadList: [],
      loading: false
    }
  },
  methods: {
    handlerNew () {
      this.loading = true
      this.$refs['form'].validate(valid => {
        if (valid) {
          axios.post('solution', {
            title: this.solution.title,
            description: this.solution.description,
            url: this.solution.url,
            imgUrl: this.solution.imgUrl
          }).then(response => {
            this.loading = false
            if (response.data.code === 200) {
              this.$refs['form'].resetFields()
              const fileList = this.$refs.upload.fileList
              this.$refs.upload.fileList.splice(fileList.indexOf(this.uploadList[0]), 1)
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
    handleBeforeUpload () {
      const check = this.uploadList.length < 1
      if (!check) {
        this.$Notice.warning({
          title: '一次性只能上次一张图片'
        })
      }
      return check
    },
    handleView (url) {
      this.imgUrl = url
      this.visible = true
    },
    handleRemove (file) {
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
      this.solution.imgUrl = ''
    },
    handleSuccess (res, file) {
      if (res.code === 200) {
        file.url = res.data.path
        file.name = res.data.filename
        this.solution.imgUrl = res.data.path
        this.$Message.success({
          content: res.msg,
          duration: 5,
          closable: true
        })
      }
    },
    handleCancel () {
      this.$refs['form'].resetFields()
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(this.uploadList[0]), 1)
    }
  },
  mounted () {
    this.uploadList = this.$refs.upload.fileList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
