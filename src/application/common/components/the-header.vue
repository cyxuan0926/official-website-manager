<template>
    <div class="header">
      <div class="header__left">
        <span>国科政信官网</span>
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
import axios from 'axios'
export default {
  data () {
    return {
    }
  },
  computed: {
    userName () {
      return sessionStorage['userName']
    }
  },
  methods: {
    logout () {
      axios.post('logout').then(response => {
        if (response.data.code === 200) {
          sessionStorage['userName'] = ''
          sessionStorage['userId'] = ''
          this.$router.push({path: '/'})
        }
      })
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
  &__right
   color #fff
   ul
    display flex
    flex-direction row
</style>
