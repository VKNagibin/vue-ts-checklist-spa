<template>
  <div class="component-wrapper">
    <div class="modal-window">
      <h2 class="question">
        <slot></slot>
      </h2>
      <div class="button-group">
        <button :aria-label="label" ref="resolveButton" @click="handleResolveButton">Да</button>
        <button :aria-label="label" @click="handleRejectButton">Нет</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ["response"],
  props: {
    label: String,
  },

  methods: {
    handleResolveButton(): void {
      this.$emit("response", true);
    },
    handleRejectButton() {
      this.$emit("response", false);
    }
  },

  computed: {
    ariaLabel() {
      return this.$props.label ? this.$props.label : "";
    }
  },

  mounted() {
    (this.$refs["resolveButton"] as HTMLButtonElement).focus();
  },
})
</script>

<style lang="scss" scoped>
.component-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 10;
  background: rgba(0, 0, 0, 0.01);
}

.modal-window {
  z-index: 11;
  padding: 20px;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: #000000;
  border-radius: 20px;
  animation-name: modal;
  animation-duration: .5s;
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
  border: 4px solid #000000;
  width: 400px;

  & .question {
    color: #eee7e7;
    font-size: 2rem;
    text-align: center;
  }
}

.button-group {
  display: flex;
  gap: 20px;
}

button {
  font-size: 1.3rem;
  border-radius: 20px;
  border: 4px solid #eee7e7;
  padding: 10px 40px;
  color: whitesmoke;

  &:hover {
    transform: scale(1.1);
  }
}

@keyframes modal {
  from {
    transform: translate(-50%, -150%);
  }
  to {
    transform: translate(-50%, 0);
  }
}

</style>