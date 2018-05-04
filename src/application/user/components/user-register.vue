<template>
    <div class="user-register">
      <i-card class="card">
        <div
          slot="title"
          class="card__header">
          <span>注 册</span>
        </div>
        <div class="edit">
          <div class="edit__fields">
            <i-form :model="user" :rules="rules" ref="form">
              <i-row>
                <i-col :span="6" :offset="9">
                  <i-form-item prop="userName">
                    <i-input type="text" placeholder="用户名" v-model="user.userName">
                      <i-icon type="ios-person-outline" slot="prepend" size="18"></i-icon>
                    </i-input>
                  </i-form-item>
                </i-col>
              </i-row>
              <i-row>
                <i-col :span="6" :offset="9">
                  <i-form-item prop="password">
                    <i-input type="password" placeholder="密码" v-model="user.password">
                      <i-icon type="ios-locked-outline" slot="prepend" size="18"></i-icon>
                    </i-input>
                  </i-form-item>
                </i-col>
              </i-row>
              <i-row>
                <i-col :span="6" :offset="9">
                  <i-form-item prop="cofirmPassword">
                    <i-input type="password" placeholder="确认密码" v-model="user.cofirmPassword">
                      <i-icon type="ios-locked-outline" slot="prepend" size="18"></i-icon>
                    </i-input>
                  </i-form-item>
                </i-col>
              </i-row>
              <i-row>
                <i-col :span="6" :offset="9">
                  <i-form-item>
                    <i-button type="primary" long @click="register">注 册</i-button>
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
    const validatePass = (rule, value, callback) => {
      console.log(value)
    }
    const checksPwd = (rule, value, callback) => {
      console.log(value)
    }
    return {
      rules: {
        userName: [{ required: true, message: '请输入用户名' }, { max: 60, message: '长度在 60 个字符内' }],
        password: [{ validator: validatePass, trigger: 'blur' }],
        cofirmPassword: [
          {validator: checksPwd, trigger: 'blur'}
        ]
      },
      user: {
        userName: '',
        password: '',
        cofirmPassword: ''
      }
    }
  },
  methods: {
    register () {
      this.$refs['form'].validate((valid) => {

      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
</style>
