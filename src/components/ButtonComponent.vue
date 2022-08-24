<template>
  <button
      :style="{transform: `scale(${buttonScale})`}"
      @mouseenter="(e) => handleMouseEnter(e)"
      @mouseleave="(e) => handleMouseLeave(e)"
      ref="button"
  >
    <slot name="leftIcon"></slot>
    <slot></slot>
    <slot name="rightIcon"></slot>
  </button>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  components: {},

  props: {
    focus: Boolean,
    scale: {
      required: false,
    },
    hoverTransform: {
      type: String,
      required: false,
    },
    label: {
      required: false,
      type: String,
    }
  },

  computed: {
    buttonScale() {
      return this.$props.scale || '1';
    },
    ariaLabel() {
      this.$props.label || "";
    }
  },

  methods: {
    handleMouseEnter(e) {
      e.currentTarget.style.transform =
          `scale(${+this.buttonScale + this.hoverTransform})`;
    },

    handleMouseLeave(e) {
      e.currentTarget.style.transform = `scale(${+this.buttonScale})`;
    }
  },

  mounted() {
    if (!this.$props.focus) return
    this.$refs.button.focus();
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
    border: none;
  }
</style>