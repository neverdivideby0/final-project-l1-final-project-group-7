<template>
  <h2 class="titleofDiv">Current portfolio</h2>

  <table id="table" class="auto-index">
    <tr>
      <th>S.No</th>
      <th>Coin</th>
      <th>Ticker</th>
      <th>Buy Price</th>
      <th>Buy Quantity</th>
      <th>Current_Price</th>
      <th>Profit</th>
      <th>Options</th>
    </tr>
  </table>
  <br /><br />

  <h2 id="totalProfit">Your Total Profit is: XX$</h2>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import ccxt from "ccxt";

const db = getFirestore(firebaseApp);

export default {
  mounted() {
    async function display() {
      let allDocuments = await getDocs(collection(db, "Portfolio"));
      let index = 1;
      let totalProfit = 0;

      allDocuments.forEach((docs) => {
        let documentData = docs.data();
        let coin = documentData.Coin;
        let ticker = documentData.Ticker;
        let buyPrice = documentData.Buy_Price;
        let buyQuantity = documentData.Buy_Quantity;

        let table = document.getElementById("table");
        let row = table.insertRow(index);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);
        let cell7 = row.insertCell(6);
        let cell8 = row.insertCell(7);

        cell1.innerHTML = index;
        cell2.innerHTML = coin;
        cell3.innerHTML = ticker;
        cell4.innerHTML = buyPrice;
        cell5.innerHTML = buyQuantity;
        cell6.innerHTML = 0;
        cell7.innerHTML = 8;

        cell7.className = "profits";

        let deleteButton = document.createElement("button");

        deleteButton.id = String(coin);
        deleteButton.className = "bwt";
        deleteButton.innerHTML = "Delete";

        cell8.appendChild(deleteButton);
        deleteButton.onclick = function () {
          deleteInstrument(coin);
        };
        index += 1;

        async function profitcalculator(ticker) {
          let binance = new ccxt.binance();
          let x = await binance.fetch_ohlcv(ticker, "5m");
          cell6.innerHTML = x[499][4];
          cell7.innerHTML = Math.round(
            buyQuantity * (parseFloat(cell6.innerHTML) - parseFloat(buyPrice))
          );
          totalProfit = totalProfit + parseFloat(cell7.innerHTML);
          document.getElementById("totalProfit").innerHTML =
            " Total Profit is: $ " + String(totalProfit);
        }
        profitcalculator(ticker);
      });
    }

    display();
    async function deleteInstrument(coin) {
      alert("You are going to delete " + coin);
      await deleteDoc(doc(db, "Portfolio", coin));
      console.log("Document successfully deleted!", coin);
      let tb = document.getElementById("table");
      while (tb.rows.length > 1) {
        tb.deleteRow(1);
      }
      document.getElementById("totalProfit").innerHTML = "";
      display();
    }
  },
};
</script>

<style>
h1,
h2 {
  text-align: center;
  background-color: rgb(129, 184, 99);
  font: 700;
  display: block;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}
tr:nth-child(even) {
  background-color: #e3edee;
}
th,
td {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}
.bwt {
  color: rgb(243, 236, 236);
  background-color: rgb(255, 94, 0);
}
</style>