<template>
  <el-container>
    <navbar :logged="logged" />
    <el-main>
      <Nuxt />
    </el-main>
    <basement />
  </el-container>
</template>

<script>
import navbar from '@/components/molecules/navbar'
import basement from '@/components/molecules/basement'
export default {
  name: "default",
  components: {
    navbar,
    basement
  },
  computed: {
    logged () {
      return (this.$route.name === 'account')
    }
  }
}
</script>