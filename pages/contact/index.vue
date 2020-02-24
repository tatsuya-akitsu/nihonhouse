<template>
  <div id="app">
    <header class="l-header md-header--contact">
      <div class="nav-logo">
        <p class="md-text logo-desc">日本の家・檜の家</p>
        <p class="md-text logo-text">日本ハウスHD</p>
        <p class="md-text md-text--style01">2015年&nbsp;東日本ハウスは日本ハウスHDに社名を変更しました</p>
      </div>
    </header>
    <section class="md-section md-section--form">
      <div class="md-wrapper">
        <h2 class="md-ttl md-ttl--h2">資料請求・お問い合わせフォーム</h2>
        <div class="md-inner">
          <form
            id="contactForm"
            class="md-form"
            name="inquiryform"
            novalidate="true"
            action="./postmail.cgi"
            method="post"
          >
            <p v-if="errors.length">
              <b>Please correct the following error(s):</b>
              <ul>
                <li v-for="(error, i) in errors" :key="i">{{ error }}</li>
              </ul>
            </p>
            <div class="md-form-item fle-r">
              <label>
                <span class="md-form-label">お名前</span>
                <span class="md-form-icon">必須</span>
              </label>
              <input
                type="text"
                name="お名前"
                v-model="name"
                v-validate="'required|name'"
                placeholder="田中 太郎"
                id="name"
                class="md-form-control"
                @input="fetchAutoKana"
              />
            </div>
            <div class="md-form-item fle-r">
              <label>
                <span class="md-form-label">お名前（ふりがな）</span>
                <span class="md-form-icon">必須</span>
              </label>
              <input
                type="text"
                name="お名前（ふりがな）"
                v-model="kana"
                v-validate="'required|kana'"
                placeholder="タナカ タロウ"
                id="kana"
                class="md-form-control"
              />
            </div>
            <div class="md-form-item fle-r">
              <label>
                <span class="md-form-label">Eメールアドレス</span>
                <span class="md-form-icon">必須</span>
              </label>
              <input
                type="email"
                name="Eメールアドレス"
                v-model="email"
                v-validate="'required|email'"
                placeholder="sample@sample.com"
                class="md-form-control"
              />
            </div>
            <div class="md-form-item fle-r">
              <label>
                <span class="md-form-label">電話番号</span>
                <span class="md-form-icon">必須</span>
              </label>
              <input
                type="tell"
                name="電話番号"
                v-model="tell"
                v-validate="'required|tel'"
                placeholder="090-1234-5678"
                class="md-form-control is-small"
              />
            </div>
            <div class="md-form-wrap fle-r">
              <label>
                <span class="md-form-label">住所</span>
                <span class="md-form-icon">必須</span>
              </label>
              <div class="md-form-container">
                <div class="md-form-item">
                  <label>
                    <span class="md-form-label">郵便番号</span>
                  </label>
                  <input
                    type="number"
                    name="郵便番号"
                    v-model="zipCode"
                    v-validate="'required|zipCode'"
                    placeholder="1010003"
                    class="md-form-control is-small"
                  />
                </div>
                <div class="md-form-item">
                  <label>
                    <span class="md-form-label">都道府県</span>
                  </label>
                  <select
                    name="都道府県"
                    v-model="selected"
                    v-validate="'required|prefectures'"
                    form="contactForm"
                    class="md-form-control"
                  >
                    <option v-for="(item, i) in prefectureList" :key="i" :value="item">{{ item }}</option>
                  </select>
                </div>
                <div class="md-form-item">
                  <label>
                    <span class="md-form-label">市区町村</span>
                  </label>
                  <input
                    type="text"
                    name="市区町村"
                    v-model="city"
                    v-validate="'required|city'"
                    placeholder="千代田区"
                    class="md-form-control"
                  />
                </div>
                <div class="md-form-item">
                  <label>
                    <span class="md-form-label">番地・建物名</span>
                  </label>
                  <p class="md-text md-text--style02">例) 霞ヶ関1丁目3-2 アーバンハイツ霞ヶ関302</p>
                  <input
                    type="text"
                    name="番地・建物名"
                    v-model="address"
                    v-validate="'required|address'"
                    placeholder="霞が関1丁目3-2"
                    class="md-form-control"
                  />
                </div>
              </div>
            </div>
            <div class="md-form-item fle-r">
              <label>
                <span class="md-form-label">お問い合わせ内容</span>
                <span class="md-form-icon">必須</span>
              </label>
              <textarea
                name="お問い合わせ内容"
                v-model="inquiry"
                v-validate="'required|inquiry'"
                form="contactForm"
                placeholder="お問い合わせ内容"
                class="md-form-control"
              />
            </div>
            <p class="md-text md-text--style03">
              ※ご入力いただいた個人情報は、<a href="" target="_blank" class="md-link">「株式会社日本ハウスホールディングスお客様個人情報保護基本方針」</a>に記載されている利用目的にのみ利用します。
            </p>
            <button type="submit" name="button" class="md-btn md-btn--style03" @click="checkInquiry">送信</button>
          </form>
        </div>
      </div>
    </section>
    <vueFooter />
  </div>
</template>

<script>
import axios from 'axios'
import historykana from 'historykana'
import * as prefecture from '~/assets/js/prefectures.js'
import vueFooter from '~/components/footer.vue'

export default {
  name: 'contact',
  components: {
    vueFooter,
  },
  data: () => {
    return {
      errors: [],
      name: '',
      kana: '',
      history: [],
      email: '',
      tell: '',
      zipCode: '',
      prefectureList: [],
      selected: '北海道',
      city: '',
      address: '',
      inquiry: '',
    }
  },
  created () {
    this.prefectureList = prefecture.prefectures.prefectureItems
  },
  watch: {
    async zipCode() {
      if (this.zipCode.length < 8) {
        const ip = await this.$axios.$get(`https://api.zipaddress.net/?zipcode=${this.zipCode}`)
        this.selected = ip.data.pref
        this.city = ip.data.city
        this.address = ip.data.town
      }
    }
  },
  methods: {
    fetchAutoKana(input) {
      this.history.push(input.target.value)
      this.kana = historykana(this.history)
    },
    checkInquiry(e) {
      this.errors = []

      if (!this.name) {
        errors.push('お名前を入力してください')
      }
      if (!this.email) {
        errors.push('メールアドレスを入力してください')
      } else if (!this.validateEmail(this.email)) {
        errors.push('メールアドレスの形式が違います。')
      }
      if (!this.zipCode) {
        errors.push('郵便番号を入力してください')
      } else if (this.zipCode.length === 8) {
        errors.push('郵便番号の桁数が違います')
      }
      if (!this.selected) {
        errors.push('都道府県を入力してください')
      }
      if (!this.city) {
        errors.push('市区町村を入力してください')
      }
      if (!this.address) {
        errors.push('番地・建物名を入力してください')
      }
      if (!this.inquiry) {
        errors.push('お問い合わせ内容の記入をお願いします')
      }

      if(!this.errors.length) {
        return true
      }
    },
    validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email)
    }
  }
}
</script>
