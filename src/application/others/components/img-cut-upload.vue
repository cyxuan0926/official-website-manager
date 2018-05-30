<template>
    <div class="img-cut-upload">
      <i-card class="content-card">
          <div class="content-card__header">
            <span>图片裁剪上传</span>
          </div>
          <div class="edit">
            <div class="edit__fields">
              <i-form>
                <i-row :gutter="20">
                  <i-col :span="12" :offset="6">
                    <i-form-item label="图片裁剪">
                      <i-input type="text"></i-input>
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
