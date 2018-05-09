<template>
    <Layout class="main">
      <Header class="main__header">
        <the-header></the-header>
      </Header>
      <Layout>
        <Sider class="main__sider">
          <the-siderbar-menu></the-siderbar-menu>
        </Sider>
        <Layout style="background: #F5F5F5">
          <Content class="main__content">
            <transition mode="out-in">
              <router-view :key="key"></router-view>
            </transition>
          </Content>
          <Footer class="main__footer">Copyright &copy; 2017-2027 国科政信</Footer>
        </Layout>
      </Layout>
    </Layout>
</template>

<script>
import {components as commomComponents} from './common'
export default {
  data () {
    return {
      msg: 'hello VueJS'
    }
  },
  components: {
    'the-siderbar-menu': commomComponents.TheSiderbarMenu,
    'the-header': commomComponents.TheHeader
  },
  computed: {
    key () {
      return this.$route.name !== undefined ? this.$route.name + new Date() : this.$route + new Date()
    }
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
</style>
