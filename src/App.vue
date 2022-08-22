<template>
  <div class="App">
    <router-view>
    </router-view>
  </div>
</template>

<style lang="scss">
.appear-enter-active, .appear-leave-active {
  transition: opacity .3s ease-in;

}

.appear-enter-from, .appear-leave-to {
  opacity: 0;
}

.App {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 100vh;
  padding: 40px;
  gap: 20px;
  flex-direction: column;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background: transparent;
  font-family: sans-serif;
}

input {
  will-change: transform;
  transition: .2s transform;
  border-radius: 5px;

  &:hover {
    transform: scale(1.1);
  }
}

li {
  list-style: none;
}

@media (max-width: 540px) {
  html {
    font-size: 14px;
  }
}

</style>