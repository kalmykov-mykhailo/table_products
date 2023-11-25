<template>
  <transition name="layout-loader">
      <Teleport to="body">
      <div
        class="layout-loader"
        :style="{ '--loader-color': color ?? '#000' }"
        v-if="loading"
      >
        <div class="layout-loader__inner">
          <div class="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </Teleport>
    </transition>
</template>

<script setup lang="ts">
defineProps<{
  loading?: boolean;
  color?: string;
}>();
</script>

<style lang="scss" scoped>
.layout-loader {
  @apply fixed top-0 left-0 w-full h-full z-[100];

  &__inner {
    @apply flex items-center bg-white/20 justify-center w-full h-full backdrop-blur-[2px];
  }

  &-enter-active,
  &-leave-active {
    @apply duration-200 ease-in opacity-100;
  }

  &-enter-from,
  &-leave-to {
    @apply opacity-0 pointer-events-none;
  }
}

.lds-ripple {
  @apply inline-block relative w-[80px] h-[80px];

  div {
    @apply border-[var(--loader-color)] border-4 absolute opacity-100 rounded-full;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;

    &:nth-child(2) {
      animation-delay: -0.5s;
    }
  }
}

@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }

  4.9% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }

  5% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }

  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}
</style>
