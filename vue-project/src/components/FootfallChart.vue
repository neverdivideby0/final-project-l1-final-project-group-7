<template>
  <div>
    <h1>Footfall (Past 7 Days) </h1>
    <div>
      <label for="productName" class="select-label">Select Product:</label>
      <select v-model="selectedProductName" @change="generateChart">
        <option disabled value="">Select Product</option>
        <option v-for="product in exampleProducts" :key="product.name" :value="product.name">{{ product.name }}</option>
      </select>
    </div>
    <div>
      <canvas id="chartCanvas"></canvas>
    </div>
  </div>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap" rel="stylesheet">
</template>

<script> 
import { onMounted } from 'vue';
import Chart from 'chart.js/auto';
import { getFirestore, collection, doc, query, getDocs } from 'firebase/firestore';

export default {
  data() {
    return {
      exampleProducts: [],
      selectedProductName: '',
    };
  },
  mounted() {
    this.fetchExampleProducts().then(() => {
      if (this.exampleProducts.length > 0) {
        this.selectedProductName = this.exampleProducts[0].name;
        this.generateChart();
      }
    });
  },
  methods: {
    async fetchExampleProducts() {
      const db = getFirestore();
      const productsCollection = collection(db, 'ExampleProducts');
      const querySnapshot = await getDocs(productsCollection);
      const products = [];

      querySnapshot.forEach((doc) => {
        const product = doc.data();
        products.push({
          name: product.name,
          description: product.description,
          visits: product.visits,
        });
      });

      this.exampleProducts = products;
    },
    generateChart() {
      if (this.selectedProductName) {
        const product = this.exampleProducts.find((p) => p.name === this.selectedProductName);
        if (product) {
          const chartData = product.visits;
          const chartLabels = this.generateDateLabels();
          this.updateChart(chartData, chartLabels);
        }
      }
    },
    generateDateLabels() {
      const dateLabels = [];
      const today = new Date();

      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        dateLabels.unshift(date.toLocaleDateString());
      }

      return dateLabels;
    },
    updateChart(data, labels) {
      const canvas = document.getElementById('chartCanvas');
      const ctx = canvas.getContext('2d');

      if (this.chart) {
        this.chart.destroy();
      }

      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Page Visits per Day',
              data: data,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
  },
};
</script>

<style>
/* Roboto Font */ 
h1, h2, h3, p, button, .select-label {
  font-family: 'Roboto', sans-serif;
}

.chart-wrapper {
  display: inline-block; /* Allow it to center horizontally */
  width: 30%; /* Adjust the width of the chart container */
}
</style>