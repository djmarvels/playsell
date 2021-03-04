<template>
  <div class="catalog">
    <ul class="breadcrumbs breadcrumbs--catalog">
      <li><nuxt-link :to="{ name: 'index' }">Главная</nuxt-link></li>
      <li><nuxt-link :to="{ name: cInfo.route }">{{ cInfo.title }}</nuxt-link></li>
    </ul>
    <h1 class="catalog-title">{{ cInfo.title }} аккаунты</h1>
    <ul class="catalog-menu">
      <li v-for="(item, item_id) in catalogMenu" :key="item_id" v-if="(!showCatalogMenu) ? (item_id < 9) : (item_id < catalogMenu.length)" class="catalog-menu__item">
        <nuxt-link :to="'/'+cInfo.route+'?slug='+item.slug" class="catalog-menu__link" :class="{ 'catalog-menu__link--empty': !item.count }">
          {{ item.title }} <span>{{ item.count }}</span>
        </nuxt-link>
      </li>
    </ul>
    <button class="catalog-menu-action" type="button" @click="showCatalogMenu = !showCatalogMenu">{{ !showCatalogMenu ? 'Показать ещё' : 'Скрыть' }}</button>
    <div class="card card--catalog-top">
      <div class="card-header">
        <div class="card-title">Популярные и рекомендуемые товары</div>
        <nuxt-link class="card-link" :to="{ name: cInfo.route }">Разместить товар здесь</nuxt-link>
      </div>
      <div class="card-body">
        <div class="owl-carousel owl-theme catalog-carousel" ref="catalog_carousel">
          <div class="item" v-for="(card, card_id) in recommends" :key="card_id">
            <nuxt-link class="card card--catalog" :to="{ name: 'index' }">
              <div class="card-title">{{ card.title }}</div>
              <div class="card-text" v-html="card.text" />
              <div class="card-price">
                <span class="card-price__inner" :class="{ 'card-price__inner--primary': card.price >= 10000 }">{{ price_format(card.price) }} ₽</span>
                <span class="card-price__sale" v-if="card.sale">{{ price_format(card.sale) }} ₽</span>
              </div>
              <div class="card-author">
                <div class="card-rating">
                  <icon name="Star_Full" v-for="rate in Math.floor(card.rating)" :key="rate" />
                  <icon name="Star_Fifty" v-if="card.rating - Math.floor(card.rating)" />
                  <icon name="Star_Zero" v-for="rate in Math.floor(5 - card.rating) " :key="rate" />
                </div>
                <div class="card-author__inner" :class="{ 'card-author__inner--success': card.price >= 10000 }">{{ card.seller }}</div>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="catalog-items-header">
      <div class="catalog-items-header__left">
        <el-switch v-model="SellerOnSite" :active-value="true" active-text="Продавец на сайте" :inactive-value="false" :width="32" />
        <el-switch v-model="VerifiedSellers" :active-value="true" active-text="Провереный продавец" :inactive-value="false" :width="32" />
      </div>
      <div class="catalog-items-header__right">
        <el-button type="primary" native-type="button">Продать аккаунт</el-button>
        <el-input v-model="catalogSearch" placeholder="Поиск по ключевым словам" class="el-input--search">
          <el-button slot="append" type="icon">
            <icon name="search" />
          </el-button>
        </el-input>
      </div>
    </div>
    <div class="items-sort">
      <div class="items-sort__header">Сортировать:</div>
      <div class="items-sort__body">
        <button type="button" class="items-sort__button items-sort__button--active">По новизне</button>
        <button type="button" class="items-sort__button">По рейтингу продавца</button>
        <button type="button" class="items-sort__button">По популярности</button>
        <button type="button" class="items-sort__button">Сначала дешевые</button>
        <button type="button" class="items-sort__button">Сначала дорогие</button>
      </div>
    </div>
    <div class="cards cards--index" v-if="!isPlayValues">
      <div class="cards-body">
        <nuxt-link class="card" v-for="(card, card_id) in recommends" :key="card_id" :to="{ name: 'index' }">
          <div class="card-title">{{ card.title }}</div>
          <div class="card-text" v-html="card.text" />
          <div class="card-price">
            <span class="card-price__inner" :class="{ 'card-price__inner--primary': card.price >= 10000 }">{{ price_format(card.price) }} ₽</span>
            <span class="card-price__sale" v-if="card.sale">{{ price_format(card.sale) }} ₽</span>
          </div>
          <div class="card-author">
            <div class="card-rating">
              <icon name="Star_Full" v-for="rate in Math.floor(card.rating)" :key="rate" />
              <icon name="Star_Fifty" v-if="card.rating - Math.floor(card.rating)" />
              <icon name="Star_Zero" v-for="rate in Math.floor(5 - card.rating) " :key="rate" />
            </div>
            <div class="card-author__inner" :class="{ 'card-author__inner--success': card.price >= 10000 }">{{ card.seller }}</div>
          </div>
        </nuxt-link>
      </div>
    </div>
    <div class="cards cards--index" v-if="isPlayValues">
      <div class="cards-body">
        <nuxt-link class="card card--money" v-for="(m_card, m_card_id) in money_items" :key="m_card_id" :to="{ name: 'index' }">
          <div class="card-title">{{ m_card.title }}</div>
          <div class="card-text" v-html="m_card.text" />
          <div class="card-price">
            <span class="card-price__inner">{{ m_card.price }}</span>
          </div>
          <div class="card-quantity">{{ m_card.quantity }}</div>
          <div class="card-author">
            <div class="card-rating">
              <icon name="Star_Full" v-for="rate in Math.floor(m_card.rating)" :key="rate" />
              <icon name="Star_Fifty" v-if="m_card.rating - Math.floor(m_card.rating)" />
              <icon name="Star_Zero" v-for="rate in Math.floor(5 - m_card.rating) " :key="rate" />
            </div>
            <div class="card-author__inner">{{ m_card.seller }}</div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import icon from '@/components/atoms/icon'
