<template>
    <div class="information-new">
      <i-card class="content-card">
        <div class="content-card__header">
          <span>新增基本信息</span>
        </div>
        <div class="edit">
          <div class="edit__fields">
            <i-form label-position="top" :model="information" :rules="rules" ref="form">
              <i-row :gutter="20">
                <i-col :span="8">
                  <i-form-item label="公司名称" class="i-form-item__must" prop="company">
                    <i-input clearable v-model="information.company"></i-input>
                  </i-form-item>
                </i-col>
                <i-col :span="8">
                  <i-form-item label="公司电话" class="i-form-item__must" prop="tel">
                    <i-input clearable v-model="information.tel"></i-input>
                  </i-form-item>
                </i-col>
                <i-col :span="8">
                  <i-form-item label="公司地址" class="i-form-item__must" prop="address">
                    <i-input clearable v-model="information.address"></i-input>
                  </i-form-item>
                </i-col>
              </i-row>
              <i-row :gutter="20">
                <i-col :span="8">
                  <i-form-item label="股票代码" prop="shareCode">
                    <i-input clearable v-model="information.shareCode"></i-input>
                  </i-form-item>
                </i-col>
                <i-col :span="8">
                  <i-form-item label="公司传真" prop="fax">
                    <i-input clearable v-model="information.fax"></i-input>
                  </i-form-item>
                </i-col>
                <i-col :span="8">
                  <i-form-item label="公司邮箱" prop="email">
                    <i-input clearable v-model="information.email"></i-input>
                  </i-form-item>
                </i-col>
              </i-row>
            </i-form>
          </div>
          <div class="edit__action footer">
            <i-button type="primary" :loading="loading" @click="handleNew">新 增</i-button>
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
    const checkTel = (rule, value, callback) => {
      let telReg = /0\d{2,3}-\d{7,8}/
      if (!value) {
        return callback(new Error('请填写公司电话'))
      }
      if (!telReg.test(value)) {
        return callback(new Error('公司电话格式有误'))
      } else {
        callback()
      }
    }
    const checkEmail = (rule, value, callback) => {
      let emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
      if (!value) {
        return callback()
      }
      if (!emailReg.test(value)) {
        return callback(new Error('邮箱格式有误'))
      } else {
        callback()
      }
    }
    return {
      information: {
        company: '',
        shareCode: '',
        address: '',
        tel: '',
        fax: '',
        email: ''
      },
      rules: {
        address: [{required: true, message: '请填写公司地址', trigger: 'blur'}],
        company: [{required: true, message: '请填写公司名称', trigger: 'blur'}],
        tel: [{validator: checkTel, trigger: 'blur'}],
        email: [{validator: checkEmail, trigger: 'blur'}]
      },
      loading: false
    }
  },
  methods: {
    handleNew () {
      this.loading = true
      this.$refs['form'].validate(valid => {
        if (valid) {
          axios.post('information', {
            company: this.information.company,
            shareCode: this.information.shareCode,
            address: this.information.address,
            tel: this.information.tel,
            fax: this.information.fax,
            email: this.information.email
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
