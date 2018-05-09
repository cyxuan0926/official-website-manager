<template>
  <div class="banner-new">
    <i-card class="content-card">
      <div class="content-card__header">
        <span>修改标题栏</span>
      </div>
      <div class="edit">
        <div class="edit__fields">
          <i-form label-position="top" :model="banner" :rules="rules" ref="form">
            <i-row :gutter="20">
              <i-col :span="12">
                <i-form-item label="标题" class="i-form-item__must" prop="title">
                  <i-input clearable v-model="banner.title"></i-input>
                </i-form-item>
              </i-col>
              <i-col :span="12">
                <i-form-item label="标题地址" class="i-form-item__must" prop="url">
                  <i-input clearable v-model="banner.url"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row :gutter="20">
              <i-col :span="12">
                <i-form-item label="标题图片" class="i-form-item__must" prop="imgUrl">
                  <i-input clearable v-model="banner.imgUrl"></i-input>
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
          <i-button type="primary" @click="handleEdit">确 认</i-button>
          <i-button @click="handleBack">返 回</i-button>
        </div>
      </div>
    </i-card>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
export default {
  data () {
    return {
      banner: {
        title: '',
        url: '',
        imgUrl: '',
        description: ''
      },
      rules: {
        imgUrl: [{required: true, message: '图片地址不能为空', trigger: 'change'}],
        title: [{required: true, message: '标题不能为空', trigger: 'blur'}],
        url: [{required: true, message: '标题地址不能为空', trigger: 'blur'}]
      }
    }
  },
  methods: {
    handleBack () {
      this.$router.push({path: '/main/banner/list'})
    },
    handleEdit () {
      let id = this.$route.params.id
      this.$refs['form'].validate((valid) => {
        if (valid) {
          axios.put(`banner/${id}`, {
            title: this.banner.title,
            url: this.banner.url,
            imgUrl: this.banner.imgUrl,
            description: this.banner.description
          }).then(response => {
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
            console.log(err)
          })
        } else {
          console.log('bad submit')
          return false
        }
      })
    }
  },
  mounted () {
    Object.assign(this.banner, this.bannerObj)
  },
  computed: {
    ...mapState({
      bannerObj: state => state.banner.bannerObj
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

</style>
