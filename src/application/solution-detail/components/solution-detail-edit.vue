<template>
    <div class="solution-detail-edit">
      <i-card class="content-card">
        <div class="content-card__header">
          <span>修改解决方案详情</span>
        </div>
        <div class="edit">
          <div class="edit__fields">
            <i-form label-position="top" :model="solutionDetail" :rules="rules" ref="form">
              <i-row :gutter="20">
                <i-col :span="12">
                  <i-form-item label="解决方案" class="i-form-item__must" prop="solutionId">
                    <i-input disabled v-model="solutionDetail.solutionId.title"></i-input>
                  </i-form-item>
                </i-col>
                <i-col :span="12">
                  <i-form-item label="软件名称 " class="i-form-item__must" prop="name">
                    <i-input clearable v-model="solutionDetail.name"></i-input>
                  </i-form-item>
                </i-col>
              </i-row>
              <i-row :gutter="20">
                <i-col :span="12">
                  <i-form-item label="软件介绍" class="i-form-item__must" prop="introduction">
                    <i-input clearable type="textarea" :rows="5" v-model="solutionDetail.introduction"></i-input>
                  </i-form-item>
                </i-col>
                <i-col :span="12">
                  <i-form-item label="组成部分和应用领域" prop="constitute">
                    <i-input clearable type="textarea" :rows="5" v-model="solutionDetail.constitute"></i-input>
                  </i-form-item>
                </i-col>
              </i-row>
              <i-row :gutter="20" v-for="item of solutionDetail.technology.length" :key="item">
                <i-col :span="12">
                  <i-form-item :label="item===1 ? '技术特点' : '' " prop="technology">
                    <i-input clearable  v-model="solutionDetail.technology[item-1]"></i-input>
                  </i-form-item>
                </i-col>
                <i-col :span="1" style="margin-top: 28px" v-show="item === 1">
                  <span @click="handleAdd">
                      <i-icon type="plus-circled" size="22" ></i-icon>
                    </span>
                </i-col>
                <i-col :span="6" :class="item===1 ? 'first-minus__col' : 'other-minus__col'" v-show="item !== 1">
                  <span @click="handleMinus(item)">
                      <i-icon type="minus-circled" size="22"></i-icon>
                    </span>
                </i-col>
              </i-row>
            </i-form>
          </div>
          <div class="edit__action footer">
            <i-button type="primary" :loading="loading" @click="handleEdit">确 认</i-button>
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
      solutionDetail: {
        name: '',
        introduction: '',
        constitute: '',
        solutionId: '',
        technology: ['']
      },
      rules: {
        name: [{required: true, message: '请填写软件名称', trigger: 'blur'}],
        introduction: [{required: true, message: '请填写软件介绍 ', trigger: 'blur'}]
      },
      loading: false
    }
  },
  methods: {
    handleBack () {
      this.$router.push({path: '/main/solution-detail/list'})
    },
    handleEdit () {
      this.loading = true
      let id = this.$route.params.id
      this.$refs['form'].validate(valid => {
        if (valid) {
          axios.put(`solution-detail/${id}`, {
            name: this.solutionDetail.name,
            introduction: this.solutionDetail.introduction,
            constitute: this.solutionDetail.constitute,
            technology: this.solutionDetail.technology.join(),
            solutionId: this.solutionDetail.solutionId._id
          }).then(response => {
            this.loading = false
            if (response.data.code === 200) {
              this.$refs['form'].resetFields()
              this.solutionDetail.technology = ['']
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
    handleAdd () {
      this.solutionDetail.technology.push('')
    },
    handleMinus (index) {
      this.solutionDetail.technology.splice(index - 1, 1)
    }
  },
  mounted () {
    let id = this.$route.params.id
    axios.get(`solution-detail/${id}`).then(response => {
      if (response.data.code === 200) {
        Object.assign(this.solutionDetail, response.data.data)
      }
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
