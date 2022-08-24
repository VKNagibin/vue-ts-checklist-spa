<template>
  <div class="component-wrapper" @click="handleCloseInput">
  </div>
    <teleport :to="`#${$props.id}`">
        <input
            type="text"
            v-model="inputValue"
            ref="input"
        >
        <div class="buttons-group">
          <button-component
            class="button"
            hover-transform=".1"
            @click.stop="handleSaveButton"
          >
            Сохранить
          </button-component>

          <button-component
              class="button"
              hover-transform=".1"
              @click.stop="handleCloseInput"
          >
            Отмена
          </button-component>
        </div>
    </teleport>

</template>

<script lang="ts">
import {defineComponent} from "vue";
import ButtonComponent from "@/components/ButtonComponent.vue";

export default defineComponent({
  components: {
    ButtonComponent
  },

  props: {
    id: String,
    content: String
  },

  emits: ["closeEditInput", "saveInputContent"],

  data() {
    return {
      inputValue: this.$props.content,
    }
  },

  methods: {
    handleSaveButton() {
      this.$emit("saveInputContent", this.inputValue);
    },
    handleCloseInput() {
      this.$emit("closeEditInput");
    }
  },

  mounted() {
    (this.$refs["input"] as HTMLInputElement).focus();
  }
})
</script>

<style lang="scss" scoped>
  .component-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: black;
    z-index: 10;
    opacity: .2;
  }

  .buttons-group {
    display: flex;
    gap: 20px;
    position: absolute;
    bottom: -60px;
    right: 0;

    .button {
      position: relative;
      padding: 5px;
      border: 2px solid grey;
      z-index: 11;
      font-size: 1.5rem;
      background: white;
    }
  }

  input {
    padding: 0 10px;
    font-size: 1.5rem;
    position: absolute;
    z-index: 11;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: white;
  }
</style>