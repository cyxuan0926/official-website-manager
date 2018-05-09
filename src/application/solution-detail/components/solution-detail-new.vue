<template>
    <div class="solution-detail-new">
      <i-card class="content-card">
        <div class="content-card__header">
          <span>新增解决方案详情</span>
        </div>
        <div class="edit">
          <div class="edit__fields">
            <i-form label-position="top">
              <i-row :gutter="20">
                <i-col :span="12">
                  <i-form-item label="解决方案" class="i-form-item__must">
                    <i-select clearable>
                      <i-option></i-option>
                    </i-select>
                  </i-form-item>
                </i-col>
                <i-col :span="12">
                  <i-form-item label="组成部分和应用领域" class="i-form-item__must">
                    <i-input clearable></i-input>
                  </i-form-item>
                </i-col>
              </i-row>
              <i-row :gutter="20">
                <i-col :span="12">
                  <i-form-item label="技术特点" class="i-form-item__must">
                    <i-input clearable></i-input>
                  </i-form-item>
                </i-col>
                <i-col :span="12">
                  <i-form-item label="软件介绍" class="i-form-item__must">
                    <i-input clearable></i-input>
                  </i-form-item>
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
