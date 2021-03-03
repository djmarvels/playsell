<template>
  <div class="card card--login">
    <div class="card-title">{{ restoreState === 'input' ? 'Восстановление пароля' : 'Проверьте почтовый ящик' }}</div>
    <el-form :model="restoreForm" status-icon :rules="restoreRules" ref="restoreForm" @validate="validateRestore" :inline-message="true">
      <el-form-item prop="email_login" :error="restoreError" v-if="restoreState === 'input'">
        <el-input v-model="restoreForm.email_login" type="text" placeholder="Логин" />
      </el-form-item>
      <el-form-item v-if="restoreState === 'input'">
        <el-button native-type="button" type="primary" @click="submitRestore">Восстановить пароль</el-button>
      </el-form-item>
      <el-form-item>
        <div class="card-text card-text--form" v-if="restoreState === 'send'">
          На ваш почтовый ящик <a href="javascript:;">noname@mail.ru</a> отправлена инструкция с дальнейшим
          указанием сброса пароля
        </div>
      </el-form-item>
      <el-form-item v-if="restoreState === 'send'">
        <el-button native-type="button" type="primary" @click="toLogin">Войти заного</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  name: "restore",
  methods: {
    toLogin () {
      this.$router.push({ name: 'login' })
    },
    async submitRestore () {
      try {
        await this.validForm ()
        this.restoreState = 'send'
      } catch (e) {
        console.log(e)
      }
    },
    validateRestore (prop, valid, message) {
    },
    validForm () {
      return new Promise((resolve, reject) => {
        this.$refs.restoreForm.validate((valid) => {
          if (valid) { resolve () } else { reject ({ response: 'not valid form' }) }
        })
      })
    }
  },
  data: () => {
    return {
      restoreForm: {
        email_login: ''
      },
      restoreRules: {
        email_login: [
          { required: true, message: 'Введите логин или E-Mail', trigger: 'change' }
        ]
      },
      restoreError: '',
      restoreState: 'input'
    }
  }
}
</script>

<style scoped>

</style>