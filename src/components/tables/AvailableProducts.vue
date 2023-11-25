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
      <el-table-column label="Кіл-сть на складі	" prop="quantity_total">
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

onMounted(() => {
  store.getProducts();
});

watch(
  () => [store.currentPage, store.pageSize],
  () => store.getProducts(),
);
</script>
<style lang="scss" scoped></style>
