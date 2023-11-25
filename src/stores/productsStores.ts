import { defineStore } from 'pinia';
import { Product, SelectedProduct } from '../schemas/Product.schema';

type State = {
  data: Product[];
  selectedProducts: Product[];
  loading: boolean;
  testId: number;
  currentPage: number;
  pageSize: number;
  // selectedCurrentPage: number;
  // selectedPageSize: number;
  total: number;
};

const initState: State = {
  data: [],
  selectedProducts: [],
  loading: false,
  testId: 7,
  currentPage: 1,
  // selectedCurrentPage: 1,
  // selectedPageSize: 10,
  pageSize: 10,
  total: 2691,
};

export const useProductStore = defineStore('products', {
  state: (): State => {
    return { ...initState };
  },
  actions: {
    getProducts() {
      this.loading = true;
      fetch(
        `https://api.xpro.com.ua/product?test_id=${this.testId}&limit=${this.pageSize}&page=${this.currentPage}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP ошибка! Статус: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          this.data = data;
          this.loading = false;
        })
        .catch((error) => {
          console.error('Ошибка при получении данных:', error.message);
        });
    },
    getSelectedProducts() {
      this.loading = true;

      fetch(`https://api.xpro.com.ua/selectedProduct?test_id=${this.testId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP ошибка! Статус: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          this.selectedProducts = data.map((element: SelectedProduct) => {
            return { ...element.product_info, quantity: +element.quantity };
          });
          this.loading = false;
        })
        .catch((error) => {
          console.error('Ошибка при получении данных:', error.message);
        });
    },
    addProduct(model: string) {
      this.loading = true;

      fetch('https://api.xpro.com.ua/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          test_id: this.testId,
          model: model,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP ошибка! Статус: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          this.selectedProducts.push({ ...data, quantity: 0 });
          this.loading = false;
        })
        .catch((error) => {
          console.error('Ошибка при выполнении POST-запроса:', error.message);
        });
    },
    deleteProduct(model: string) {
      this.loading = true;
      fetch('https://api.xpro.com.ua/product', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          test_id: this.testId,
          model: model,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP ошибка! Статус: ${response.status}`);
          }
          return response.json();
        })
        .then(() => {
          this.loading = false;
          this.selectedProducts = this.selectedProducts.filter(
            (product) => product.model !== model,
          );
        })
        .catch((error) => {
          console.error('Ошибка при выполнении DELETE-запроса:', error.message);
        });
    },
    updateQuantity(model: string, quantity: string) {
      this.loading = true;

      fetch('https://api.xpro.com.ua/product', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          test_id: this.testId,
          model: model,
          quantity: quantity,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP ошибка! Статус: ${response.status}`);
          }
          return response.json();
        })
        .then(() => {
          this.loading = false;
        })
        .catch((error) => {
          console.error(
            'Ошибка при выполнении PATCH-запроса для изменения количества товара:',
            error.message,
          );
        });
    },
  },
});
