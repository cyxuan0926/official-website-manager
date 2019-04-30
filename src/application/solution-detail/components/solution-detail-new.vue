<template>
    <div class="solution-detail-new">
      <i-card class="content-card">
        <div class="content-card__header">
          <span>新增解决方案详情</span>
        </div>
        <div class="edit">
          <div class="edit__fields">
            <Form label-position="top" :model="solutionDetail" :rules="rules" ref="form">
              <i-row :gutter="20">
                <i-col :span="12">
                  <FormItem label="解决方案" class="i-form-item__must" prop="solutionId">
                    <Select clearable v-model="solutionDetail.solutionId" placeholder="请选择相应的解决方案">
                      <Option v-for="(item, index) of solutionList" :key="index" :value="item._id.toString()" :label="item.title"></Option>
                    </Select>
                  </FormItem>
                </i-col>
                <i-col :span="12">
                  <FormItem label="软件名称" class="i-form-item__must" prop="name">
                    <i-input clearable v-model="solutionDetail.name"></i-input>
                  </FormItem>
                </i-col>
              </i-row>
              <i-row :gutter="20">
                <i-col :span="12">
                  <FormItem label="软件介绍" class="i-form-item__must" prop="introduction">
                    <m-gk-editor tools="allTools" @editorChange="tinymceChange" :value="forValue" ref="mEditor"></m-gk-editor>
                    <i-input clearable type="textarea" :rows="5" v-model="solutionDetail.introduction" v-show="false"></i-input>
                  </FormItem>
                </i-col>
                <i-col :span="12">
                  <FormItem label="组成部分和应用领域" prop="constitute">
                    <i-input clearable type="textarea" :rows="5" v-model="solutionDetail.constitute" ></i-input>
                  </FormItem>
                </i-col>
              </i-row>
              <i-row :gutter="20" v-for="item of solutionDetail.technology.length" :key="item">
                <i-col :span="12">
                  <FormItem :label="item===1 ? '技术特点' : '' " prop="technology">
                    <i-input clearable  v-model="solutionDetail.technology[item-1]"></i-input>
                  </FormItem>
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
            </Form>
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
    return {
      solutionDetail: {
        name: '',
        introduction: '',
        constitute: '',
        technology: [''],
        solutionId: ''
      },
      rules: {
        name: [{required: true, message: '请填写软件名称', trigger: 'blur'}],
        introduction: [{required: true, message: '请填写软件介绍 ', trigger: 'change'}],
        solutionId: [{required: true, message: '请选择解决方案 ', trigger: 'change'}]
      },
      solutionList: [],
      loading: false,
      forValue: ''
    }
  },
  created () {
    this.forValue = ' '
    axios.get('solutionDetail/NoneDetailList').then(response => {
      if (response.data.code === 200 && response.data.data) {
        for (let val of response.data.data) {
          for (let index in val) {
            if (!val[index].solutionDetailId) {
              this.solutionList.push(val[index])
            }
          }
        }
      }
    }).catch(err => {
      console.log(err)
    })
  },
  watch: {
    'solutionDetail.technology': {
      handler (newVal, oldVal) {
        // console.log(newVal)
      },
      deep: true
    }
  },
  methods: {
    handleAdd () {
      this.solutionDetail.technology.push('')
    },
    handleMinus (index) {
      this.solutionDetail.technology.splice(index - 1, 1)
    },
    handleCancel () {
      this.$refs['form'].resetFields()
      this.solutionDetail.technology = ['']
      window.tinymce.get(this.$refs.mEditor.tinymceId).setContent(' ')
    },
    handleNew () {
      this.loading = true
      this.$refs['form'].validate(valid => {
        if (valid) {
          let tempIntro = this.solutionDetail.solutionId
          this.loading = false
          axios.post('solution-detail', {
            name: this.solutionDetail.name,
            introduction: this.solutionDetail.introduction,
            constitute: this.solutionDetail.constitute,
            technology: this.solutionDetail.technology.join(),
            solutionId: parseInt(this.solutionDetail.solutionId)
          }).then(response => {
            this.loading = false
            if (response.data.code === 200) {
              this.$refs['form'].resetFields()
              this.solutionDetail.technology = ['']
              this.forValue = ''
              for (let index in this.solutionList) {
                if (this.solutionList[index]._id === tempIntro) {
                  this.solutionList.splice(index, 1)
                  break
                }
              }
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
    tinymceChange (contents) {
      this.solutionDetail.introduction = contents
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.first-minus__col
  margin-top 28px
  padding-left 0px
.other-minus__col
  margin-top 6px
</style>
