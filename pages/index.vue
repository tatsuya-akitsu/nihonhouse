<template>
  <div id="app">
    <nav id="nav" class="l-nav md-nav">
      <div class="nav-wrapper fle-b">
        <div class="nav-logo">
          <p class="md-text logo-desc">日本の家・檜の家</p>
          <p class="md-text logo-text">日本ハウスHD</p>
          <p class="md-text md-text--style01">2015年&nbsp;東日本ハウスは日本ハウスHDに社名を変更しました</p>
        </div>
        <ul class="nav-list fle-b is-pc">
          <li class="nav-item" v-for="(item, i) in navItems" :key="i">
            <a :href="item.href" class="nav-link" @click="smoothClick">{{ item.navItem }}</a>
          </li>
        </ul>
        <div class="burger-nav is-sp pos-a">
          <div class="burger-btn is-sp" :class="{ 'menu-btn': menuBtn, 'is-open': menuFlg }" @click="menuToggle">
            <span></span><span></span><span></span>
          </div>
        </div>
        <transition>
          <div id="sp_menu" class="nav-list-wrap is-sp" v-show="menuFlg" :style="{ marginTop: headH }">
            <ul class="nav-list">
              <li class="nav-item" v-for="(item, i) in navItems" :key="i">
                <a :href="item.href" class="nav-link" @click="smoothClick">{{ item.navItem }}</a>
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </nav>
    <vueHeader :style="{ marginTop: headH }" />
    <section class="md-section md-section--readme">
      <h2 class="md-ttl md-ttl--h2">マイタウン富士見台中野鷺宮</h2>
      <div class="md-inner">
        <p class="md-text md-text--style02">
          閑静な住宅街「上鷺宮」で暮らすゆとりが<br class="is-sp" />ここにはあります。<br />
          木造注文住宅にこだわってきた<br class="is-sp" />日本ハウスHDがお届けします。<br />
          付近には幼稚園・保育園・小学校・中学校・学習塾・公園が点在し、子育てに最適なエリア。<br />
          また、最寄駅から西武新宿駅まで15分・池袋駅まで15分<br class="is-sp" />なので通勤にも便利な分譲地です。
        </p>
        <div class="intro-wrap">
          <ul class="intro-list">
            <li class="intro-item" v-for="(intro, i) in intro" :key="i">{{ intro.val }}</li>
          </ul>
        </div>
      </div>
    </section>
    <section class="md-section md-section--garally">
      <div class="md-wrapper">
        <originCarousel />
      </div>
    </section>
    <section id="properties" class="md-section md-section--properties">
      <div class="md-wrapper">
        <h2 class="md-ttl md-ttl--h2">物件情報</h2>
        <div class="md-inner">
          <div class="sales-wrap fle-b fle-w">
            <div :id="i" class="md-sales-box" v-for="(item, i) in properties" :key="i">
              <div class="md-sales-img-wrap pos-r">
                <img :src="item.src" alt="" class="md-sales-img pos-a" />
              </div>
              <div class="md-sales-body">
                <p class="md-text prop-num">{{ item.num }}</p>
                <p class="md-text prop-amount">{{ item.amount }}</p>
                <ul class="prop-list">
                  <li class="prop-item" v-for="(val, i) in item.feature" :key="i">{{ val.val }}</li>
                </ul>
                <button id="show-modal" class="md-btn md-btn--style01" @click="showModal = true" v-on:click="checkNum">詳しく見る</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <modal v-if="showModal" :num="selectNum" :item="selectProperty" @close="showModal = false" />
    <section id="facilities" class="md-section md-section--facilities">
      <div class="md-wrapper">
        <h2 class="md-ttl md-ttl--h2">設備・構造</h2>
        <div class="md-inner">
          <div class="sales-wrap fle-b fle-w">
            <div class="md-sales-box" v-for="(item, i) in facilities" :key="i">
              <div class="md-sales-img-wrap pos-r">
                <img :src="item.src" alt="" class="md-sales-img pos-a" />
              </div>
              <div class="md-sales-body">
                <p class="md-text md-text--style04"><span class="facility-num">{{ i + 1 }}</span>{{ item.ttl }}</p>
                <p class="md-text md-text--style02" v-if="item.val.length > 1 && item.val.length < 3">
                  {{ item.val[0] }}<br />
                  {{ item.val[1] }}
                </p>
                <p class="md-text md-text--style02" v-else-if="item.val.length > 3">
                  {{ item.val[0] }}<br />
                  {{ item.val[1] }}<br />
                  {{ item.val[2] }}<br />
                  {{ item.val[3] }}
                </p>
                <p class="md-text md-text--style02" v-else>{{ item.val[0] }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="location" class="md-section md-section--location">
      <h2 class="md-ttl md-ttl--h2">所在地</h2>
      <div class="md-inner">
        <GmapMap
          :center="{lat:35.7298372, lng:139.6283765}"
          :zoom="17"
          map-type-id="terrain"
        >
          <GmapMarker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            :draggable="false"
            @click="center=m.position"
          />
        </GmapMap>
        <a class="md-btn md-btn--style02" href="https://www.google.co.jp/maps/@35.7298372,139.6283765">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title" aria-describedby="desc" role="img" xmlns:xlink="http://www.w3.org/1999/xlink" width="256" height="256">
            <path data-name="layer1" d="M32 2A24 24 0 0 0 8 26c0 .8 0 1.6.1 2.3v.3C10.1 47.6 32 62 32 62s21.9-14.6 23.8-33.3v-.4c.1-.8.1-1.5.1-2.3A24 24 0 0 0 32 2zm0 36a12 12 0 1 1 12-12 12 12 0 0 1-12 12z"></path>
          </svg>
          GoogleMap
        </a>
        <p class="md-text md-text--style02">※地図アプリもしくはカーナビなどに<br class="is-sp" />「東京都中野区上鷺宮5丁目21」と設定してください。</p>
      </div>
    </section>
    <section id="information" class="md-section md-section--information">
      <h2 class="md-ttl md-ttl--h2">周辺環境</h2>
      <div class="md-inner">
        <div class="info-slide-wrap">
          <carousel :perPage="1" :perPageCustom="[[768, 3]]">
            <slide v-for="(item, i) in collection" :key="i">
              <div class="info-img-wrap pos-r">
                <img :src="item.src" alt="" class="pos-a" />
              </div>
              <div class="info-body">
                <p class="md-text md-text--style02">{{ item.val }}</p>
              </div>
            </slide>
          </carousel>
        </div>
        <div class="info-outline">
          <ul class="info-list">
            <li class="info-item" v-for="(item, i) in colOutline" :key="i">
              <p class="md-text info-label">{{ item.ttl }}</p>
              <p class="md-text info-text" v-if="item.val.length > 1">
                {{ item.val[0] }}<br />
                {{ item.val[1] }}
              </p>
              <p class="md-text info-text" v-else>{{ item.val[0] }}</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section id="outline" class="md-section md-section--outline">
      <div class="md-wrapper">
        <h2 class="md-ttl md-ttl--h2">物件概要</h2>
        <div class="md-inner">
          <table class="info-table">
            <tbody>
              <tr v-for="(item, i) in info" :key="i">
                <th v-if="item.head.length > 1">
                  {{ item.head }}<br />
                  {{ item.head02 }}
                </th>
                <th v-else>{{ item.head}}</th>
                <td v-if="item.info.length > 1 && item.info.length < 3">
                  {{ item.info[0].data }}<br />
                  {{ item.info[1].data }}
                </td>
                <td v-else-if="item.info.length > 3">
                  {{ item.info[0].data }}<br />
                  {{ item.info[1].data }}<br />
                  {{ item.info[2].data }}<br />
                  {{ item.info[3].data }}
                </td>
                <td v-else>{{ item.info[0].data }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
    <vueFooter :style="{ marginBottom: footH }" />
    <div id="contact" class="contact-box">
      <a href="http://nihonhouse-saginomiya.com/contacts/" class="md-btn md-btn--style02">お問い合わせはこちら</a>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import vueHeader from '~/components/header.vue'
import vueFooter from '~/components/footer.vue'
import originCarousel from '~/components/carousel.vue'
import modal from '~/components/modal.vue'
import * as ObjItems from '~/assets/js/componentsItems.js'
import smoothScroll from 'smoothscroll'

export default {
  name: 'main',
  components: {
    vueHeader,
    vueFooter,
    originCarousel,
    modal,
  },
  data: () => {
    return {
      navItems: [],
      intro: [],
      properties: [],
      propertyEventNum: 0,
      selectNum: '',
      selectProperty: [],
      facilities: [],
      info: [],
      collection: [],
      colOutline: [],
      markers: [
        {position: { lng: 139.6283765, lat: 35.7298372 }},
        {position: { lng: 139.6283765, lat: 35.7298372 }}
      ],
      showModal: false,
      menuFlg: false,
      headH: '0px',
      footH: '0px',
      menuBtn: true
    }
  },
  created () {
    this.navItems = ObjItems.nav.items
    this.intro = ObjItems.introduction.intro
    this.properties = ObjItems.properties.items
    this.facilities = ObjItems.facilities.items
    this.info = ObjItems.information.items
    this.collection = ObjItems.collection.info
    this.colOutline = ObjItems.collection.outline

  },
  mounted () {
    let h = window.document.getElementById("nav").offsetHeight;
    this.headH = h + "px";

    let fH = window.document.getElementById('contact').offsetHeight
    this.footH = fH + 'px'
  },
  methods: {
    smoothClick(e) {
      const properties = window.document.querySelector('#properties')
      const facilities = window.document.querySelector('#facilities')
      const location = window.document.querySelector('#location')
      const information = window.document.querySelector('#information')
      const outline = window.document.querySelector('#outline')

      if (e.target.href === '#properties') {
        smoothScroll(properties)
      } else if (e.target.href === '#facilities') {
        smoothScroll(facilities)
      } else if (e.target.href === '#location') {
        smoothScroll(location)
      } else if (e.target.href === '#information') {
        smoothScroll(information)
      } else if (e.target.href === '#outline') {
        smoothScroll(outline)
      }

      this.menuFlg = !this.menuFlg
    },
    checkNum (event) {
      if (event) {
        const num = event.target.parentNode.parentNode.id
        const id = parseInt(num, 10)
        this.propertyEventNum = id
        for (let i = 0; i < this.properties.length; i++) {
          if (this.propertyEventNum === i) {
            this.selectNum = i
            this.selectProperty = this.properties[i]
          }
        }
      }
    },
    menuToggle () {
      this.menuFlg = !this.menuFlg
    }
  }
}
</script>
