<template>
  <div class="navbar" :class="{ 'navbar-open': showResponsiveMenu }">
    <div class="navbar__inner">
      <nuxt-link class="navbar-brand" :to="{ name: 'index' }" @click.native="emptyMenu">Playsell</nuxt-link>
      <button class="navbar-toggler" @click="handleResponsiveMenu">
        <icon :name="(!showResponsiveMenu) ? 'menu' : 'close'" />
      </button>
      <el-menu class="navbar-menu" v-model="activeMenu" mode="horizontal" menu-trigger="click" ref="navigation"
               @select="selectMenu" @open="selectMenu('all_games')" @close="emptyMenu">
        <el-menu-item index="samp" :class="{ 'active': (activeMenu === 'samp') }">SAMP</el-menu-item>
        <el-menu-item index="crmp" :class="{ 'active': (activeMenu === 'crmp') }">CRMP</el-menu-item>
        <el-menu-item index="wot" :class="{ 'active': (activeMenu === 'wot') }">WOT</el-menu-item>
        <el-menu-item index="gta5" :class="{ 'active': (activeMenu === 'gta5') }">GTA 5</el-menu-item>
        <el-menu-item index="steam" :class="{ 'active': (activeMenu === 'steam') }">Steam</el-menu-item>
        <el-menu-item index="minecraft" :class="{ 'active': (activeMenu === 'minecraft') }">Minecraft</el-menu-item>
        <el-submenu index="all_games" :class="{ 'active': (activeMenu === 'all_games') }" ref="popper_all_games"
        :popper-class="logged ? 'navbar-submenu-popper' : 'navbar-submenu-popper navbar-submenu-popper--to_login'"
        >
          <template slot="title">Все игры <icon name="chevron_down" /></template>
          <div class="navbar-submenu" slot="default">
            <div class="navbar-sublist" v-for="(menu, menu_id) in sublist[0]" :key="menu_id">
              <div class="navbar-sublist__header">{{ menu.title }}</div>
              <ul class="navbar-sublist__inner">
                <li v-for="(item, item_id) in menu.items" :key="item_id">
                  <nuxt-link :to="item.to">{{ item.title }}</nuxt-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="navbar-submenu" slot="default">
            <div class="navbar-sublist" v-for="(menu, menu_id) in sublist[1]" :key="menu_id">
              <div class="navbar-sublist__header">{{ menu.title }}</div>
              <ul class="navbar-sublist__inner">
                <li v-for="(item, item_id) in menu.items" :key="item_id">
                  <nuxt-link :to="item.to">{{ item.title }}</nuxt-link>
                </li>
              </ul>
            </div>
          </div>
        </el-submenu>
      </el-menu>
      <div class="navbar-actions navbar-actions--to_login" v-if="!logged">
        <nuxt-link class="navbar-link" :to="{ name: 'login' }">Войти</nuxt-link>
        <nuxt-link class="navbar-link" :to="{ name: 'register' }">Зарегистрироваться</nuxt-link>
      </div>
      <div class="navbar-actions navbar-actions--logged" v-if="logged">
        <div class="navbar-actions__inner">
          <el-popover placement="bottom-start" width="189" trigger="click" class="navbar-actions__popover-button" popper-class="navbar-actions__popover" :append-to-body="true" :visible-arrow="false">
            <button type="button" slot="reference" class="navbar-actions__popover-button-inner">
              <icon name="plus" />
            </button>
            <div class="navbar-actions__popover-inner">
              <ul class="popover-buttons">
                <li class="popover-buttons__item">
                  <button type="button" class="popover-buttons__button">
                    <icon name="buy" />Продать аккаунт
                  </button>
                </li>
                <li class="popover-buttons__item">
                  <button type="button" class="popover-buttons__button">
                    <icon name="filter" />Массовая заливка
                  </button>
                </li>
              </ul>
            </div>
          </el-popover>
          <button class="navbar-actions__button" type="button"><icon name="sms" /></button>
          <el-popover placement="bottom-start" width="400" trigger="click" class="navbar-actions__popover-button" popper-class="navbar-actions__popover navbar-actions__popover--alert" :append-to-body="true" :visible-arrow="false">
            <button class="navbar-actions__popover-button-inner" type="button" slot="reference">
              <icon name="bell" />
            </button>
            <div slot="default" class="navbar-alert-list">
              <div class="navbar-alert-item">
                <div class="navbar-alert-icon">
                  <icon name="done_all" class="navbar-alert-icon--done_all" />
                </div>
                <div class="navbar-alert-content">
                  <div class="navbar-alert-title">Вы успешно продали товар <span>#4638264</span></div>
                  <div class="navbar-alert-text">Деньги заморожены на 24 часа.</div>
                  <span class="navbar-alert-action">+ 1364 ₽</span>
                  <div class="navbar-alert-date">22.01.2021 11:47</div>
                </div>
              </div>
              <div class="navbar-alert-item">
                <div class="navbar-alert-icon">
                  <icon name="warning" class="navbar-alert-icon--warning" />
                </div>
                <div class="navbar-alert-content">
                  <div class="navbar-alert-title">У покупателя возникла проблема с заказом <span>#4638264</span></div>
                  <nuxt-link class="navbar-alert-action" :to="{ name: 'index' }">Ознакомиться</nuxt-link>
                  <div class="navbar-alert-date">22.01.2021 11:47</div>
                </div>
              </div>
              <div class="navbar-alert-item">
                <div class="navbar-alert-icon">
                  <icon name="buy" class="navbar-alert-icon--buy" />
                </div>
                <div class="navbar-alert-content">
                  <div class="navbar-alert-title">Вы успешно купили товар <span>#4638264</span></div>
                  <div class="navbar-alert-text">Проверьте правильность данных товара.</div>
                  <nuxt-link class="navbar-alert-action" :to="{ name: 'index' }">Перейти к товару</nuxt-link>
                  <div class="navbar-alert-date">22.01.2021 11:47</div>
                </div>
              </div>
            </div>
          </el-popover>
        </div>
        <div class="navbar-balance">
          <icon name="pay_credit_card" />
          <span>45 000,12 ₽</span>
        </div>
        <el-popover class="navbar-user" placement="bottom-end" width="180" trigger="click" popper-class="navbar-user-popover" :append-to-body="true" :visible-arrow="false">
          <div class="navbar-user__inner" slot="reference">
            <div class="navbar-user-label">Danil Gortsuev</div>
            <div class="navbar-user-image" :style="{ backgroundImage: 'url('+require(`@/assets/design/avatar.png`)+')' }" />
          </div>
          <ul class="navbar-user-list" slot="default">
            <li class="navbar-user-item">
              <button type="button" class="navbar-user-link"><icon name="user" />Профиль</button>
            </li>
            <li class="navbar-user-item">
              <button type="button" class="navbar-user-link"><icon name="pay_credit_card" />Баланс</button>
            </li>
            <li class="navbar-user-item">
              <button type="button" class="navbar-user-link"><icon name="setting" />Настройки</button>
            </li>
            <li class="navbar-user-item">
              <button type="button" class="navbar-user-link"><icon name="done_all" />Продажи</button>
            </li>
            <li class="navbar-user-item">
              <button type="button" class="navbar-user-link"><icon name="buy" />Покупки</button>
            </li>
            <li class="navbar-user-item">
              <button type="button" class="navbar-user-link"><icon name="exit" />Выход</button>
            </li>
          </ul>
        </el-popover>

      </div>
    </div>
  </div>
