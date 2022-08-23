<template>
  <div class="component-wrapper" @click="handleCloseInput">
  </div>
    <teleport :to="`#${$props.id}r`">
        <input type="text" v-model="inputValue">
        <div class="buttons-group">
          <button-component
            class="button"
            hover-transform=".3"
            @click.stop="handleSaveButton"
          >
            Сохранить
          </button-component>

          <button-component
              class="button"
              hover-transform=".3"
              @click.stop="handleCloseInput"
          >
            Отмена
          </button-component>
        </div>
    </teleport>

</template>

<script>
import {defineComponent} from "vue/dist/vue";
import ButtonComponent from "@/components/ButtonComponent";

export default defineComponent({
  components: {
    ButtonComponent
  },

  props: {
    id: String,
    value: String
  },

  data() {
    return {
      inputValue: this.$props.value,
    }
  },

  emits: ["closeEditInput", "saveInputContent"],

  methods: {
    handleSaveButton() {
      this.$emit("saveInputContent", this.inputValue);
    },
    handleCloseInput() {
      this.$emit("closeEditInput");
    }
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
    bottom: -40px;
    right: 0;

    .button {
      position: relative;
      padding: 5px;
      border: 2px solid grey;
      z-index: 11;
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