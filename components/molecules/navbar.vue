<template>
  <div class="navbar">
    <div class="navbar__inner">
      <nuxt-link class="navbar-brand" :to="{ name: 'index' }" @click.native="emptyMenu">Playsell</nuxt-link>
      <el-menu class="navbar-menu" v-model="activeMenu" mode="horizontal" menu-trigger="click" ref="navigation"
               @select="selectMenu" @open="selectMenu('all_games')" @close="emptyMenu">
        <el-menu-item index="samp" :class="{ 'active': (activeMenu === 'samp') }">SAMP</el-menu-item>
        <el-menu-item index="crmp" :class="{ 'active': (activeMenu === 'crmp') }">CRMP</el-menu-item>
        <el-menu-item index="wot" :class="{ 'active': (activeMenu === 'wot') }">WOT</el-menu-item>
        <el-menu-item index="gta5" :class="{ 'active': (activeMenu === 'gta5') }">GTA 5</el-menu-item>
        <el-menu-item index="steam" :class="{ 'active': (activeMenu === 'steam') }">Steam</el-menu-item>
        <el-menu-item index="minecraft" :class="{ 'active': (activeMenu === 'minecraft') }">Minecraft</el-menu-item>
        <el-submenu index="all_games" popper-class="navbar-submenu-popper" :class="{ 'active': (activeMenu === 'all_games') }">
          <template slot="title">Все игры</template>
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
        <nuxt-link class="navbar-link" :to="{ name: 'index' }">Войти</nuxt-link>
        <nuxt-link class="navbar-link" :to="{ name: 'index' }">Зарегистрироваться</nuxt-link>
      </div>
      <div class="navbar-actions navbar-actions--logged" v-if="logged">
        <div class="navbar-actions__inner">
          <button class="navbar-actions__button" type="button">
            <icon name="plus" />
          </button>
          <button class="navbar-actions__button" type="button">
            <icon name="sms" />
          </button>
          <button class="navbar-actions__button" type="button">
            <icon name="bell" />
          </button>
        </div>
        <div class="navbar-balance">
          <icon name="pay_credit_card" />
          <span>45 000,12 ₽</span>
        </div>
        <div class="navbar-user">
          <div class="navbar-user__inner">
            <div class="navbar-user-label">Danil Gortsuev</div>
            <div class="navbar-user-image" :style="{ backgroundImage: 'url('+require(`@/assets/design/avatar.png`)+')' }" />
          </div>
        </div>
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
      this.activeMenu = index
    },
    emptyMenu () {
      this.activeMenu = ''
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
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
  &-brand {
    font-family: Arial, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 24px;
    letter-spacing: 0.01em;
    margin-top: map-get($spacings, 5);
    margin-bottom: map-get($spacings, 5);
    margin-right: map-get($spacings, 6);
    height: 32px;
    display: flex;
    align-items: center;
    color: $grey-600;
    min-width: 90px;
    max-width: 90px;
    width: 90px;
    white-space: nowrap;
  }

  &-menu {
    &.el-menu {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      background-color: transparent;
      &--horizontal {
        min-width: 425px;
        max-width: 425px;
        width: 100%;
        border-bottom: none;
      }
      &::after, &::before {
        content: inherit;
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
      &:hover {
        background-color: transparent;
        color: $primary;
      }
      &.active {
        color: $primary;
        border-bottom: none;
        box-shadow: inset 0px -2px 0px #3366FF;
      }
    }
  }

  &-actions {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    margin-left: auto;

    &--to_login {
      padding-top: 26px;
      padding-bottom: 26px;
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
      padding: 16px 0;
      align-items: center;
    }
  }



  &-balance {
    display: flex;
    align-items: center;
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
    &__inner {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 4px 8px;
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
}
</style>