<template>
    <div class="header">
      <div class="header__left">
        <span>国科政信官网</span>
        <span @click="handleCollapsed">
          <i-icon type="navicon-round" size="18" :class="rotateIcon"></i-icon>
        </span>
      </div>
      <div class="header__right">
        <ul>
          <li style="margin-right: 10px">{{userName}}</li>
          <li style="margin-top: 2px" @click="logout">
            <i-icon type="log-out" size="18"></i-icon>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import Bus from '@/plugin/bus.js'
import axios from 'axios'
import {mapState, mapMutations} from 'vuex'
import submenuName from '@/data/submenu-name.json'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      collapsed: state => state.common.isCollapsed
    }),
    userName () {
      return sessionStorage['userName']
    },
    rotateIcon () {
      return ['transition-icon',
        this.collapsed ? 'collapsed-icon' : ''
      ]
    }
  },
  methods: {
    ...mapMutations(['setOpenMenu']),
    logout () {
      axios.post('logout').then(response => {
        if (response.data.code === 200) {
          sessionStorage['userName'] = ''
          sessionStorage['userId'] = ''
          sessionStorage['menuItemArr'] = JSON.stringify([])
          this.$router.push({path: '/'})
        }
      })
    },
    handleCollapsed () {
      Bus.$emit('siderClick')
      let url = this.$route.path === '/main' ? this.$route.path : this.$route.path.substring(0, this.$route.path.lastIndexOf('/'))
      for (let val of submenuName) {
        if (url === val.path) {
          sessionStorage['openItem'] = val.name
          break
        }
      }
      this.setOpenMenu(sessionStorage['openItem'])
      Bus.$emit('remotate')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.header
  display flex
  flex-direction row
  justify-content space-between
  &__left
    color #fff
    font-size 16px
    & span
      &:last-child
         margin-left 84px
         .ivu-icon-navicon-round
            vertical-align middle
  &__right
   color #fff
   ul
    display flex
    flex-direction row
.collapsed-icon
   transform rotate(-90deg)
.transition-icon
  transition all .3s
</style>