</template>

<script>
import icon from '@/components/atoms/icon'
export default {
  name: "navbar",
  components: {
    icon,
  },
  methods: {
    selectMenu (index) {
      if (index !== 'all_games') {
        this.$router.push({ name: index })
      }
      this.activeMenu = index
    },
    emptyMenu () {
      this.activeMenu = ''
    },
    handleResponsiveMenu () {
      this.showResponsiveMenu = !this.showResponsiveMenu
      if (!this.showResponsiveMenu) {
        this.activeMenu = ''
        if (this.$refs.popper_all_games.opened) {
          this.$refs.popper_all_games.handleClick()
        }
      }
    }
  },
  props: {
    logged: {
      type: Boolean,
      default: false,
    }
  },
  data: () => ({
    activeMenu: '',
    activeSubMenu: '',
    showResponsiveMenu: false,
    sublist: [
      [
        {
          title: 'SAMP, CRMP',
          items: [
            { to: { name: 'index' }, title: 'Аккаунты' },
            { to: { name: 'index' }, title: 'Предметы' },
            { to: { name: 'index' }, title: 'Услуги' },
            { to: { name: 'index' }, title: 'Другое' }
          ]
        },
        {
          title: 'World of Tanks',
          items: [
            { to: { name: 'index' }, title: 'Аккаунты' },
            { to: { name: 'index' }, title: 'Бонус-коды' },
            { to: { name: 'index' }, title: 'Буст' },
            { to: { name: 'index' }, title: 'Фарм серебра' },
            { to: { name: 'index' }, title: 'Выполнение ЛБЗ' },
            { to: { name: 'index' }, title: 'Услуги' }
          ]
        },
        {
          title: 'World of Tanks (BLITZ)',
          items: [
            { to: { name: 'index' }, title: 'Аккаунты' },
            { to: { name: 'index' }, title: 'Фарм серебра' },
            { to: { name: 'index' }, title: 'Буст' },
            { to: { name: 'index' }, title: 'Обучение' },
            { to: { name: 'index' }, title: 'Услуги' },
          ]
        },
        {
          title: 'GTA 5',
          items: [
            { to: { name: 'index' }, title: 'Аккаунты' },
            { to: { name: 'index' }, title: 'Услуги' },
          ]
        },
        {
          title: 'Clash of Clans',
          items: [
            { to: { name: 'index' }, title: 'Аккаунты' },
            { to: { name: 'index' }, title: 'Предметы' },
            { to: { name: 'index' }, title: 'Услуги' },
          ]
        },
      ],
      [
        {
          title: 'Steam',
          items: [
            { to: { name: 'index' }, title: 'Баланс' },
            { to: { name: 'index' }, title: 'Аккаунты' },
            { to: { name: 'index' }, title: 'Подарки' },
          ]
        },
        {
          title: 'FIFA',
          items: [
            { to: { name: 'index' }, title: 'Аккаунты' },
            { to: { name: 'index' }, title: 'Монеты' },
            { to: { name: 'index' }, title: 'Буст' },
            { to: { name: 'index' }, title: 'Другое' },
          ]
        },
        {
          title: 'PUBG',
          items: [
            { to: { name: 'index' }, title: 'Аккаунты' },
            { to: { name: 'index' }, title: 'Предметы' },
            { to: { name: 'index' }, title: 'Услуги' },
          ]
        },
        {
          title: 'PUBG Mobile',
          items: [
            { to: { name: 'index' }, title: 'Аккаунты' },
            { to: { name: 'index' }, title: 'Достижения' },
            { to: { name: 'index' }, title: 'Буст' },
            { to: { name: 'index' }, title: 'Другое' },
          ]
        },
        {
          title: 'Dota 2',
          items: [
            { to: { name: 'index' }, title: 'Аккаунты' },
            { to: { name: 'index' }, title: 'Предметы' },
            { to: { name: 'index' }, title: 'Буст MMR' },
            { to: { name: 'index' }, title: 'Калибровка' },
            { to: { name: 'index' }, title: 'Отмыв ЛП' },
            { to: { name: 'index' }, title: 'Обучение' },
            { to: { name: 'index' }, title: 'Услуги' },
            { to: { name: 'index' }, title: 'Diretide' },
            { to: { name: 'index' }, title: 'Другое' },
          ]
        }
      ],
    ]
  })
}
</script>

