<template>
  <div class="card card--login">
    <div class="card-title">Вход</div>
    <el-form :model="loginForm" ref="loginForm" status-icon :rules="loginRules" :inline-message="true">
      <el-form-item prop="email" :error="loginErrors.email">
        <el-input v-model="loginForm.email" type="text" placeholder="Введите электронный адрес" />
      </el-form-item>
      <el-form-item prop="password" :error="loginErrors.password">
        <el-input v-model="loginForm.password" :type="!showPassword ? 'password' : 'text'" placeholder="Пароль">
          <el-button slot="append" @click="showPassword = !showPassword" type="icon">
            <icon :name="!showPassword ? 'eye' : 'eye_off'" />
          </el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <nuxt-link :to="{ name: 'restore' }" class="card-link">Забыли пароль</nuxt-link>
      </el-form-item>
      <el-form-item>
        <el-button native-type="button" type="primary" @click="submitLogin">Войти</el-button>
      </el-form-item>
      <el-form-item>
        <div class="card-login-actions">
          <span>Я новый пользователь.</span>
          <nuxt-link :to="{ name: 'register' }">Зарегистрироваться</nuxt-link>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="card-login-socials">
          <div class="card-login-socials__header">или через соц. сети</div>
          <div class="card-login-socials__inner">
            <el-button type="plain" native-type="button">
              <icon name="vk" />
            </el-button>
            <el-button type="plain" native-type="button">
              <icon name="Google" />
            </el-button>
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import icon from '@/components/atoms/icon'
export default {
  name: "login",
  components: {
    icon,
  },
  methods: {
    async submitLogin () {
      try {
        // this.registerMessages.login = { state: 'error', message: '', error: 'Логин уже занят' }
        const valid = await this.validForm ()
      } catch (e) {
        console.log(e)
      }
    },
    validForm () {
      return new Promise((resolve, reject) => {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            resolve ()
          } else {
            reject ({ response: 'not valid form' })
          }
        })
      })
    }
  },
  data: () => {
    const checkPassword = (rule, value, callback) => {
      if (!value.length) {
        return callback(new Error('Пожалуйста введите пароль'))
      } else if (value.match(/[A-Za-z0-9]+/) === null) {
        return callback(new Error('Только латинские буквы и цифры'))
      } else if (value.match(/[A-Za-z0-9]+/)[0].length !== value.length) {
        return callback(new Error('Только латинские буквы и цифры'))
      } else if (value.length < 8) {
        return callback(new Error('Не менее 8 символов'))
      }
      else {
        callback ();
      }
    };
    const checkEmail = (rule, value, callback) => {
      if (!value.length) {
        return callback(new Error('Пожалуйста адрес электронной почты'))
      } else if (value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm) === null) {
        return callback(new Error('Неверный адрес электронной почты'))
      }
      else {
        callback ();
      }
    };
    return {
      loginForm: {
        email: '',
        password: ''
      },
      loginRules: {
        password: [{ validator: checkPassword, trigger: 'change' }],
        email: [{ validator: checkEmail, trigger: 'change' }]
      },
      loginErrors: {
        email: '',
        password: ''
      },
      showPassword: false
    }
  }
}
</script>

<style scoped>

</style>