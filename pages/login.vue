<template>
  <div class="card card--login">
    <div class="card-title">Вход</div>
    <el-form :model="loginForm">
      <el-form-item prop="email">
        <el-input v-model="loginForm.email" type="text" placeholder="Введите электронный адрес" />
      </el-form-item>
      <el-form-item prop="password">
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
        <el-button native-type="button" type="primary">Войти</el-button>
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
  data: () => ({
    loginForm: {
      email: null,
      password: null
    },
    showPassword: false
  })
}
</script>

<style scoped>

</style>