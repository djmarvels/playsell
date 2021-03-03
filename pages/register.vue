<template>
  <div class="card card--login">
    <div class="card-title">Регистрация</div>
    <el-form :model="registerForm" status-icon :rules="registerRules" ref="registerForm" @validate="validateRegister" :inline-message="true">
      <el-form-item prop="login" :error="registerMessages.login.error">
        <el-input v-model="registerForm.login" type="text" placeholder="Логин" />
        <div class="form-message" :class="{ 'form-message--success': registerMessages.login.state === 'success' }" v-if="registerMessages.login.state === 'message' || registerMessages.login.state === 'success'">
          {{ registerMessages.login.message }}
        </div>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="registerForm.password" type="text" placeholder="Пароль">
        </el-input>
        <div class="form-message" :class="{ 'form-message--success': registerMessages.password.state === 'success' }" v-if="registerMessages.password.state === 'message' || registerMessages.password.state === 'success'">
          {{ registerMessages.password.message }}
        </div>
      </el-form-item>
      <el-form-item prop="email">
        <el-input v-model="registerForm.email" type="text" placeholder="E-Mail" />
        <div class="form-message" :class="{ 'form-message--success': registerMessages.email.state === 'success' }" v-if="registerMessages.email.state === 'message' || registerMessages.email.state === 'success'">
          {{ registerMessages.email.message }}
        </div>
      </el-form-item>
      <el-form-item>
        <el-button native-type="button" type="primary" @click="submitRegister">Зарегистрироваться</el-button>
      </el-form-item>
      <el-form-item>
        <div class="card-login-actions">
          <span>У меня есть аккаунт.</span>
          <nuxt-link :to="{ name: 'login' }">Войти</nuxt-link>
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
  name: "register",
  components: {
    icon,
  },
  methods: {
    async submitRegister () {
      try {
        await this.validForm ()
      } catch (e) {
        console.log(e)
      }
    },
    validateRegister (prop, valid, message) {
      if (!valid) {
        this.registerMessages[prop] = { state: 'error', message: '', error: message }
      } else {
        switch (prop) {
          case 'login': {
            this.registerMessages[prop] = { state: 'success', message: 'Этот логин свободен', error: '' }
            break;
          }
          case 'email': {
            this.registerMessages[prop] = { state: 'success', message: 'Этот e-mail свободен', error: '' }
            break;
          }
        }
      }
    },
    validForm () {
      return new Promise((resolve, reject) => {
        this.$refs.registerForm.validate((valid) => {
          if (valid) {
            resolve ()
          } else {
            reject ({ response: 'not valid form' })
          }
        })
      })
    }
  },
  mounted() {
  },
  data: () => {
    const checkLogin = (rule, value, callback) => {
      if (!value.length) {
        return callback(new Error('Пожалуйста введите логин'))
      } else if (value.match(/[A-Za-z0-9]+/) === null) {
        return callback(new Error('Только латинские буквы и цифры'))
      } else if (value.match(/[A-Za-z0-9]+/)[0].length !== value.length) {
        return callback(new Error('Только латинские буквы и цифры'))
      }
      else {
        callback ();
      }
    };
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
      registerRules: {
        login: [{ validator: checkLogin, trigger: 'change' }],
        password: [{ validator: checkPassword, trigger: 'change' }],
        email: [{ validator: checkEmail, trigger: 'change' }]
      },
      registerForm: {
        login: '',
        email: '',
        password: '',
      },
      registerMessages: {
        login: { state: 'message', message: 'Только латинские буквы и цифры', error: '' },
        password: { state: 'message', message: 'Не менее 8 символов, латинские буквы и цифры', error: ''  },
        email: { state: 'message', message: 'Необходим для восстановления учетной записи', error: ''  }
      }
    }
  }
}
</script>

<style scoped>

</style>