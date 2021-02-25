<template>
  <div class="ui mt-6">

    <div class="ui_inner">
      <div class="ui-block">
        <div class="ui-block-header mb-6"><typo heading="1">Typography</typo></div>
        <div class="ui-block-body">
          <div><typo heading="1" color="primary">Heading 1</typo></div>
          <div><typo heading="2" color="grey">Heading 2</typo></div>
          <div><typo body="16" color="success">Body 16</typo></div>
          <div><typo body="14" color="error">Body 14</typo></div>
          <div><typo body="12" color="warning">Body 12</typo></div>
          <div><typo lead="14" color="primary-600">Lead 14</typo></div>
        </div>
      </div>
      <div class="ui-block">
        <div class="ui-block-header"><typo heading="1">Navbars</typo></div>
      </div>
    </div>
  </div>
</template>

<script>
import typo from '@/components/atoms/typography'
export default {
  name: "index",
  components: {
    typo,
  }
}
</script>

<style scoped lang="scss">
.ui {
  width: 100%;
  &__inner {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }
  flex-wrap: wrap;
  &-block {
    flex-basis: calc(100% / 3);
  }
}
</style>