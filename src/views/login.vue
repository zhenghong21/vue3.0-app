<template>
  <div class="login-page">
    <div class="login-title">移动医生</div>

    <section class="login-user">
      <div class="user-title">账号</div>
      <input class="hint" type="" placeholder="请输入您的帐号" v-model="name" />
      <span
        class="bt-icon username_delete"
        v-show="name"
        @click="clearName"
      ></span>
    </section>

    <section class="login-user">
      <div class="user-title">密码</div>
      <input
        class="hint"
        :type="type"
        placeholder="请输入您的密码"
        v-model="pwd"
      />
      <span
        class="bt-icon"
        :class="{ 'bt-showpwd': showPwd, 'bt-offpwd': !showPwd }"
        v-if="pwd && pwd.length != 40"
        @click="showPwd = !showPwd"
      ></span>
    </section>
    <div class="remember-pwd">
      <input type="checkbox" v-model="isRemember" />
      <span class="remember">记住密码</span>
    </div>
    <div class="login-button" @click="gotoLogin">登录</div>
    <div class="footer">
      <p>技术支持 卫宁健康科技集团股份有限公司</p>
      <p>版本号 0.8</p>
    </div>
  </div>
</template>
<script>
import { hex_sha1 } from '../JS/cipher'

export default {
  components: {},
  data () {
    return {
      showPwd: false, // 是否显示密码
      isRemember: false, // 是否记住密码
      name: localStorage.getItem('UserAccount'), // 用户名
      pwd: '', // 密码
      storagePwd: '', //存储时保存未加密的密码
      nickname: ''
    }
  },
  computed: {
    type () {
      return this.showPwd ? 'text' : 'password'
    },

    dialogueData () {
      return this.$store.state.dialogue
    }
  },
  methods: {
    clearName () {
      this.name = ''
      this.pwd = ''
    },
    show () {
      this.showPwd = !this.showPwd
    },
    gotoLogin () {
      // //
      // 	Vue.prototype.$isBeijingQy = result.data.isBeijingQy;
      //       //北京签约的url
      // Vue.prototype.$beiJingQyUrl = result.data.beiJingQyUrl;
      if (!this.name) {
        return
      }
      if (!this.pwd) {
        return
      }
      this.storagePwd = this.pwd
      if (this.pwd && this.pwd.length != 40) {
        //说明是没有加密的密码
        this.pwd = hex_sha1(this.pwd)
      }

      let params = {
        source: '5',
        loginname: this.name,
        params: {
          username: 'mobileDoctor',
          password: 'HG0uxJA0cW0fYMTzHZAIDCMhgA5vJ7uArL94/ghg5L4='
        }
      }
      //如果配置了是北京签约，就要调用一下北京签约的接口
      if (this.$isBeijingQy) {
        this.getBeiJingQyToken(params)
      }

      this.loginRequest()
    },
    loginRequest () {
      let json = {
        username: this.name,
        password: this.pwd
      }
      this.$axios
        .post(`${this.$ApiUrl}/rhm-configure/api/v1/login`, json, {
          needForm: true,
          loading: true
        })
        .then(res => {
          if (res.data.code != 0) {
            this.$toast(res.data.result.msg)
            return
          }
          let { token, loginSfzh, loginid, loginname } = res.data.result
          localStorage.setItem('loginUserInfo', JSON.stringify(res.data.result))
          //登录成功以后再去绑定纳里用户

          localStorage.setItem('UserLoginToken', token)
          localStorage.setItem('UserSfzh', loginSfzh)
          localStorage.setItem('UserId', loginid)
          localStorage.setItem('UserName', loginname)
          localStorage.setItem('UserAccount', this.name)
          if (this.isRemember) {
            localStorage.setItem('isRemember', true)

            localStorage.setItem('UserPwd', this.storagePwd)
          } else {
            localStorage.setItem('isRemember', false)
            localStorage.setItem('UserPwd', '')
          }

          this.$router.push({
            path: '/ResidentList'
          })
          //拿到用户就去登录 如果提示未注册过就进行注册然后再登录
          // this.gotoDoctorLogin(res.data.result);
        })
        .catch()
    },
    //获取北京签约token
    getBeiJingQyToken (params) {
      this.$axios
        .post(`${this.$beiJingQyUrl}/rhm-sign/api/v2/getYzToken`, params, {
          needForm: false,
          loading: true
        })
        .then(res => {
          if (res.data.code != 0) {
            this.$toast(res.data.message)
            return
          }
          let { token } = res.data.result
          localStorage.setItem('BeijingQyToken', token)
        })
        .catch()
    }
  },
  mounted () {}
}
</script>
<style lang="less" scoped>
.login-page {
  background-color: white;
  height: 100%;
  padding: 0 70px;
  display: flex;
  flex-direction: column;
  .login-title {
    color: var(--Color);
    font-size: 56px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    padding: 140px 0 75px 0;
  }
  .login-user {
    border-bottom: 1px solid #f2f3f7;
    .user-title {
      margin-top: 50px;
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .hint {
      width: 70%;
      height: 80px;
      margin: auto;
      background-color: transparent;
      border: none;
      outline: medium;
      color: #03081a;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
    }
  }
  .remember-pwd {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 30px;
    .remember {
      font-size: 24px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      // color: #C6C6C6;
      margin-left: 10px;
    }
  }
}

.login-button {
  width: 100%;
  margin: 0 auto;
  margin-top: 80px;
  height: 80px;
  line-height: 80px;
  color: white;
  background: var(--Color);
  text-align: center;
  font-size: 36px;
  border-radius: 48px;
}

.bt-icon {
  width: 32px;
  height: 32px;
  margin-top: 30px;
  float: right;
}
.bt-showpwd {
}
.username_delete {
}
.bt-offpwd {
}

.footer {
  font-size: 24px;
  color: #a4a4a4;
  text-align: center;
  margin-top: 50%;
}
</style>
