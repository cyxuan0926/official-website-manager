<template>
  <div>
    <div :id="tinymceId"></div>
    <tinymce-image
      ref="uploadImage"
      style="visibility: hidden; height: 0; width: 0; overflow: hidden;"
      @success="onImageSuccess" />
    <tinymce-video
      ref="uploadVideo"
      style="visibility: hidden; height: 0; width: 0; overflow: hidden;"
      @success="onVideoSuccess" />
    <!--<tinymce-audio-->
      <!--ref="uploadAudio"-->
      <!--style="visibility: hidden; height: 0; width: 0; overflow: hidden;"-->
      <!--@success="onAudioSuccess" />-->
  </div>
</template>

<script>
import tinymceImage from './gkEditor/gkImage'
import tinymceVideo from './gkEditor/gkVideo'
// import tinymceAudio from './tinymce/tinymceAudio'
//, tinymceAudio
export default {
  components: { tinymceImage, tinymceVideo },
  props: {
    value: {
      type: String,
      default: ''
    },
    tools: {
      type: String,
      default: 'onlyImage'
    }
  },
  data () {
    return {
      // hasChanged: false,
      hasInit: false,
      tinymceId: this.id || `vue-tinymce-${+new Date()}`
    }
  },
  watch: {
    value (val) {
      this.$nextTick(() => window.tinymce.get(this.tinymceId).setContent(val))
    }
  },
  // https://blog.csdn.net/accp_fangjian/article/details/38296557
  mounted () {
    window.tinymce.init({
      selector: `#${this.tinymceId}`,
      language: 'zh_CN',
      menubar: '',
      height: 300,
      resize: false,
      branding: false,
      content_style: 'blockquote{padding: 10px 20px; margin: 0 0 20px; font-size: initial; border-left: 5px solid #eee;} p{ margin: 0; line-height: 1.42857143; }.mce-panel{ box-sizing: border-box; }',
      plugins: 'anchor charmap codesample textcolor colorpicker contextmenu directionality emoticons media hr image insertdatetime link lists advlist table preview searchreplace table',
      toolbar: 'formatselect fontsizeselect | bold italic blockquote underline strikethrough forecolor backcolor | hr subscript superscript | numlist bullist | alignleft aligncenter alignright alignjustify alignnone | outdent indent table | charmap codesample emoticons insertdatetime | link imageUpload videoUpload | removeformat searchreplace undo redo | preview',
      init_instance_callback: editor => { //  media
        this.hasInit = true
        if (this.value) {
          editor.setContent(this.value)
        }
        editor.on('NodeChange Change KeyUp', () => {
          // this.hasChanged = true
          this.$emit('editorChange', editor.getContent({ format: 'row' }), editor.getContent({ format: 'text' }).substr(0, 500), editor.getContent({ format: 'html' }).replace(/\s*(&nbsp;)*/g, '').replace(/\n/g, '').replace(/<p><\/p>/g, ''))
        })
      },
      setup: editor => {
        editor.addButton('imageUpload', {
          icon: 'image',
          tooltip: '选择图片',
          onclick: () => {
            this.$refs.uploadImage.$refs.uploadImg.$refs.input.click()
          }
        })
        if (this.tools === 'onlyImage') return
        editor.addButton('videoUpload', {
          icon: 'media',
          tooltip: '插入视频(支持格式:mp4/webm/ogg)',
          onclick: () => {
            this.$refs.uploadVideo.$refs.uploadVideo.$refs.input.click()
          }
        })
        // editor.addButton('audioUpload', {
        //   icon: 'i iconfont icon-yinpin',
        //   tooltip: '插入音频',
        //   onclick: (data) => {
        //     this.$refs.uploadAudio.$refs.uploadAudio.$refs['upload-inner'].$refs.input.click()
        //   }
        // })
      }
    })
  },
  destroyed () {
    window.tinymce.get(this.tinymceId).destroy()
  },
  methods: {
    onImageSuccess (e) {
      if (!e) return
      window.tinymce.get(this.tinymceId).insertContent(`<img class='wscnph' src='${e}?token=${this.$refs.uploadImage.headers.Authorization}' style="max-width: 100%;">`)
    },
    onVideoSuccess (e) {
      if (!e) return
      let htmlString = `<video controls poster="/static/images/video-cover.png" style="max-width: 100%;">
        <source
          src='${e}'
          type='video/mp4'>
        <source
          src='${e}'
          type='video/webm'>
        <source
          src='${e}'
          type='video/ogg'>您的浏览器不支持Video标签。
      </video>`
      window.tinymce.get(this.tinymceId).insertContent(htmlString)
    }
    // onAudioSuccess (e) {
    //   if (!e) return
    //   let htmlString = `<audio controls">
    //     <source
    //       src='${e}'
    //       type='audio/mpeg'>
    //     <source
    //       src='${e}'
    //       type='audio/ogg'>您的浏览器不支持Audio标签。
    //   </audio>`
    //   window.tinymce.get(this.tinymceId).insertContent(htmlString)
    // }
  }
}
</script>

<style scoped>
</style>
