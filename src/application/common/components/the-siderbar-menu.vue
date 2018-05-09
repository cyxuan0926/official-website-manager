<template>
    <i-menu class="menu" accordion @on-select="handleSelect">
      <i-submenu class="menu__submenu" name="标题栏">
        <template slot="title">
          <i-icon type="ios-paper"></i-icon>
          标题栏
        </template>
        <i-menu-item :name="'/main/banner/new/新增标题栏'">新增标题栏</i-menu-item>
        <i-menu-item :name="'/main/banner/list/标题栏管理'">标题栏管理</i-menu-item>
      </i-submenu>
      <i-submenu class="menu__submenu" name="导航栏">
        <template slot="title">
          <i-icon type="ios-paper"></i-icon>
          导航栏
        </template>
        <i-menu-item :name="'/main/navigation/new/新增导航栏'">新增导航栏</i-menu-item>
        <i-menu-item :name="'/main/navigation/list/导航栏管理'">导航栏管理</i-menu-item>
      </i-submenu>
      <i-submenu class="menu__submenu" name="解决方案">
        <template slot="title">
          <i-icon type="ios-paper"></i-icon>
          解决方案
        </template>
        <i-menu-item :name="'/main/solution/new/新增解决方案'">新增解决方案</i-menu-item>
        <i-menu-item :name="'/main/solution/list/解决方案管理'">解决方案管理</i-menu-item>
      </i-submenu>
      <i-submenu class="menu__submenu" name="解决方案详情">
        <template slot="title">
          <i-icon type="ios-paper"></i-icon>
          解决方案详情
        </template>
        <i-menu-item :name="'/main/solution-detail/new/新增解决方案详情'">新增解决方案详情</i-menu-item>
        <i-menu-item :name="'/main/solution-detail/list/解决方案详情管理'">解决方案详情管理</i-menu-item>
      </i-submenu>
      <i-submenu class="menu__submenu" name="简介">
        <template slot="title">
          <i-icon type="ios-paper"></i-icon>
          简介
        </template>
        <i-menu-item :name="'/main/introduction/new/新增简介'">新增简介</i-menu-item>
        <i-menu-item :name="'/main/introduction/list/简介管理'">简介管理</i-menu-item>
      </i-submenu>
      <i-submenu class="menu__submenu" name="基本信息">
        <template slot="title">
          <i-icon type="ios-paper"></i-icon>
          基本信息
        </template>
        <i-menu-item :name="'/main/information/new/新增基本信息'">新增基本信息</i-menu-item>
        <i-menu-item :name="'/main/information/list/基本信息管理'">基本信息管理</i-menu-item>
      </i-submenu>
    </i-menu>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    handleSelect (name) {
      let argment = name
      let url = argment.substring(0, argment.lastIndexOf('/'))
      // let breadcrumbName = argment.substring(argment.lastIndexOf('/') + 1)
      this.$router.push({path: url})
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.menu
  width 200.8px !important
  &__submenu
    color #fff
    font-size 12px
</style>
