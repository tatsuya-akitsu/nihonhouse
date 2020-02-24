<template>
  <transition name="modal">
    <div class="modal-mask pos-a">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header pos-r">
            <slot name="header">{{ item.num }}              <button class="modal-default-button pos-a" @click="$emit('close')"><img src="/images/close.png" alt="" /></button></slot>
          </div>
          <div class="modal-body">
            <slot name="body">
              <div class="modal-inner">
                <originCarousel :images="thumbs" />
                <ul class="prop-list">
                  <li class="prop-item" v-for="(val, i) in item.feature" :key="i">{{ val.val }}</li>
                </ul>
                <p class="md-text prop-amount">{{ item.amount }}</p>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Vue from 'vue'
import originCarousel from '~/components/propertiesCarousel.vue'

export default {
  delimiters: ['${', '}'],
  props: [ 'num', 'item' ],
  components: {
    originCarousel
  },
  data: () => {
    return {
      thumbs: []
    }
  },
  created () {
    this.thumbs = this.$props.item.carousel
  }
}
</script>

