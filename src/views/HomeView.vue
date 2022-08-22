<template>
  <div class="component-wrapper">
    <div class="add-note-btn">
      <button-component scale="5" @click="createNewNote" >
        <template v-slot:leftIcon>
          <b-icon-calendar-plus />
        </template>
      </button-component>
    </div>
    <transition-group tag="div" name="list" class="notes-area">
      <NoteCard
          v-for="note in readNotesArray()"
          :key="note.id"
          v-bind="note"
      />
    </transition-group>
  </div>
</template>

<script lang="ts">
import NoteCard from "../components/NoteCard.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import {defineComponent} from 'vue'

export default defineComponent({
  components: {
    NoteCard,
    ButtonComponent,
  },


  methods: {
    createNewNote() {
      this.$services.addNewNote();
      this.$services.updateNotesArray( this.readNotesArray() );
    },
    readNotesArray() {
      return this.$services.readNotesArray();
    },
  },

  mounted() {
    this.$services.getLocalNotesArray();
  },

})
</script>

<style lang="scss" scoped>
  .list-move {
    transition: transform .5s ease-in-out;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateY(-100px);
  }

  .list-enter-active{
    transition: all .5s ease-out;
  }

  .list-leave-active {
    transition: all .3s ease-in;
  }

  .component-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .add-note-btn {
    margin: 120px 0;
    border: none;
    width: max-content;
    height: max-content;
  }

  .add-note-icon {
    cursor: pointer;
    transition: .5s;
    transform: scale(10);

    &:hover {
      transform: scale(11);
    }
  }

  .notes-area {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: stretch;
    row-gap: 50px;
    column-gap: 20px;
  }

</style>