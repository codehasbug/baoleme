<template>
  <div class="tab">
      <cube-tab-bar
        v-model="selectedLabel"
        show-slider
        :use-transition="disabled"
        ref="tabNav"
        :data="tabs"
      >
      </cube-tab-bar>
      <div class="tab-slide-container">
        <cube-slide
          ref="slide"
          :loop="loop"
          :initial-index="NowIndex"
          :autoPlay="autoPlay"
          :showDots="showDots"
          :options="slideOptions"
          @change="changePage"
          @scroll="scroll"
        >
          <cube-slide-item v-for="(tab, index) of tabs" :key="index" class="cube-slide-item">
            <component
              ref="component"
              :is="tab.component"
              :data="tab.data"
            ></component>
          </cube-slide-item>
        </cube-slide>
      </div>
  </div>
</template>

<script>
export default {
  name: "tab",
  props: {
    tabs: {
      type: Array,
      default() {
        return [
          {
            label: "商品"
          },
          {
            label: "评论"
          },
          {
            label: "商家"
          }
        ];
      }
    },
    initialIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      selectedLabel: this.tabs[this.initialIndex].label,
      slideOptions: {
        listenScroll: true,
        probeType: 3,
        directionLockThreshold: 0
      },
      loop: false,
      disabled: false,
      autoPlay: false,
      showDots: false,
      scrollOptions: {
        directionLockThreshold: 0
      }
    };
  },
  computed: {
    NowIndex() {
      let index = 0;
      for (; index < this.tabs.length; ++index) {
        if (this.selectedLabel == this.tabs[index].label) break;
      }
      return index;
    }
  },
  mounted() {
    this.changePage(this.initialIndex);
  },
  methods: {
    changePage(current) {
      this.selectedLabel = this.tabs[current].label;
      const instance = this.$refs.component[current];
      if (instance && instance.fetch) {
        instance.fetch();
      }
    },
    scroll(pos) {
      // console.log(pos);
      const x = Math.abs(pos.x);
      const tabItemWidth = this.$refs.tabNav.$el.clientWidth;
      const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth;
      const deltaX = (x / slideScrollerWidth) * tabItemWidth;
      this.$refs.tabNav.setSliderTransform(deltaX);
    }
  }
};
</script>

<style lang="stylus">
@import "~cube-ui/src/common/stylus/variable.styl"

.tab
  display: flex
  flex-direction: column
  height: 100%
  >>> .cube-tab
    padding: 10px 0
    font-weight: 200
  .tab-slide-container
    flex: 1
    overflow: hidden
    .cube-slide-item
      width 100%
      height 100%

</style>
