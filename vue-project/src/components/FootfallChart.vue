<template>
    <div>
        <h1>Product Visit Chart</h1>
    <div>
        <label for="productId">Select a product:</label>
        <select v-model="selectedProductId" @change="fetchVisitsData">
            <option disabled value="">Select a product</option>
            <option v-for="product in products" :key="product.id" :value="product.id">{{ product.name }}</option>
        </select>
    </div>
    <div>
      <canvas ref="chart"></canvas>
    </div>
  </div>
</template>

<script>
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  Timestamp,
  subDays,
  startOfDay,
  endOfDay,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';

import Chart from 'chart.js/auto';

export default {
  data() {
    return {
      selectedProductId: '',
      products: [], // Store your product data here
      chart: null,
      visitData: [],
    };
  },
  async created() {
    // Fetch the list of products 
    this.products = await this.fetchProducts();
  },
  methods: {
    async fetchProducts() {

    },
    async fetchVisitsData() {
      if (this.selectedProductId) {
        const db = getFirestore();
        const productDocRef = collection(db, 'Listings', 'UserID', 'Product', this.selectedProductId);

        // Define the date range for the query (last 7 days)
        const endDate = new Date(); // Today
        const startDate = subDays(endDate, 7); // 7 days ago

        const visitsCollectionRef = collection(productDocRef, 'visits');
        const queryRef = query(
          visitsCollectionRef,
          where('timestamp', '>=', Timestamp.fromDate(startDate)),
          where('timestamp', '<=', Timestamp.fromDate(endDate))
        );

        try {
          const querySnapshot = await getDocs(queryRef);
          this.visitData = this.processVisitData(querySnapshot);

          // Update the chart with the visit data
          this.updateChart();
        } catch (error) {
          console.error('Error fetching visit data', error);
        }
      }
    },
    async logVisit() {
      const db = getFirestore();
      const productDocRef = collection(db, 'Listings', 'UserID', 'Product', this.selectedProductId);

      const visitsCollectionRef = collection(productDocRef, 'visits');

      // Log a visit by adding a new document with a timestamp
      await addDoc(visitsCollectionRef, {
        timestamp: serverTimestamp(),
      });

      // Fetch and update the visit data for the chart
      this.fetchVisitsData();
    },
    updateChart() {
      if (this.chart) {
        this.chart.destroy();
      }

      const ctx = this.$refs.chart.getContext('2d');
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.visitData.map((data) => data.date),
          datasets: [
            {
              label: 'Visits per Day',
              data: this.visitData.map((data) => data.count), // Count of visits per day
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
    processVisitData(querySnapshot) {
      const data = {};
      querySnapshot.forEach((doc) => {
        const date = doc.data().timestamp.toDate().toLocaleDateString();
        if (!data[date]) {
          data[date] = 0;
        }
        data[date]++;
      });

      return Object.keys(data).map((date) => ({
        date,
        count: data[date],
      }));
    },
  },
};
</script>

<style scoped>

</style>
