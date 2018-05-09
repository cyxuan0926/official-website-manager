<template>
    <div class="login">
      <i-card class="card">
        <div
          slot="title"
          class="card__header">
          <span>登 陆</span>
        </div>
        <div class="edit">
          <div class="edit-login__fields">
            <i-form :model="user" :rules="rules" ref="form">
              <i-row>
                <i-col :span="6" :offset="9">
                  <i-form-item prop="userName">
                    <i-input type="text" placeholder="用户名" v-model="user.userName" @keyup.enter.native="handleLogin">
                      <i-icon type="ios-person-outline" slot="prepend" size="18"></i-icon>
                    </i-input>
                  </i-form-item>
                </i-col>
              </i-row>
              <i-row>
                <i-col :span="6" :offset="9">
                  <i-form-item prop="password">
                    <i-input type="password" placeholder="密码" v-model="user.password" @keyup.enter.native="handleLogin">
                      <i-icon type="ios-locked-outline" slot="prepend" size="18"></i-icon>
                    </i-input>
                  </i-form-item>
                </i-col>
              </i-row>
              <i-row>
                <i-col :span="6" :offset="9">
                  <i-form-item>
                    <i-button type="primary" long @click="handleLogin">登 陆</i-button>
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
import axios from 'axios'
export default {
  data () {
    return {
      user: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [{ required: true, message: '用户名不能为空' }],
        password: [{ required: true, message: '密码不能为空' }, { min: 6, message: '密码长度最少6位' }]
      }
    }
  },
  methods: {
    handleLogin () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          axios.post('login', {
            userName: this.user.userName,
            password: this.user.password
          }).then(response => {
            // console.log(response.data)
            if (response.data.code === 200) {
              sessionStorage['userName'] = response.data.data.userName
              sessionStorage['userId'] = response.data.data._id
              this.$router.push({path: '/main'})
            } else {
              this.$Message.error({
                content: response.data.msg,
                duration: 5,
                closable: true
              })
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          console.log('bad submit')
          return false
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  .login
    padding-top 12%
</style>
