<template>
    <div class="navigation-new">
      <i-card class="content-card">
        <div class="content-card__header">
          <span>新增导航栏</span>
        </div>
        <div class="edit">
          <div class="edit__fields">
            <i-form label-position="top" :model="navigation" :rules="rules" ref="form">
              <i-row :gutter="20">
                <i-col :span="12">
                  <i-form-item label="导航标题" class="i-form-item__must" prop="title">
                    <i-input clearable v-model="navigation.title"></i-input>
                  </i-form-item>
                </i-col>
                <i-col :span="12">
                  <i-form-item label="导航地址" class="i-form-item__must" prop="url">
                    <i-input clearable v-model="navigation.url"></i-input>
                  </i-form-item>
                </i-col>
              </i-row>
            </i-form>
          </div>
          <div class="edit__action footer">
            <i-button type="primary" @click="handleNew" :loading="loading">新 增</i-button>
            <i-button type="default" @click="handleCancel">取 消</i-button>
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
      navigation: {
        title: '',
        url: ''
      },
      rules: {
        title: [{required: true, message: '请填写导航栏标题', trigger: 'blur'}],
        url: [{required: true, message: '请填写导航栏地址', trigger: 'blur'}]
      },
      loading: false
    }
  },
  methods: {
    handleNew () {
      this.loading = true
      this.$refs['form'].validate(valid => {
        if (valid) {
          axios.post('navigation', {
            title: this.navigation.title,
            url: this.navigation.url
          }).then(response => {
            this.loading = false
            if (response.data.code === 200) {
              this.$refs['form'].resetFields()
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
    handleCancel () {
      this.$refs['form'].resetFields()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
