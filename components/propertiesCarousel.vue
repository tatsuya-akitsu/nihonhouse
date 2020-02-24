<template>
  <div class="carousel-container">
    <transition-group :class="{'propertyCarousel-thumb': true, 'prev': prev}" name="flip-list" tag="div">
      <img v-for="(item, p) in cItems" :key="p" :src="item.src" alt="" class="carousel-img pos-a" />
    </transition-group>
    <div class="carousel-controls pos-r">
      <div v-on:click="goPrev" class="carousel-step pos-a"><img src="/images/angle-left.png" alt="prev" /></div>
      <ul class="carousel-dots fle-b">
        <li v-for="(dot, d) in cDots" :key="d" v-on:click="gotoItem(dot)" :class="{'carousel-dot': true, 'is-active': dot===currentItem}" :style="{backgroundImage: 'url(' + thumbs[dot].src + ')'}"></li>
      </ul>
      <div v-on:click="goNext" class="carousel-step pos-a"><img src="/images/angle-right.png" alt="next" /></div>
    </div>
  </div>
</template>

<script>
export default {
  delimiters: ['${', '}'],
  props: [ 'images' ],
  data: () => {
    return {
      thumbs: [],
      cItems: [{ src: '' }],
      currentItem: 0,
      prev: false,
    }
  },
  computed: {
    cDots() {
      return Array(this.thumbs.length).fill().map(
        function(_, i) {
          return i;
        }
      )
    }    
  },
  created () {
    this.thumbs = this.$props.images
    for (let i = 0; i < this.thumbs.length; i++) {
      this.cItems = [{ src: this.thumbs[0].src }]
    }
  },
  methods: {
    gotoItem (item) {
      if (item < this.currentItem) {
        this.prev = true;
        this.cItems.unshift(this.thumbs[item]);
        this.cItems.pop();
      } else {
        this.prev = false;
        this.cItems.push(this.thumbs[item]);
        this.cItems.shift();
      }    
      this.currentItem = item;
    },
    goNext () {
      this.prev = false;
      if (this.currentItem === this.thumbs.length - 1) {
        this.currentItem = 0;
      } else {
        this.currentItem += 1;
      }
      this.cItems.push(this.thumbs[this.currentItem]);
      this.cItems.shift();
    },
    goPrev () {
      this.prev = true;
      if (this.currentItem === 0) {
        this.currentItem = this.thumbs.length-1;
      } else {
        this.currentItem -= 1;
      }
      this.cItems.push(this.thumbs[this.currentItem]);
      this.cItems.shift();
    },
  }
}
</script>

