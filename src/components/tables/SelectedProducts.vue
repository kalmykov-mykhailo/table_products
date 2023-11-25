<template>
  <h1>Обрані товари</h1>

  <div class="container" v-if="store.selectedProducts">
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

      <el-table-column label="Ціна Продажі	" sortable prop="sell_price" />
      <el-table-column
        label="Кіл-сть "
        prop="quantity"
        ref="input_number"
        id="input_number"
      >
        <template #default="scope">
          <div
            class=""
            v-if="!scope.row.isActive"
            @dblclick="handleDbClick(scope.row)"
          >
            {{ scope.row.quantity }}
          </div>
          <el-input-number
            :id="`input_number_${scope.row.model}`"
            :ref="`input_number_${scope.row.model}`"
            v-if="scope.row.isActive"
            v-model="scope.row.quantity"
            :min="0"
            :max="100"
            size="small"
            :controls="false"
            @blur="handleBlur(scope.row)"
          />
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
            <el-button
              size="small"
              type="danger"
              @click="store.deleteProduct(scope.row.model)"
              >Видалити</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <span class="flex justify-end pt-2">Всього обрано: {{ total }}</span>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue';
import { useProductStore } from '../../stores/productsStores';
const store = useProductStore();
const total = computed(() => store.selectedProducts.length);
const search = ref('');
const filterTableData = computed(() => {
  return store.selectedProducts.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase()),
  );
});
const handleDbClick = (row: any) => {
  row.isActive = true;
  setTimeout(() => {
    document.getElementById(`input_number_${row.model}`)?.focus();
  }, 300);
};
const handleBlur = (row: any) => {
  row.isActive = false;
  store.updateQuantity(row.model, row.quantity);
};
onMounted(() => {
  store.getSelectedProducts();
});
</script>
<style lang="scss" scoped></style>
