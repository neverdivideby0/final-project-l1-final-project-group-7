<template>
  <div id="container">
    <form id="myform">
      <h1 class="titleofDiv">Add Coins</h1>

      <div class="formli">
        <label for="coin1"> Coin Name: </label>
        <input
          type="text"
          id="coin1"
          required=""
          placeholder="Enter your Coin"
        />
        <br /><br />
        <label for="ticker1"> Ticker: </label>
        <input
          type="text"
          id="ticker1"
          required=""
          placeholder="Valid Ticker"
        />
        <br /><br />
        <label for="buy1"> Buy Price: </label>
        <input type="number" id="buy1" required="" placeholder="Buy Price" />
        <br /><br />
        <label for="quant1"> Buy Quantity: </label>
        <input type="number" id="quant1" required="" placeholder="Quantity" />
        <br /><br />

        <div class="save">
          <button id="savebutton" type="button" onclick="savetofs()">
            Save
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
  methods: {
    async savetofs() {
      console.log("IN AC");

      let coin = document.getElementById("coin1").value;
      let ticker = document.getElementById("ticker1").value;
      let buyPrice = document.getElementById("buy1").value;
      let buyQuantity = document.getElementById("quant1").value;

      alert("Saving your data for Coin : " + coin);

      try {
        const docRef = await setDoc(doc(db, "Portfolio", coin), {
          Coin: coin,
          Ticker: ticker,
          Buy_Price: buyPrice,
          Buy_Quantity: buyQuantity,
        });
        console.log(docRef);
        docment.getElementById("myform").reset();
        this.$emit("added");
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    },
  },
};
</script>

<style>
h2{
  background-color : rgb(129, 184, 99);
}

.formli{
  display: inline-block;
  text-align: right;
}

form {
  text-align: center;
  align-items: center;
  margin: auto;
}

input:hover {
  box-shadow: 3px 3px purple;
  border-radius: 2px;
}

.save{
  text-align: center;
}
</style>