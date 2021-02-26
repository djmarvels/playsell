<template>
  <div class="index-page">
    <div class="index-page-games">
      <nuxt-link class="index-page-game" :to="game.link" v-for="(game, game_id) in games" :key="game_id"
                 :style="{ backgroundImage: `url(${require(`~/assets/design/${game.image}.png`)})` }" />
    </div>
    <div class="cards cards--index">
      <div class="cards-title">Рекомендации для вас</div>
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
  </div>
<!--  <div class="ui mt-6">-->
<!--    <div class="ui_inner">-->
<!--      <div class="ui-block">-->
<!--        <div class="ui-block-header mb-6"><typo heading="1">Typography</typo></div>-->
<!--        <div class="ui-block-body">-->
<!--          <div><typo heading="1" color="primary">Heading 1</typo></div>-->
<!--          <div><typo heading="2" color="grey">Heading 2</typo></div>-->
<!--          <div><typo body="16" color="success">Body 16</typo></div>-->
<!--          <div><typo body="14" color="error">Body 14</typo></div>-->
<!--          <div><typo body="12" color="warning">Body 12</typo></div>-->
<!--          <div><typo lead="14" color="primary-600">Lead 14</typo></div>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="ui-block">-->
<!--        <div class="ui-block-header"><typo heading="1">Navbars</typo></div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script>
import typo from '@/components/atoms/typography'
import icon from '@/components/atoms/icon'
export default {
  name: "index",
  components: {
    typo, icon
  },
  methods: {
    price_format (number) {
      return new Intl.NumberFormat('Ru-ru', { currency: 'RUB', style: 'decimal' }).format(number);
    }
  },
  data: () => ({
    games: [
      { image: 'dota2', link: { to: { name: 'index' } } },
      { image: 'gta_sa', link: { to: { name: 'index' } } },
      { image: 'gta_crmp', link: { to: { name: 'index' } } },
      { image: 'wot', link: { to: { name: 'index' } } },
      { image: 'wot_blitz', link: { to: { name: 'index' } } },
      { image: 'minecraft', link: { to: { name: 'index' } } },
      { image: 'apex', link: { to: { name: 'index' } } },
      { image: 'pubg', link: { to: { name: 'index' } } },
      { image: 'steam', link: { to: { name: 'index' } } },
      { image: 'uplay', link: { to: { name: 'index' } } },
      { image: 'origin', link: { to: { name: 'index' } } },
      { image: 'epicgames', link: { to: { name: 'index' } } },
    ],
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
    ]
  })
}
</script>

<style scoped lang="scss">
@import "@/styles/interface/colors.scss";
@import "@/styles/interface/mixins.scss";
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
.index-page {
  &-games {
    margin: 48px 0;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    @media (max-width: 575px) {
      padding-left: 20px;
      padding-right: 20px;
    }
  }
  &-game {
    display: block;
    flex-basis: 180px;
    height: 260px;
    position: relative;
    overflow: hidden;
    border-radius: 2px;
    background-repeat: no-repeat;
    background-position: center;
    @media (max-width: 1199px) {
      flex-basis: calc(100% / 4 - 20px);
      background-size: contain;
      height: 328px;
    }
    @media (max-width: 991px) {
      height: 249px;
    }
    @media (max-width: 767px) {
      height: 175px;
    }
    @media (max-width: 575px) {
      flex-basis: calc(100% / 3 - 16px);
      background-size: cover;
      height: 230px;
    }
    @media (max-width: 500px) {
      height: 199px;
    }
    @media (max-width: 450px) {
      height: 175px;
    }
    @media (max-width: 425px) {
      height: 252px;
    }
    @media (max-width: 400px) {
      height: 240px;
    }
    @media (max-width: 375px) {
      height: 220px;
    }
    @media (max-width: 350px) {
      height: 200px;
    }
    @media (max-width: 425px) {
      flex-basis: calc(100% / 2 - 16px);
    }
    &::before {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 1;
      background-color: $grey-600;
      opacity: 0;
      transition: opacity 350ms;
    }
    &:hover {
      &::before {
        opacity: .7;
      }
    }
    @media (min-width: 1200px) {
      &:not(:nth-child(6n)):not(:nth-child(12n)) {
        margin-right: 20px;
      }
      &:nth-last-child(1),&:nth-last-child(2),&:nth-last-child(3),&:nth-last-child(4),&:nth-last-child(5),&:nth-last-child(6) {
        margin-top: 16px;
      }
    }
    @media (max-width: 1199px) and (min-width: 576px) {
      &:not(:nth-child(4n)):not(:nth-child(8n)):not(:nth-child(12n)) {
        margin-right: 20px;
      }
      &:not(:nth-last-child(1)):not(:nth-last-child(2)):not(:nth-last-child(3)):not(:nth-last-child(4)) {
        margin-bottom: 16px;
      }
    }
    @media (max-width: 575px) and (min-width: 426px) {
      &:not(:nth-last-child(1)):not(:nth-last-child(2)):not(:nth-last-child(3)) {
        margin-bottom: 16px;
      }
    }
    @media (max-width: 425px) {
      &:not(:nth-last-child(1)):not(:nth-last-child(2)) {
        margin-bottom: 16px;
      }
    }
  }
}
</style>