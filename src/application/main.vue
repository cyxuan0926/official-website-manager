<template>
    <Layout class="main">
      <Header class="main__header">
        <the-header></the-header>
      </Header>
      <Layout>
        <Sider class="main__sider" collapsible v-model="Collapsed" hide-trigger ref="sider" :collapsed-width="66" >
          <the-siderbar-menu ></the-siderbar-menu>
        </Sider>
        <Layout style="background: #F5F5F5">
          <Content class="main__content">
            <transition mode="out-in" name="main-router">
              <router-view :key="key"></router-view>
            </transition>
          </Content>
          <Footer class="main__footer">Copyright &copy; 2017-2027 国科政信</Footer>
        </Layout>
      </Layout>
    </Layout>
</template>

<script>
import Bus from '@/plugin/bus.js'
import {components as commomComponents} from './common'
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      Collapsed: false
    }
  },
  components: {
    'the-siderbar-menu': commomComponents.TheSiderbarMenu,
    'the-header': commomComponents.TheHeader
  },
  computed: {
    key () {
      return this.$route.name !== undefined ? this.$route.name + new Date() : this.$route + new Date()
    },
    isMain () {
      if (this.$route.path === '/main' || this.$route.path === '/main/') {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    let self = this
    Bus.$on('siderClick', () => {
      self.$refs.sider.toggleCollapse()
      this.setCollapsed(this.Collapsed)
    })
  },
  methods: {
    ...mapMutations(['setCollapsed'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.main
  height 100%
  &__header
    height 47px
    line-height 47px
    padding-left 20px
    background #37474f
    &__title
      font-size 16px
      color #fff
      border-bottom 1px solid #4b5960
  &__sider
    background #263238
  &__content
    margin 2% 20px 0px
    border 1px solid #ddd
    border-radius 2px
    background #fff
  &__footer
    background #F5F5F5
    color #a3a6ab
    padding 0px
    font-size 12px
    padding-left 20px
    height 40px
    line-height 40px
.main-router-enter-active
  transition all .8s ease
.main-router-leave-active
  transition all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)
.main-router-enter, .main-router-leave-to
  transform translateX(10px)
  opacity 0
.cropper-content
  display flex
  display -webkit-flex
  justify-content flex-end
  -webkit-justify-content flex-end
.cropper
  width 350px
  height 300px
.show-preview
  flex 1
  -webkit-flex 1
  display flex
  justify-content center
.preview
  overflow hidden
  border 50%
  border 1px solid #ccc
  background #ccc
  margin-left 40px
.upload-btn{
  flex: 1;
  -webkit-flex: 1;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  -webkit-justify-content: center;
}
</style>
