<template>
  <button
      :style="{transform: `scale(${buttonScale})`}"
      @click="(e) => handleClick(e)"
      @mouseenter="(e) => handleMouseEnter(e)"
      @mouseleave="(e) => handleMouseLeave(e)"
  >
    <slot name="leftIcon"></slot>
    {{content}}
    <slot name="rightIcon"></slot>
  </button>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  components: {},

  props: {
    scale: {
      required: false,
    },
    content: {
      required: false,
      type: String,
    }
  },

  computed: {
    buttonScale() {
      return this.$props.scale || '1';
    }
  },

  methods: {
    handleClick(e) {
    },

    handleMouseEnter(e) {
      e.currentTarget.style.transform = `scale(${+this.buttonScale + .5})`;
    },

    handleMouseLeave(e) {
      e.currentTarget.style.transform = `scale(${+this.buttonScale})`;
    }

  }



})
</script>

<style lang="scss" scoped>
  button {
    display: flex;
    padding: 2px;
    justify-content: space-between;
    align-items: center;
    will-change: transform;
    transition: .2s transform;
    cursor: pointer;
    z-index: 10;
    border: none;
  }
</style>