export default {
  name: "catalog",
  components: {
    icon
  },
  computed: {
    cInfo () {
      const routesTitles = [ { title: 'SAMP', route: 'samp' }, { title: 'CRMP', route: 'crmp' }, { title: 'World of Tanks', route: 'wot' }, { title: 'GTA 5', route: 'gta5' }, { title: 'Steam', route: 'steam' }, { title: 'Minecraft', route: 'minecraft' } ]
      return routesTitles.find((value) => ( value.route === this.$route.name ))
    },
    isPlayValues () {
      if (typeof this.$route.query.slug !== 'undefined') {
        if (this.$route.query.slug === 'play-values') {
          return true
        }
      }
      return false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.catalogCarousel = jQuery(this.$refs.catalog_carousel).owlCarousel({
        dots: false, nav: false, margin: 12,
      })
      this.catalogCarousel.trigger('refresh.owl.carousel')
      this.catalogCarousel.trigger('update.owl.carousel')
    })
  },
  destroyed() {
    if (this.catalogCarousel != null) {
      this.catalogCarousel.trigger('destroy.owl.carousel')
      this.catalogCarousel = null
    }
  },
  methods: {
    price_format (number) {
      return new Intl.NumberFormat('Ru-ru', { currency: 'RUB', style: 'decimal' }).format(number);
    }
  },
  data: () => {
    return {
      catalogMenu: [
        { title: 'Аккаунты', count: 1500, slug: 'accounts' },
        { title: 'Предметы', count: 321, slug: 'subjects' },
        { title: 'Игровые ценности', count: 3, slug: 'play-values' },
        { title: 'Услуги', count: 1, slug: 'services' },
        { title: 'Radmir RP', count: 66, slug: 'radmir-rp' },
        { title: 'Amazing RP', count: 1322, slug: 'amazing-rp' },
        { title: 'Rodina RP', count: 100, slug: 'rodina-rp' },
        { title: 'Namalsk RP', count: 12, slug: 'namalsk-rp' },
        { title: 'GUCCI RP', count: 0, slug: 'gucci-rp' },
        { title: 'Mania RP', count: 10, slug: 'mania-rp' },
        { title: 'Skrillax RP', count: 0, slug: 'skrillax-rp' },
      ],
      showCatalogMenu: false,
      recommends: [
        { title: 'Radmir RP - Сервер 06', text: 'R-RP 04 2-6 LVL 1.100.000 НА РУКАХ ВАЗ 2101 (100.000)', price: 5000, sale: 10000, rating: 4.5, seller: 'Rozetka' },
        { title: 'Rodina RP - Восточный', text: '⚡Уровень 2, есть 273к виртов, почта не привязана⚡', price: 90, sale: 150, rating: 4.5, seller: 'Rozetka' },
        { title: 'Next RP - Кавказский', text: '4 Lvl/ДОСТУПА К ПОЧТЕ НЕТ★ ОБЩ. ИМУЩ-ВО 54.000 ТЫСЯЧ ☆', price: 18, sale: 0, rating: 4.5, seller: 'Queen' },
        { title: 'Province RP - Сервер 01', text: '⚡Уровень 20-30, есть 6,352,000 виртов, лицензия B.C.D⚡', price: 1470, sale: 0, rating: 4.5, seller: 'BigSeller' },
        //
        { title: 'Next RP - Кавказский', text: '★ 5 Lvl ☆ ДОСТУПА К ПОЧТЕ НЕТ★ ОБЩЕЕ ИМУЩ-ВО 50.000 ТЫС☆', price: 55, sale: 0, rating: 4.5, seller: 'Queen' },
        { title: 'Namalsk RP - Odin', text: 'Уровень 6, Наличные:110000 Мотик: ИЖ планета', price: 10990, sale: 14450, rating: 4.5, seller: 'Rozetka' },
        { title: 'Next RP - Сибирский', text: '6 LvL/ДОСТУПА К ПОЧТЕ НЕТ★ОБЩЕЕ. ИМЩ-ВО 118.000ТЫС☆', price: 40, sale: 0, rating: 4.5, seller: 'Queen' },
        { title: 'Rodina RP - Южный', text: '⚡Уровень 9, есть 103к виртов, VIP Platinum, почта не привязана⚡', price: 390, sale: 450, rating: 4.5, seller: 'Rozetka' },
        //
        { title: 'Steam', text: 'PUBG | RUST | DayZ | CS PRIME | 4800 balance | КТ', price: 255, sale: 0, rating: 4.5, seller: 'federoid' },
        { title: 'Fortnite', text: '620 vb, 50 скинов 30 кирок 30+ дельтов', price: 205, sale: 0, rating: 4.5, seller: 'Lildan4' },
        { title: 'Clash Royale', text: 'Акаунт Clash Royale', price: 150, sale: 0, rating: 4.5, seller: '4yba4ek45rus' },
        { title: 'Rodina RP - Южный', text: 'в ангаре T95/FV4201 Chieftain и Объект 907', price: 1800, sale: 0, rating: 4.5, seller: 'Tracerkor' },
      ],
      money_items: [
        { title: 'Rodina RP - ЦО', text: 'Постоянным покупателям скидки до 20%;Постоянным покупателям скидки', price: '109 ₽ за 1 кк', quantity: '323 кк', rating: 2, seller: 'Rozetka' },
        { title: 'Rodina RP - ЦО', text: 'Постоянным покупателям скидки до 20%;Постоянным покупателям скидки', price: '109 ₽ за 1 кк', quantity: '323 кк', rating: 0, seller: 'Rozetka' },
        { title: 'Rodina RP - ЦО', text: 'Постоянным покупателям скидки до 20%;Постоянным покупателям скидки', price: '109 ₽ за 1 кк', quantity: '323 кк', rating: 4.5, seller: 'Queen' },
        { title: 'Rodina RP - ЦО', text: 'Постоянным покупателям скидки до 20%;Постоянным покупателям скидки', price: '109 ₽ за 1 кк', quantity: '323 кк', rating: 4.5, seller: 'Queen' },
        //
        { title: 'Rodina RP - ЦО', text: 'Постоянным покупателям скидки до 20%;Постоянным покупателям скидки', price: '109 ₽ за 1 кк', quantity: '323 кк', rating: 5, seller: 'Queen' },
        { title: 'Rodina RP - ЦО', text: 'Постоянным покупателям скидки до 20%;Постоянным покупателям скидки', price: '109 ₽ за 1 кк', quantity: '323 кк', rating: 3.5, seller: 'Queen' },
        { title: 'Rodina RP - ЦО', text: 'Постоянным покупателям скидки до 20%;Постоянным покупателям скидки', price: '109 ₽ за 1 кк', quantity: '323 кк', rating: 3, seller: 'Queen' },
        { title: 'Rodina RP - ЦО', text: 'Постоянным покупателям скидки до 20%;Постоянным покупателям скидки', price: '109 ₽ за 1 кк', quantity: '323 кк', rating: 4.5, seller: 'Queen' },
        //
        { title: 'Rodina RP - ЦО', text: 'Постоянным покупателям скидки до 20%;Постоянным покупателям скидки', price: '109 ₽ за 1 кк', quantity: '323 кк', rating: 4, seller: 'federoid' },
        { title: 'Rodina RP - ЦО', text: 'Постоянным покупателям скидки до 20%;Постоянным покупателям скидки', price: '109 ₽ за 1 кк', quantity: '323 кк', rating: 3, seller: 'Lildan4' },
        { title: 'Rodina RP - ЦО', text: 'Постоянным покупателям скидки до 20%;Постоянным покупателям скидки', price: '109 ₽ за 1 кк', quantity: '323 кк', rating: 2, seller: '4yba4ek45rus' },
        { title: 'Rodina RP - ЦО', text: 'Постоянным покупателям скидки до 20%;Постоянным покупателям скидки', price: '109 ₽ за 1 кк', quantity: '323 кк', rating: 4.5, seller: 'Trackerkor' },
        //
        { title: 'Rodina RP - ЦО', text: 'Постоянным покупателям скидки до 20%;Постоянным покупателям скидки', price: '109 ₽ за 1 кк', quantity: '323 кк', rating: 2, seller: 'BigSeller' },
        { title: 'Rodina RP - ЦО', text: 'Постоянным покупателям скидки до 20%;Постоянным покупателям скидки', price: '109 ₽ за 1 кк', quantity: '323 кк', rating: 1, seller: 'Rozetka' },
        { title: 'Rodina RP - ЦО', text: 'Постоянным покупателям скидки до 20%;Постоянным покупателям скидки', price: '109 ₽ за 1 кк', quantity: '323 кк', rating: 4.5, seller: 'Queen' },
        { title: 'Rodina RP - ЦО', text: 'Постоянным покупателям скидки до 20%;Постоянным покупателям скидки', price: '109 ₽ за 1 кк', quantity: '323 кк', rating: 4.5, seller: 'federoid' },
        //
        { title: 'Rodina RP - ЦО', text: 'Постоянным покупателям скидки до 20%;Постоянным покупателям скидки', price: '109 ₽ за 1 кк', quantity: '323 кк', rating: 4.5, seller: 'Rozetka' },
        { title: 'Rodina RP - ЦО', text: 'Постоянным покупателям скидки до 20%;Постоянным покупателям скидки', price: '109 ₽ за 1 кк', quantity: '323 кк', rating: 4.5, seller: 'Queen' },
        { title: 'Rodina RP - ЦО', text: 'Постоянным покупателям скидки до 20%;Постоянным покупателям скидки', price: '109 ₽ за 1 кк', quantity: '323 кк', rating: 4.5, seller: 'Tracerkor' },
        { title: 'Rodina RP - ЦО', text: 'Постоянным покупателям скидки до 20%;Постоянным покупателям скидки', price: '109 ₽ за 1 кк', quantity: '323 кк', rating: 4.5, seller: 'Rozetka' },
        //
        { title: 'Rodina RP - ЦО', text: 'Постоянным покупателям скидки до 20%;Постоянным покупателям скидки', price: '109 ₽ за 1 кк', quantity: '323 кк', rating: 4.5, seller: 'Queen' },
        { title: 'Rodina RP - ЦО', text: 'Постоянным покупателям скидки до 20%;Постоянным покупателям скидки', price: '109 ₽ за 1 кк', quantity: '323 кк', rating: 4.5, seller: '4yba4ek45rus' },
        { title: 'Rodina RP - ЦО', text: 'Постоянным покупателям скидки до 20%;Постоянным покупателям скидки', price: '109 ₽ за 1 кк', quantity: '323 кк', rating: 4.5, seller: 'Rozetka' },
        { title: 'Rodina RP - ЦО', text: 'Постоянным покупателям скидки до 20%;Постоянным покупателям скидки', price: '109 ₽ за 1 кк', quantity: '323 кк', rating: 4.5, seller: 'Lildan4' },
      ],
      catalogCarousel: null,
      catalogSearch: '',
      SellerOnSite: true,
      VerifiedSellers: false
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/interface/colors.scss";
@import "@/styles/interface/mixins.scss";
.items-sort {
  display: flex;
  align-items: center;
  margin-top: 32px;
  &__header {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: $grey-500;
    margin-right: 16px;
  }
  &__body {
    display: flex;
    align-items: center;
  }
  &__button {
    @include empty-button();
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: $grey-500;
    transition: color 350ms;
    &:not(:last-child) {
      margin-right: 16px;
    }
    &:hover {
      color: $primary;
    }
    &--active {
      color: $primary;
    }
  }
}
.catalog {
  &-carousel {
    margin-top: 32px;
  }
  &-title {
    font-style: normal;
    font-weight: 600;
    font-size: 26px;
    line-height: 40px;
    color: $grey-600;
    font-feature-settings: 'pnum' on, 'lnum' on;
    margin-top: 24px;
  }
  &-menu {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0;
    margin: 16px 0 0;
    list-style-type: none;
    &__item {
      display: block;
      margin: 8px 0;
      &:not(:last-child) {
        margin-right: 32px;
      }
    }
    &__link {
      display: flex;
      align-items: flex-end;
      justify-content: flex-start;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      font-feature-settings: 'pnum' on, 'lnum' on;
      color: $grey-600;
      transition: color 350ms;
      span {
        margin-left: 8px;
        font-family: 'Open Sans', sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 20px;
        color: $grey-500;
        font-feature-settings: 'pnum' on, 'lnum' on;
        position: relative;
        top: .5px;
      }
      &--empty {
        color: $grey-500;
      }
      &:hover {
        color: $primary;
      }
      &.nuxt-link-exact-active {
        color: $primary;
      }
    }
    &-action {
      display: block;
      background: transparent;
      border: 0;
      outline: none;
      padding: 0;
      margin: 8px 0;
      cursor: pointer;
      font-family: 'Open Sans', sans-serif;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 20px;
      font-feature-settings: 'tnum' on, 'lnum' on;
      color: $primary;
      transition: color 350ms;
      &:hover {
        color: $primary-600;
      }
    }
  }
  &-items-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 24px;
    &__left, &__right {
      display: flex;
      align-items: center;
    }
    &__left {
      .el-switch {
        &:not(:last-child) {
          margin-right: 16px;
        }
      }
    }
    &__right {
      .el-button {
        margin-right: 16px;
      }
    }
  }
}
</style>