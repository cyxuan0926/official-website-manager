<template>
    <div class="navigation-edit">
      <i-card class="content-card">
        <div class="content-card__header">
          <span>修改导航栏</span>
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
    return {
      navigation: {
        title: '',
        url: ''
      },
      rules: {
        title: [{required: true, message: '请填写导航标题', trigger: 'blur'}],
        url: [{required: true, message: '请填写导航地址', trigger: 'blur'}]
      },
      loading: false
    }
  },
  mounted () {
    let id = this.$route.params.id
    axios.get(`navigation/${id}/edit`).then(response => {
      if (response.data.code === 200) {
        Object.assign(this.navigation, response.data.data)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    handleBack () {
      this.$router.push({path: '/main/navigation/list'})
    },
    handleEdit () {
      this.loading = true
      let id = this.$route.params.id
      this.$refs['form'].validate(valid => {
        if (valid) {
          axios.put(`navigation/${id}`, {
            title: this.navigation.title,
            url: this.navigation.url
          }).then(response => {
            // console.log(response.data)
            if (response.data.code === 200) {
              this.$refs['form'].resetFields()
              this.loading = false
              this.$Message.success({
                content: response.data.msg,
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
