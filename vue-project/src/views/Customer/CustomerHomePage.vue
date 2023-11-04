<template>
  <div :class="$style.homePage">
    <div :class="$style.body">
      <div :class="$style.banner">
        <div :class="$style.welcomeUser123">Welcome, User123</div>
        <div :class="$style.fitnessForYou">Fitness For You</div>
        <div :class="$style.signOutButton">
          <div :class="$style.signOut">
            <button @click="signOut">Sign Out</button>  
          </div>
        </div>
      </div>
      <img :class="$style.logo" alt="" src="@/assets/orangeGetFitt.png" /> 
      <div :class="$style.frame4">
        <img :class="$style.leftSquare" alt=""/>
        <img :class="$style.rightSquare" alt=""/>
        <div :class="$style.viewGyms">
          <button @click="navigateToGymListing">View Gyms</button>
        </div>
        <div :class="$style.svg1">
          <img :class="$style.gymsIcon" alt="" src="@/assets/dumbell.png" />
        </div>
        <div :class="$style.svg2" />
        <div :class="$style.viewProducts">
          <button @click="navigateToProductListing">View Products</button>
        </div>
        <img :class="$style.productsIcon" alt="" src="@/assets/products.png" />
      </div>
    </div>
  </div>
</template>


<script>
import { defineComponent } from "vue";
import LogOut from '@/components/LogOut.vue';

export default defineComponent({
  name: "HomePage",
  components: {
    LogOut,
  },
  methods: {
    navigateToProductListing() {
      this.$router.push({ name: 'CustomerProductList' });
    }

    /* add signOut() here */
  }
});
</script>


<style module>
  .label {
    position: absolute;
    width: calc(100% - 21px);
    top: 33px;
    right: 8px;
    left: 13px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-5xs) var(--padding-5xs) var(--padding-0)
      var(--padding-0);
    box-sizing: border-box;
    gap: var(--gap-5xs);
    font-size: var(--font-size-xs);
  }
  .vectorIcon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    position: relative;
    width: 14.5px;
    height: 8px;
  }
  .facilities {
    position: absolute;
    width: calc(100% - 1178px);
    top: 544px;
    right: 1178px;
    left: 0px;
    height: 226px;
    display: none;
  }
  .logo {
    position: absolute;
    top: 110px;
    left: center;
    width: 699px;
    height: 132px;
    overflow: hidden;
    object-fit: cover;
    mix-blend-mode: darken;
  }
  .welcomeUser123 {
    position: absolute;
    top: 120px;
    left: center;
    top: 0px;
    font-size: 69px;
    line-height: 100px;
    font-weight: 900;
    color: var(--color-black);
    color: white;
  }
  .fitnessForYou {
    position: absolute;
    top: 120px;
    left: center;
    top: 240px;
    font-size: 69px;
    line-height: 100px;
    font-weight: 900;
    color: var(--color-black);
    color: white;
  }
  .signOut {
    position: relative;
    line-height: 20px;
    font-weight: 500;
  }
    .signOutButton {
    position: absolute;
    top: 12px;
    right: 10px;
    font-size: 69px;
    line-height: 100px;
    font-weight: 900;
    color: var(--color-black);
    color: white;
  }
.leftSquare {
  position: absolute;
  top: 0px;
  left: 100px;
  width: 412px;
  height: 502px;
  background-color: red; 
}
.rightSquare {
  position: absolute;
  top: 0px;
  left: 650px;
  width: 412px;
  height: 502px;
  background-color: turquoise; 
}

  .viewGyms {
    position: absolute;
    top: 389px;
    left: 250px;
    line-height: 20px;
  }
  .viewProducts {
    position: absolute;
    top: 389px;
    left: 795px;
    line-height: 20px;
  }
  .gymsIcon {
    position: absolute;
    top: 20px;
    left: 172px;
    width: 251px;
    height: 263px;
    object-fit: cover;
    mix-blend-mode: hue;
  }
  .productsIcon {
    position: absolute;
    top: 75px;
    left: 725px;
    width: 251px;
    height: 263px;
    object-fit: cover;
    color: black;
    mix-blend-mode: hue;
  }
  .svg1 {
    position: absolute;
    top: 55px;
    left: 10px;
    width: 474px;
    height: 294px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 1.875000238418579px var(--padding-0) 1.874999761581421px
      2.384185791015625e-7px;
    box-sizing: border-box;
    mix-blend-mode: hard-light;
  }
  .svg2 {
    position: absolute;
    top: 27px;
    left: 846px;
    width: 338px;
    height: 327px;
    overflow: hidden;
  }

  .frame4 {
    position: absolute;
    top: 400px;
    left: center;
    width: 1184px;
    height: 502px;
    overflow: hidden;
  }
/* ... other styles ... */

.homePage {
    display: flex; /* Add flexbox display */
    align-items: center; /* Vertically center the content */
    justify-content: center; /* Horizontally center the content */
    position: absolute;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    text-align: center;
    font-size: var(--font-size-base);
    color: var(--color-royalblue);
    font-family: var(--font-montserrat);
}

.body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%; /* Adjust the width as needed */
  margin: 0 auto; /* Center the body horizontally */
}

.banner {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
      z-index: -999; 
  width: 100%;
  background-color: orange; /* Replace with your desired color */
  padding: 169px; /* Adjust the padding as needed */
  box-sizing: border-box;
  color: orange; /* Set text color to contrast with the background */
  text-align: center;
  font-size: 24px; /* Adjust the font size as needed */
  font-weight: bold;   
}

</style>
