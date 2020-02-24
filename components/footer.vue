<template>
  <footer
    id="footer"
    class="l-footer md-footer"
    :class="{'md-footer--contact': this.$router.currentRoute.name === 'contact' || this.$router.currentRoute.name === 'contact-complete'}">
    <div class="md-wrapper fle-b fle-w">
      <ul class="md-footer-list fle-b">
        <li class="footer-item"><a href="https://www.nihonhouse-hd.co.jp/about/" class="footer-link">サイトのご利用について</a></li>
        <li class="footer-item"><a href="https://www.nihonhouse-hd.co.jp/privacy/" class="footer-link">プライバシーポリシー</a></li>
      </ul>
      <p class="md-text copyright"><small>&copy;NIHON HOUSE HOLDINGS Co.,Ltd. All Rights Reserved.</small></p>
    </div>
  </footer>
</template>
