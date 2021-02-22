<template>
  <span :class="textClass">
    <slot name="default" />
  </span>
</template>

<script>
export default {
  name: "typography",
  computed: {
    textClass () {
      let textClass = (this.heading !== null) ? 'text heading-'+this.heading : (this.body !== null) ? 'text body-'+this.body : (this.lead !== null) ? 'text lead-'+this.lead : 'text'
      if (this.color !== null) {
        textClass += ' text-'+this.color
      }
      return textClass
    }
  },
  props: {
    heading: {
      required: false,
      default: null
    },
    body: {
      required: false,
      default: null
    },
    lead: {
      required: false,
      default: null
    },
    color: {
      required: false,
      default: null
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/colors.scss";
.text {
  font-style: normal;
  font-display: swap;
  font-feature-settings: 'pnum' on, 'lnum' on;
  // Sizes
  &.lead-14 {
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
  }
  &.heading-1 {
    font-weight: 600;
    font-size: 26px;
    line-height: 40px;
  }
  &.heading-2 {
    font-weight: 600;
    font-size: 20px;
    line-height: 32px;
  }
  &.body-16 {
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
  }
  &.body-14 {
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
  }
  &.body-12 {
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
  }
  &.lead-14 {
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
  }
  // Colors
  &-primary {
    color: $primary;
    &-100 {
      color: $primary-200;
    }
    &-200 {
      color: $primary-300;
    }
    &-300 {
      color: $primary-400;
    }
    &-600 {
      color: $primary-600;
    }
  }
  &-grey {
    color: $grey;
    &-200 {
      color: $grey-200;
    }
    &-300 {
      color: $grey-300;
    }
    &-500 {
      color: $grey-500;
    }
    &-600 {
      color: $grey-600;
    }
  }
  &-white {
    color: $white;
  }
  &-success {
    color: $success;
  }
  &-warning {
    color: $warning;
  }
  &-error {
    color: $error;
  }
}
</style>