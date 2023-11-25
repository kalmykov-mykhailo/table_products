<template>
  <div class="container">
    <selected-products />
    <available-products />
    <test/>
  </div>
  <loader :loading="store.loading" />
  
</template>

<script setup lang="ts">
import AvailableProducts from "./components/tables/AvailableProducts.vue";
import SelectedProducts from "./components/tables/SelectedProducts.vue";
import Test from "./components/tables/Test.vue";
import Loader from './components/Loader.vue';
import { useProductStore } from "./stores/productsStores";
const store = useProductStore();

</script>
<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
</style>
