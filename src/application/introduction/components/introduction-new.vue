<template>
    <div class="introduction-new">
      <i-card class="content-card">
        <div class="content-card__header">
          <span>新增简介</span>
        </div>
        <div class="edit">
          <div class="edit__fields">
            <i-form label-position="top">
              <i-row :gutter="20">
                <i-col :span="12">
                  <i-form-item label="公司简介标题" class="i-form-item__must">
                    <i-input clearable></i-input>
                  </i-form-item>
                </i-col>
                <i-col :span="12">
                  <i-form-item label="公司简介内容" class="i-form-item__must">
                    <i-input clearable type="textarea" :rows="5"></i-input>
                  </i-form-item>
                </i-col>
              </i-row>
              <i-row :gutter="20">
                <i-col :span="24">
                  <i-form-item label="公司简介图片" class="i-form-item__must">
                    <i-input clearable ></i-input>
                  </i-form-item>
                </i-col>
              </i-row>
            </i-form>
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
