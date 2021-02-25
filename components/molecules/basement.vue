<template>
  <div class="footer">
    <div class="footer__inner">
      <div class="footer__up">
        <div class="footer-payments">
          <icon name="visa2" class="footer-payments--visa" />
          <icon name="maestro" class="footer-payments--maestro" />
          <icon name="paypal" class="footer-payments--paypal" />
          <icon name="yandex" class="footer-payments--yandex" />
          <icon name="webmoney2" class="footer-payments--webmoney" />
          <icon name="mir2" class="footer-payments--mir" />
          <icon name="qiwi2" class="footer-payments--qiwi" />
        </div>
        <div class="footer-socials">
          <a class="footer-social footer-social--vk" href="#!">
            <icon name="vk" />
          </a>
          <a class="footer-social footer-social--telegram" href="#!">
            <icon name="telegram" />
          </a>
        </div>
      </div>
      <div class="footer__bottom">
        <div class="footer-copyright">© Playsell 2020 Все права защищены</div>
        <div class="footer-menu">
          <a href="#!" class="footer-menu-item">Политика конфиденциальности</a>
          <a href="#!" class="footer-menu-item">Пользовательское соглашение</a>
          <a href="#!" class="footer-menu-item">Design by Danil Gortsuev</a>
          <a href="#!" class="footer-menu-item">Dev by Valery Kozyr</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import icon from '@/components/atoms/icon'
export default {
  name: "basement",
  components: {
    icon
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/interface/colors.scss";
@import "@/styles/interface/mixins.scss";
.footer {
  flex-basis: 100%;
  width: 100%;
  background-color: #ffffff;
  &__inner {
    @media (min-width: 1200px) {
      max-width: 1200px;
    }
    @media (max-width: 1199px) and (min-width: 992px) {
      max-width: 992px;
    }
    @media (max-width: 991px) and (min-width: 768px) {
      max-width: 768px;
    }
    @media (max-width: 767px) and (min-width: 576px) {
      max-width: 576px;
    }
    @media (max-width: 575px) and (min-width: 0px) {
      max-width: 100%;
    }
    margin-left: auto;
    margin-right: auto;
    padding: 24px 0;
    @media (max-width: 991px) {
      padding: 16px 0;
    }
  }
  &__up {
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 767px) {
      flex-wrap: wrap;
    }
  }
  &__bottom {
    margin-top: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 991px) {
      margin-top: 16px;
      flex-wrap: wrap;
    }
  }
  &-copyright {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: $grey-500;
    @media (max-width: 1199px) and (min-width: 992px) {
      font-size: 13px;
      line-height: 120%;
    }
    @media (max-width: 991px) {
      margin-bottom: 16px;
      text-align: center;
      flex-basis: 100%;
    }
  }
  &-menu {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0;
    @media (max-width: 767px) {
      flex-direction: column;
      flex-wrap: wrap;
      flex-basis: 100%;
    }
    &-item {
      display: block;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      color: $grey;
      transition: color 350ms;
      font-feature-settings: 'pnum' on, 'lnum' on;
      @media (min-width: 1200px) {
        &:not(:last-child) {
          margin-right: 32px;
        }
      }
      @media (max-width: 1199px) and (min-width: 768px) {
        &:not(:last-child) {
          margin-right: 12px;
        }
      }
      @media (max-width: 1199px) and (min-width: 992px) {
        font-size: 13px;
        line-height: 120%;
      }
      @media (max-width: 767px) {
        flex-basis: 100%;
        width: 100%;
        text-align: center;
        &:not(:last-child) {
          margin-bottom: 8px;
        }
      }
      &:hover {
        color: $primary;
      }
    }
  }
  &-socials {
    display: flex;
    align-items: center;
    @media (max-width: 767px) {
      justify-content: center;
      margin-top: 16px;
      flex-basis: 100%;
    }
  }
  &-payments {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    @media (max-width: 767px) {
      flex-basis: 100%;
      justify-content: center;
    }
    @media (max-width: 575px) {
      flex-wrap: wrap;
      max-width: 300px;
      margin-left: auto;
      margin-right: auto;
    }
    .v-icon {
      display: block;
      @media (min-width: 576px) {
        &:not(:last-child) {
          margin-right: 32px;
        }
      }
    }
    &--visa {
      @media (max-width: 575px) {
        margin-right: 24px;
      }
      @include only-width(69px);
      @include only-height(22px);
    }
    &--maestro {
      @include only-width(44px);
      @include only-height(28px);
      @media (max-width: 575px) {
        margin-right: 24px;
      }
    }
    &--paypal {
      @include only-width(79px);
      @include only-height(20px);
      @media (max-width: 575px) {
        margin-right: 24px;
      }
    }
    &--yandex {
      @include only-width(27px);
      @include only-height(26px);
    }
    &--webmoney {
      @include only-width(30px);
      @include only-height(30px);
      @media (max-width: 575px) {
        margin-right: 24px;
        margin-top: 12px;
      }
    }
    &--mir {
      @include only-width(55px);
      @include only-height(16px);
      @media (max-width: 575px) {
        margin-right: 24px;
        margin-top: 12px;
      }
    }
    &--qiwi {
      @include only-width(29px);
      @include only-height(30px);
      @media (max-width: 575px) {
        margin-top: 12px;
      }
    }
  }
}
</style>