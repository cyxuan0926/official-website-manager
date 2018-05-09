<template>
    <div class="information-new">
      <i-card class="content-card">
        <div class="content-card__header">
          <span>新增基本信息</span>
        </div>
        <div class="edit">
          <div class="edit__fields">
            <i-form label-position="top">
              <i-row :gutter="20">
                <i-col :span="8">
                  <i-form-item label="公司名称" class="i-form-item__must">
                    <i-input clearable></i-input>
                  </i-form-item>
                </i-col>
                <i-col :span="8">
                  <i-form-item label="股票代码" >
                    <i-input clearable></i-input>
                  </i-form-item>
                </i-col>
                <i-col :span="8">
                  <i-form-item label="公司地址" class="i-form-item__must">
                    <i-input clearable></i-input>
                  </i-form-item>
                </i-col>
              </i-row>
              <i-row :gutter="20">
                <i-col :span="8">
                  <i-form-item label="公司电话" class="i-form-item__must">
                    <i-input clearable></i-input>
                  </i-form-item>
                </i-col>
                <i-col :span="8">
                  <i-form-item label="公司传真">
                    <i-input clearable></i-input>
                  </i-form-item>
                </i-col>
                <i-col :span="8">
                  <i-form-item label="公司邮箱">
                    <i-input clearable></i-input>
                  </i-form-item>
                </i-col>
              </i-row>
            </i-form>
          </div>
          <div class="edit__action footer">
            <i-button type="primary" >新 增</i-button>
            <i-button >取 消</i-button>
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
