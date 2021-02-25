<template>
  <span
      :class="v_icon_class"
      v-html="v_icon"
  />
</template>

<script>
export default {
  name: "icon",
  created() {
    this.v_icon_class = 'v-icon'
    this.v_icon = require(`~/assets/icons/${this.name}.svg?raw`)
  },
  mounted() {
    this.$nextTick(() => {
      this.generateIconClass()
    })
  },
  methods: {
    generateIconClass () {
      if (typeof this.size !== 'undefined') {
        this.v_icon_class += ' v-icon__'+this.size
      }
      if (typeof this.color !== 'undefined') {
        this.v_icon_class += ' v-icon__'+this.color
      }
      if (typeof this.stroke !== 'undefined') {
        this.v_icon_class += ' v-icon__stroke'
      }
      if (typeof this.fill !== 'undefined') {
        this.v_icon_class += ' v-icon__fill'
      }
    }
  },
  props: {
    name: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: false
    },
    size: {
      type: String,
      required: false
    },
    fill: {
      type: String,
      required: false
    },
    stroke: {
      type: String,
      required: false
    }
  },
  data: () => {
    return {
      v_icon: null,
      v_icon_class: null
    }
  }
}
</script>

<style scoped lang="scss">

</style>
