<template>
  <h1>Всі товари</h1>
  <div class="container" v-if="store.data" ref="prod">
    <el-table
      :data="filterTableData"
      border
      height="40vh"
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column label="Фото" prop="photo">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-image
              :src="scope.row.photo"
              style="width: 50px; height: 50px"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Назва" />
      <el-table-column prop="model" label="Модель" />
      <el-table-column label="Ціна Закупки" sortable prop="original_price" />

      <el-table-column label="Ціна Продажі" sortable prop="sell_price" />
      <el-table-column label="Кіл-сть" prop="quantity_total">
        <template #default="scope">
          <!-- :class="!scope.row.isActive && 'input-number--no_active'" -->
          <div
            class=""
            v-if="!scope.row.isActive"
            @dblclick="handleDbClick(scope.row)"
          >
            {{ scope.row.quantity_total }}
          </div>
          <el-input-number
            v-if="scope.row.isActive"
            v-model="scope.row.quantity_total"
            :min="0"
            :max="100"
            size="small"
            :controls="scope.row.isActive"
            @blur="handleBlur(scope.row)"
            />
            <!-- @change="handleChange" -->
        </template>
      </el-table-column>
      <el-table-column align="right" min-width="100">
        <template #header>
          <el-input
            v-model="search"
            size="small"
            placeholder="Пошук по назві"
          />
        </template>
        <template #default="scope">
          <div class="flex gap-1 justify-end">
            <el-button size="small" @click="store.addProduct(scope.row.model)"
              >Додати</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      ref="nonActiveInput"
      class="flex justify-end"
      v-model:current-page="store.currentPage"
      v-model:page-size="store.pageSize"
      :page-sizes="[10, 50, 100, 150]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next"
      :total="store.total"
    ></el-pagination>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, watch } from 'vue';
import { useProductStore } from '../../stores/productsStores';
// const activeInputRef = ref(null);
const store = useProductStore();
const small = ref(false);
const background = ref(false);
const disabled = ref(false);
const search = ref('');
const filterTableData = computed(() =>
  store.data.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase()),
  ),
);
const handleBlur = (row: any) => {
  row.isActive = false;
  console.log('handleBlur');

  // store.updateQuantity(row.model, 10);
};
const handleDbClick = (row: any) => {
  row.isActive = true;
  // nextTick(() => {
  //   activeInputRef?.value?.focus();
  // });
};

onMounted(() => {
  store.getProducts();
});

watch(
  () => [store.currentPage, store.pageSize],
  () => store.getProducts(),
);
</script>
<style lang="scss" scoped>
.input-number {
  &--no_active {
    &:deep(.el-input__wrapper) {
      @apply shadow-none bg-transparent;
    }
  }
}
</style>
