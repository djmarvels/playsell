<template>
  <el-container>
    <navbar :logged="true" />
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
  }
}
</script>