<template>
  <div class="component-wrapper">
    <button class="add-note-btn" @click="createNewNote" aria-label="создать новую заметку">
      +
    </button>

    <transition-group tag="div" name="list" class="notes-area">
      <NoteCard
          v-for="note in getNotesArray()"
          :key="note.id"
          v-bind="note"
      />
    </transition-group>
  </div>
</template>

<script lang="ts">
import NoteCard from "../components/NoteCard.vue";
import Services from "../services/Services";
import store from "@/store";

import { defineComponent } from 'vue'
import LocalData from "@/services/LocalData";

export default defineComponent({
  components: {
    NoteCard,
  },


  methods: {
    createNewNote() {
      this.services.addNewNote();
    },
    getNotesArray() {
      return this.services.getNotesArray();
    },
  },

  computed: {
    services() {
        return new Services(
            {
              store: store,
              router: this.$router,
              localData: new LocalData(),
              history: "history",
            }
        );
    }
  },

  beforeUnmount() {
    this.services.updateNotesArray( this.getNotesArray() );
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