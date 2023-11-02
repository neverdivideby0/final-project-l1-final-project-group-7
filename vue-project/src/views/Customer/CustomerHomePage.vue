<template>
  <div :class="$style.homePage">
    <div :class="$style.body">
      <div :class="$style.banner">
      </div>
      <div :class="$style.frame">
        <img :class="$style.logo" alt="" src="@/assets/orangeGetFitt.png" />
      </div>
      <div :class="$style.frame1">
        <div :class="$style.fitnessForYou">Fitness For You</div>
      </div>
      <div :class="$style.frame2">
        <div :class="$style.linkCreateAnAccountmargi1">
          <div :class="$style.signOut">
            <button @click="signOut">Sign Out</button>  
          </div>
        </div>
        <div :class="$style.welcomeUser123">Welcome, User123</div>
      </div>
      <div :class="$style.frame3">
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
  </div>
  <LogOut />
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
    top: 0px;
    left: 0px;
    width: 551px;
    height: 132px;
    overflow: hidden;
    object-fit: cover;
    mix-blend-mode: darken;
  }
  .frame {
    position: absolute;
    top: 159px;
    left: 444px;
    width: 552px;
    height: 132px;
    overflow: hidden;
  }
  .fitnessForYou {
    position: absolute;
    top: 0px;
    left: center;
    width: 551px;
    height: 132px;
    overflow: hidden;
    object-fit: cover;
    mix-blend-mode: darken;
  }
  .frame1 {
    position: absolute;
    top: 366px;
    left: 549px;
    width: 342px;
    height: 20px;
    overflow: hidden;
    font-size: var(--font-size-29xl);
    color: var(--color-black);
  }

  .signOut {
    position: relative;
    line-height: 20px;
    font-weight: 500;
  }
  .linkCreateAnAccount {
    border-radius: var(--br-9xs);
    background-color: var(--color-white);
    border: 1px solid var(--color-royalblue);
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: var(--padding-5xs) 11.13999938964843var (--padding-5xs) 8px
      var(--padding-xs);
    min-width: 36px;
    min-height: 36px;
  }
  .linkCreateAnAccountmargi1 {
    position: absolute;
    top: 31px;
    left: 1298px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: var(--padding-9xs) var(--padding-5xs) var(--padding-9xs)
      var(--padding-0);
    box-sizing: border-box;
    min-width: 44px;
    min-height: 44px;
    font-size: var(--font-size-base);
    color: var(--color-royalblue);
  }
  .welcomeUser123 {
    position: flex;
    top: 49px;
    text-align: center;
    font-size: 50px;
    line-height: 100px;
    font-weight: 900;
    color: var(--color-black);
    color: black;
  }
  .frame2 {
    position: absolute;
    top: 0px;
    left: 0px;
    background-color: var(--color-tomato);
    width: 1440px;
    height: 106px;
    overflow: hidden;
    font-size: var(--font-size-mini);
    color: var(--color-white);
  }
.leftSquare {
  position: absolute;
  top: 0px;
  left: 33px;
  width: 412px;
  height: 502px;
  background-color: red; 
}
.rightSquare {
  position: absolute;
  top: 0px;
  left: 584px;
  width: 412px;
  height: 502px;
  background-color: turquoise; 
}

  .viewGyms {
    position: absolute;
    top: 389px;
    left: 180px;
    line-height: 20px;
  }
  .viewProducts {
    position: absolute;
    top: 389px;
    left: 730px;
    line-height: 20px;
  }
  .gymsIcon {
    position: absolute;
    top: 20px;
    left: 111px;
    width: 251px;
    height: 263px;
    object-fit: cover;
    mix-blend-mode: hue;
  }
  .productsIcon {
    position: absolute;
    top: 75px;
    left: 660px;
    width: 251px;
    height: 263px;
    object-fit: cover;
    color: black;
    mix-blend-mode: hue;
  }
  .svg1 {
    position: absolute;
    top: 55px;
    left: 0px;
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
    top: 0px;
    left: 156px;
    width: 1184px;
    height: 502px;
    overflow: hidden;
  }
  .frame3 {
    position: absolute;
    top: 400px;
    left: 50px;
    width: 1340px;
    height: 502px;
    overflow: hidden;
    font-size: var(--font-size-29xl);
    color: var(--color-black);
  }
/* ... other styles ... */

.homePage {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 100vh; /* Set the minimum height of the homepage to 100% of the viewport height */
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
