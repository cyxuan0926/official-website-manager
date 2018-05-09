<template>
    <div class="solution-detail-new">
      <i-card class="content-card">
        <div class="content-card__header">
          <span>新增解决方案详情</span>
        </div>
        <div class="edit">
          <div class="edit__fields">
            <i-form label-position="top" :model="solutionDetail" :rules="rules" ref="form">
              <i-row :gutter="20">
                <i-col :span="12">
                  <i-form-item label="解决方案" class="i-form-item__must" prop="solutionId">
                    <i-select clearable v-model="solutionDetail.solutionId">
                      <i-option v-for="(item, index) of solutionList" :key="index" :value="item._id" :label="item.title"></i-option>
                    </i-select>
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
                  <i-form-item label="组成部分和应用领域" prop="technology">
                    <i-input clearable type="textarea" :rows="5" v-model="solutionDetail.constitute"></i-input>
                  </i-form-item>
                </i-col>
              </i-row>
              <i-row :gutter="20" v-for="item of number" :key="item">
                <i-col :span="12">
                  <i-form-item :label="item===1 ? '技术特点' : '' " prop="constitute">
                    <i-input clearable  v-model="solutionDetail.technology[item]"></i-input>
                  </i-form-item>
                </i-col>
                <i-col :span="1" style="margin-top: 28px" v-show="item === 1">
                  <span @click="handleAdd">
                      <i-icon type="plus-circled" size="22" ></i-icon>
                    </span>
                </i-col>
                <i-col :span="6" :class="item===1 ? 'first-minus__col' : 'other-minus__col'" v-show="item !== 1">
                  <span @click="handleMinus">
                      <i-icon type="minus-circled" size="22"></i-icon>
                    </span>
                </i-col>
              </i-row>
            </i-form>
          </div>
          <div class="edit__action footer">
            <i-button type="primary">新 增</i-button>
            <i-button >取 消</i-button>
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
        technology: [],
        solutionId: ''
      },
      rules: {
        name: [{required: true, message: '请填写软件名称', trigger: 'blur'}],
        introduction: [{required: true, message: '请填写软件介绍 ', trigger: 'blur'}],
        solutionId: [{required: true, message: '请选择解决方案 ', trigger: 'change'}]
      },
      solutionList: [],
      number: 1
    }
  },
  mounted () {
    axios.get('solution/list').then(response => {
      if (response.data.code === 200) {
        for (let val of response.data.data) {
          for (let index in val) {
            this.solutionList.push(val[index])
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
        console.log(newVal, oldVal)
      },
      deep: true
    }
  },
  methods: {
    handleAdd () {
      this.number++
    },
    handleMinus () {
      if (this.number === 1) {
        return true
      } else {
        this.number--
      }
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
