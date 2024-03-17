<template>
  <div class="loader__container">
    <span class="loader"></span>
  </div>
</template>

<style lang="scss" scoped>
.loader {
  width: 48px;
  height: 48px;
  border: 5px solid #000;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  &__container {
    width: 100%;
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;

    background: #fff;
    border-radius: 0.5em;
  }
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
