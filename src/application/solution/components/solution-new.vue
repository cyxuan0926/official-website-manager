<template>
    <div class="solution-new">
      <i-card class="content-card">
        <div class="content-card__header">
          <span>新增解决方案</span>
        </div>
        <div class="edit">
          <div class="edit__fields">
            <i-form label-position="top">
              <i-row :gutter="20">
                <i-col :span="12">
                  <i-form-item label="解决方案标题" class="i-form-item__must">
                    <i-input clearable></i-input>
                  </i-form-item>
                </i-col>
                <i-col :span="12">
                  <i-form-item label="解决方案地址" class="i-form-item__must">
                    <i-input clearable></i-input>
                  </i-form-item>
                </i-col>
              </i-row>
              <i-row :gutter="20">
                <i-col :span="12">
                  <i-form-item label="解决方案图片路径" class="i-form-item__must">
                    <i-input clearable v-show="false"></i-input>
                    <upload-file></upload-file>
                  </i-form-item>
                </i-col>
                <i-col :span="12">
                  <i-form-item label="解决方案描述" class="i-form-item__must">
                    <i-input clearable type="textarea" :rows="5"></i-input>
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
import {components} from '../../common'
export default {
  data () {
    return {
    }
  },
  components: {
    'upload-file': components.UploadFile
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