<style scoped lang="scss">
@import "@/styles/interface/colors.scss";
@import "@/styles/interface/spacing.scss";
.navbar {
  width: 100%;
  flex-basis: 100%;
  box-shadow: inset 0px -1px 0px #E9EEF4;
  background: $white;

  &__inner {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    margin-left: auto;
    margin-right: auto;
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

    @media (max-width: 991px) {
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      padding-top: map-get($spacings, 5);
      padding-bottom: map-get($spacings, 5);
    }

    @media (max-width: 575px) {
      padding-left: 20px;
      padding-right: 20px;
    }
  }
  &-brand {
    font-family: Arial, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 24px;
    letter-spacing: 0.01em;
    @media (min-width: 992px) {
      margin-top: map-get($spacings, 5);
      margin-bottom: map-get($spacings, 5);
    }
    height: 32px;
    display: flex;
    align-items: center;
    color: $grey-600;
    min-width: 90px;
    max-width: 90px;
    width: 90px;
    white-space: nowrap;
    transition: color 350ms;
    @media (min-width: 1200px) {
      margin-right: map-get($spacings, 6);
    }
    @media (max-width: 1199px) and (min-width: 992px) {
      margin-right: 12px;
    }
    @media (max-width: 991px) {
      order: 1;
    }
    @media (max-width: 767px) {
      margin-right: 0;
    }
    &:hover {
      color: $primary;
    }
  }

  &-toggler {
    @media (min-width: 992px) {
      display: none;
    }
    @media (max-width: 991px) {
      border: 0;
      outline: none;
      padding: 0;
      background-color: $white;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 350ms;
      order: 3;
      margin-left: 12px;
      &:hover {
        background-color: $grey-200;
      }
    }
    @media (max-width: 767px) {
      order: 2;
      margin-left: 0;
    }
  }

  &-menu {
    &.el-menu {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      background-color: transparent;
      &--horizontal {
        @media (min-width: 992px) {
          min-width: 425px;
          max-width: 425px;
        }
        width: 100%;
        border-bottom: none;
        @media (max-width: 991px) {
          justify-content: space-between;
          overflow: hidden;
          height: 0;
          transition: height 350ms;
        }
      }
      &::after, &::before {
        content: inherit;
      }
      @media (max-width: 991px) {
        order: 4;
        flex-basis: 100%;
      }
      @media (max-width: 575px) {
        flex-wrap: wrap;
      }
    }
    .el-menu-item {
      float: none;
      height: 72px;
      line-height: 20px;
      padding: 10px 8px;
      display: flex;
      align-items: center;
      font-feature-settings: 'pnum' on, 'lnum' on;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      color: $grey-600;
      border-bottom: none;
      box-shadow: inset 0px -2px 0px transparent;
      transition: all 350ms;
      @media (max-width: 575px) {
        height: auto;
        flex-basis: calc(100% / 3);
        justify-content: center;
      }
      &:hover {
        background-color: transparent;
        color: $primary;
      }
      &.active {
        color: $primary;
        border-bottom: none;
        @media (min-width: 576px) {
          box-shadow: inset 0px -2px 0px #3366FF;
        }
      }
    }
  }

  &-actions {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    margin-left: auto;
    transition: height 350ms;

    @media (max-width: 991px) and (min-width: 768px) {
      order: 2;
    }


    @media (max-width: 767px) {
      order: 3;
      flex-basis: 100%;
      height: 0;
      overflow: hidden;
      justify-content: space-between;
    }

    @media (max-width: 575px) {
      flex-wrap: wrap;
    }

    &--to_login {
      @media (min-width: 768px) {
        padding-top: 26px;
        padding-bottom: 26px;
      }
      @media (max-width: 991px) {
        justify-content: flex-end;
      }
      a {
        display: block;
        color: $grey-600;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 20px;
        font-feature-settings: 'pnum' on, 'lnum' on;
        &:not(:last-child) {
          margin-right: 16px;
        }
      }
    }
    &--logged {
      @media (min-width: 768px) {
        padding: 16px 0;
      }
      align-items: center;
    }
  }
  &-balance {
    display: flex;
    align-items: center;
    @media (max-width: 575px) {
      flex-basis: calc(50% - 24px);
      justify-content: flex-end;
    }
    span:not(.v-icon) {
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      display: flex;
      align-items: center;
      font-feature-settings: 'pnum' on, 'lnum' on;
      height: 20px;
      color: $grey-500;
    }
    &:hover {
      background-color: $grey-200;
      span:not(.v-icon) {
        color: $primary;
      }
    }
  }
  &-user {
    margin-left: 8px;
    cursor: pointer;
    transition: background-color 350ms;
    @media (max-width: 575px) {
      margin-right: 8px;
      flex-basis: 100%;
    }
    &__inner {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 4px 8px;
      outline: none;
      @media (max-width: 575px) {
        justify-content: flex-end;
      }
    }
    &-label {
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      display: flex;
      align-items: center;
      font-feature-settings: 'pnum' on, 'lnum' on;
      height: 20px;
      margin-right: 8px;
      color: $grey-500;
      transition: color 350ms;
    }
    &-image {
      width: 32px;
      height: 32px;
    }

    &:hover {
      background-color: $grey-200;
      .navbar-user-label {
        color: $primary;
      }
    }
  }
  &-open {
    @media (max-width: 991px) and (min-width: 576px) {
      .navbar__inner {
        padding-bottom: 0;
      }
    }
    @media (max-width: 991px) {
      .navbar-menu {
        &.el-menu--horizontal {
          height: 72px;
          @media (max-width: 575px) {
            height: 120px;
          }
        }
      }
      .navbar-actions {
        &--logged {
          height: 40px;
          padding: 16px 0;
          @media (max-width: 575px) {
            height: auto;
          }
        }
        &--to_login {
          padding: 16px 0;
          height: auto;
        }
      }
    }
  }
}
</style>