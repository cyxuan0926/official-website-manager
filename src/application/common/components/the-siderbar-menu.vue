<template>
    <i-menu class="menu" accordion @on-select="handleSelect" width="auto" ref="sider_menu"
            :active-name="activeName" :open-names="openSubmenu" @on-open-change="handleOpen" :class="menuItemClass">
      <i-submenu class="menu__submenu" name="标题栏">
        <template slot="title">
          <i-icon type="ios-paper"></i-icon>
          <span>标题栏</span>
        </template>
        <i-menu-item :name="'/main/banner/new/0-0'" :class="menuItemArr[0][0] ? 'ivu-menu-item-active' : ''">新增标题栏</i-menu-item>
        <i-menu-item :name="'/main/banner/list/0-1'" :class="menuItemArr[0][1] ? 'ivu-menu-item-active' : ''">标题栏管理</i-menu-item>
      </i-submenu>
      <i-submenu class="menu__submenu" name="导航栏" >
        <template slot="title">
          <i-icon type="ios-paper"></i-icon>
          <span>导航栏</span>
        </template>
        <i-menu-item :name="'/main/navigation/new/1-0'" :class="menuItemArr[1][0] ? 'ivu-menu-item-active' : ''">新增导航栏</i-menu-item>
        <i-menu-item :name="'/main/navigation/list/1-1'" :class="menuItemArr[1][1] ? 'ivu-menu-item-active' : ''">导航栏管理</i-menu-item>
      </i-submenu>
      <i-submenu class="menu__submenu" name="解决方案" >
        <template slot="title">
          <i-icon type="ios-paper"></i-icon>
          <span>解决方案</span>
        </template>
        <i-menu-item :name="'/main/solution/new/2-0'" :class="menuItemArr[2][0] ? 'ivu-menu-item-active' : ''">新增解决方案</i-menu-item>
        <i-menu-item :name="'/main/solution/list/2-1'" :class="menuItemArr[2][1] ? 'ivu-menu-item-active' : ''">解决方案管理</i-menu-item>
      </i-submenu>
      <i-submenu class="menu__submenu" name="解决方案详情" >
        <template slot="title">
          <i-icon type="ios-paper"></i-icon>
          <span>解决方案详情</span>
        </template>
        <i-menu-item :name="'/main/solution-detail/new/3-0'" :class="menuItemArr[3][0] ? 'ivu-menu-item-active' : ''">新增解决方案详情</i-menu-item>
        <i-menu-item :name="'/main/solution-detail/list/3-1'" :class="menuItemArr[3][1] ? 'ivu-menu-item-active' : ''">解决方案详情管理</i-menu-item>
      </i-submenu>
      <i-submenu class="menu__submenu" name="简介" >
        <template slot="title">
          <i-icon type="ios-paper"></i-icon>
          <span>简介</span>
        </template>
        <template>
          <i-menu-item :name="'/main/introduction/new/4-0'" :class="menuItemArr[4][0] ? 'ivu-menu-item-active' : ''">新增简介</i-menu-item>
          <i-menu-item :name="'/main/introduction/list/4-1'" :class="menuItemArr[4][1] ? 'ivu-menu-item-active' : ''">简介管理</i-menu-item>
        </template>
      </i-submenu>
      <i-submenu class="menu__submenu" name="基本信息" >
        <template slot="title">
          <i-icon type="ios-paper"></i-icon>
          <span>基本信息</span>
        </template>
        <i-menu-item :name="'/main/information/new/5-0'" :class="menuItemArr[5][0] ? 'ivu-menu-item-active' : ''">新增基本信息</i-menu-item>
        <i-menu-item :name="'/main/information/list/5-1'" :class="menuItemArr[5][1] ? 'ivu-menu-item-active' : ''">基本信息管理</i-menu-item>
      </i-submenu>
      <!--<i-submenu class="menu__submenu" name="其余的模块" >-->
        <!--<template slot="title">-->
          <!--<i-icon type="ios-paper"></i-icon>-->
          <!--<span>其余的模块</span>-->
        <!--</template>-->
        <!--<i-menu-item :name="'/main/others/img-cut-upload/6-0'" :class="menuItemArr[6][0] ? 'ivu-menu-item-active' : ''">图片裁剪上传</i-menu-item>-->
        <!--<i-menu-item :name="'/main/others/echarts-list/6-1'" :class="menuItemArr[6][1] ? 'ivu-menu-item-active' : ''">图表管理</i-menu-item>-->
      <!--</i-submenu>-->
    </i-menu>
</template>

