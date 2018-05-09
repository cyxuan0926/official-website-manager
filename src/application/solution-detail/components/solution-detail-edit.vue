<template>
    <div class="solution-detail-edit">
      <i-card class="content-card">
        <div class="content-card__header">
          <span>修改解决方案详情</span>
        </div>
        <div class="edit">
          <div class="edit__fields">
            <i-form label-position="top">
              <i-row :gutter="20">
                <i-col :span="12">
                  <i-form-item label="解决方案" class="i-form-item__must">
                    <i-input disabled></i-input>
                  </i-form-item>
                </i-col>
                <i-col :span="12">
                  <i-form-item label="软件名称 " class="i-form-item__must">
                    <i-input clearable ></i-input>
                  </i-form-item>
                </i-col>
              </i-row>
              <i-row :gutter="20">
                <i-col :span="12">
                  <i-form-item label="软件介绍" class="i-form-item__must">
                    <i-input clearable type="textarea" :rows="5"></i-input>
                  </i-form-item>
                </i-col>
                <i-col :span="12">
                  <i-form-item label="组成部分和应用领域">
                    <i-input clearable type="textarea" :rows="5"></i-input>
                  </i-form-item>
                </i-col>
              </i-row>
              <i-row :gutter="20">
                <i-col :span="12">
                  <i-form-item label="技术特点">
                    <i-input clearable type="textarea" :rows="5"></i-input>
                  </i-form-item>
                </i-col>
              </i-row>
            </i-form>
          </div>
          <div class="edit__action footer">
            <i-button type="primary">确 认</i-button>
            <i-button @click="handleBack">返 回</i-button>
          </div>
        </div>
      </i-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    handleBack () {
      this.$router.push({path: '/main/solution-detail/list'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
