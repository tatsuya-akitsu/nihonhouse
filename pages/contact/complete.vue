<template>
  <div id="app">
    <header class="l-header md-header--contact">
      <div class="nav-logo">
        <p class="md-text logo-desc">日本の家・檜の家</p>
        <p class="md-text logo-text">日本ハウスHD</p>
        <p class="md-text md-text--style01">2015年&nbsp;東日本ハウスは日本ハウスHDに社名を変更しました</p>
      </div>
    </header>
    <section class="md-section md-section--complete">
      <div class="md-wrapper">
        <h2 class="md-ttl md-ttl--h2">資料請求・お問い合わせフォーム</h2>
        <div class="md-inner">
          <p class="md-text md-text--style04">
            お問い合わせいただき誠にありがとうございます。<br />
            ご入力いただきましたメールアドレスに<br class="is-sp" />自動返信メールをお送りいたしました。<br />
            弊社スタッフより<br class="is-sp" />追ってご連絡をさせていただきます。
          </p>
          <button class="md-btn md-btn--style02" @click="$router.push('/')">トップページへ</button>
        </div>
      </div>
    </section>
    <vueFooter />
  </div>
</template>

<script>
import vueFooter from '~/components/footer.vue'

export default {
  name: 'complete',
  components: {
    vueFooter,
  },
  data: () => {
    return {}
  }
}
</script>