<script>
import Bus from '@/plugin/bus.js'
import {mapState, mapMutations} from 'vuex'
import submenuName from '@/data/submenu-name.json'
// DOMTokenList
export default {
  data () {
    return {
      menuItemArr: []
    }
  },
  methods: {
    ...mapMutations(['setActiveName', 'setOpenMenu']),
    handleSelect (name) {
      let argment = name
      let itemIndex = argment.substring(argment.lastIndexOf('/') + 1)
      let secondIndex = itemIndex.substring(itemIndex.lastIndexOf('-') + 1)
      let firstIndex = itemIndex.substring(0, itemIndex.lastIndexOf('-'))
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 2; j++) {
          this.$set(this.menuItemArr[i], j, false)
        }
      }
      this.$set(this.menuItemArr[firstIndex], secondIndex, true)
      let indexArr = Array.of(firstIndex, secondIndex)
      let url = argment.substring(0, argment.lastIndexOf('/'))
      this.$router.push({path: url})
      let itemName = this.$route.path + '/' + this.$route.name
      this.setActiveName(itemName)
      sessionStorage['menuItemArr'] = JSON.stringify(indexArr)
      sessionStorage['activeName'] = itemName
    },
    handleOpen (name) {
      sessionStorage['openItem'] = name[name.length - 1]
      this.setOpenMenu(name[name.length - 1])
    },
    initMenuItemArr () {
      let arr = []
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 2; j++) {
          arr.push(false)
        }
        this.$set(this.menuItemArr, i, arr)
        arr = []
      }
    }
  },
  computed: {
    ...mapState({
      menuActiveName: state => state.common.activeName,
      menuOpenMenu: state => state.common.openMenu,
      collapsed: state => state.common.isCollapsed
    }),
    openSubmenu: {
      get () {
        !this.$validators.isNull(JSON.parse(sessionStorage['menuItemArr'])) ? this.$set(this.menuItemArr[JSON.parse(sessionStorage['menuItemArr'])[0]], JSON.parse(sessionStorage['menuItemArr'])[1], true) : this.initMenuItemArr()
        if (this.$validators.isNull(this.menuOpenMenu) && !this.$validators.isNull(sessionStorage['openItem'])) {
          let url = this.$route.path === '/main' ? this.$route.path : this.$route.path.substring(0, this.$route.path.lastIndexOf('/'))
          for (let val of submenuName) {
            if (url === val.path) {
              sessionStorage['openItem'] = val.name
              break
            }
          }
          this.setOpenMenu(sessionStorage['openItem'])
        }
        return this.menuOpenMenu
      },
      set () {}
    },
    activeName: {
      get () {
        if (this.$validators.isNull(this.menuActiveName) && !this.$validators.isNull(sessionStorage['activeName'])) {
          this.setActiveName(sessionStorage['activeName'])
        }
        return this.menuActiveName
      },
      set () {}
    },
    menuItemClass () {
      return ['menu-item',
        this.collapsed ? 'collapsed-menu' : ' '
      ]
    }

  },
  watch: {
    '$route' (to, from) {
      // console.log(to)
      if (to.path === '/main') {
        this.a = ['']
        this.setActiveName('')
        sessionStorage['activeName'] = ''
        sessionStorage['openItem'] = ''
        sessionStorage['menuItemArr'] = JSON.stringify([])
        this.setOpenMenu('')
        this.$nextTick(() => {
          this.$refs.sider_menu.updateOpened()
          this.$refs.sider_menu.updateActiveName()
        })
      }
    }
  },
  created () {
    this.initMenuItemArr()
  },
  mounted () {
    Bus.$on('remotate', () => {
      this.openSubmenu = Array.of(sessionStorage['openItem']) || []
      this.activeName = sessionStorage['activeName'] || ''
      this.$nextTick(() => {
        this.$refs.sider_menu.updateOpened()
        this.$refs.sider_menu.updateActiveName()
      })
    })
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.menu
  &__submenu
    color #fff
    font-size 12px
.menu-item span
  display inline-block
  overflow hidden
  width 70%
  text-overflow ellipsis
  white-space nowrap
  vertical-align middle
  transition width .2s ease .2s
.menu-item .ivu-icon-ios-paper
  transform translateX(0px)
  transition font-size .2s ease, transform .2s ease
  vertical-align middle
  font-size 14px
.collapsed-menu span
  width 0px
  transition width .2s ease
.collapsed-menu .ivu-icon-ios-paper
  transform translateX(5px)
  transition font-size .2s ease .2s, transform .2s ease .2s
  vertical-align middle
  font-size 18px
</style>
