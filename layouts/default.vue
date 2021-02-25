<template>
  <el-container>
    <navbar :logged="true" />
    <el-main>
      <Nuxt />
    </el-main>
  </el-container>
</template>

<script>
import navbar from '@/components/molecules/navbar'
export default {
  name: "default",
  components: {
    navbar,
  }
}
</script>