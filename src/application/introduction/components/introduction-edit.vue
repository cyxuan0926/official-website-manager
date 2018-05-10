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
                  <i-form-item label="公司简介标题" class="i-form-item__must">
                    <i-input clearable></i-input>
                  </i-form-item>
                </i-col>
              </i-row>
              <i-row :gutter="20">
                <i-col :span="12" :offset="6">
                  <i-form-item label="公司简介内容" class="i-form-item__must">
                    <i-input clearable :rows="5" type="textarea"></i-input>
                  </i-form-item>
                </i-col>
              </i-row>
              <i-row :gutter="20">
                <i-col :span="12" :offset="6">
                  <i-form-item label="公司简介图片" class="i-form-item__must">
                    <i-input></i-input>
                  </i-form-item>
                </i-col>
              </i-row>
            </i-form>
          </div>
          <div class="edit__action footer">
            <i-button type="primary">确 认</i-button>
            <i-button>返 回</i-button>
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
