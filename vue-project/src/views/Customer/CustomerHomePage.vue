<template>
  <div :class="$style.homePage">
    <div :class="$style.banner">
    </div>
    <div :class="$style.facilities">
      <b :class="$style.heading3">Facilities</b>
      <div :class="$style.label">
        <div :class="$style.spanef785aa7f4" />
        <div :class="$style.divdcd1ccc0b6">
          <div :class="$style.spanabf093bdfe">
            <div :class="$style.div">315</div>
          </div>
        </div>
      </div>
      <div :class="$style.label1">
        <div :class="$style.spanef785aa7f4" />
        <div :class="$style.divdcd1ccc0b6">
          <div :class="$style.spanabf093bdfe">
            <div :class="$style.div">302</div>
          </div>
        </div>
      </div>
      <div :class="$style.label2">
        <div :class="$style.spanef785aa7f4" />
        <div :class="$style.divdcd1ccc0b6">
        </div>
      </div>
      <div :class="$style.label3">
        <div :class="$style.spanef785aa7f4" />
        <div :class="$style.divdcd1ccc0b6">
        </div>
      </div>
      <div :class="$style.button">
        <div :class="$style.spa">Show all 14</div>
        <div :class="$style.svg">
          <img :class="$style.vectorIcon" alt="" src="/vector.svg" />
        </div>
      </div>
    </div>
    <div :class="$style.areaOfSingapore">
      <b :class="$style.heading3">Area Of Singapore</b>
      <div :class="$style.label">
        <div :class="$style.spanef785aa7f4" />
        <div :class="$style.divdcd1ccc0b6">
          <div :class="$style.diva53cbfa6de">
            <div :class="$style.spa">Central</div>
          </div>
          <div :class="$style.spanabf093bdfe">
            <div :class="$style.div">315</div>
          </div>
        </div>
      </div>
      <div :class="$style.label1">
        <div :class="$style.spanef785aa7f4" />
        <div :class="$style.divdcd1ccc0b6">
          <div :class="$style.diva53cbfa6de1">
            <div :class="$style.spa">North</div>
          </div>
          <div :class="$style.spanabf093bdfe">
            <div :class="$style.div">302</div>
          </div>
        </div>
      </div>
      <div :class="$style.label2">
        <div :class="$style.spanef785aa7f4" />
        <div :class="$style.divdcd1ccc0b6">
          <div :class="$style.diva53cbfa6de2">
            <div :class="$style.spa">East</div>
          </div>
          <div :class="$style.spanabf093bdfe">
            <div :class="$style.div">179</div>
          </div>
        </div>
      </div>
      <div :class="$style.label3">
        <div :class="$style.spanef785aa7f4" />
        <div :class="$style.divdcd1ccc0b6">
          <div :class="$style.diva53cbfa6de3">
            <div :class="$style.spa">South</div>
          </div>
          <div :class="$style.spanabf093bdfe">
            <div :class="$style.div">134</div>
          </div>
        </div>
      </div>
      <div :class="$style.label4">
        <div :class="$style.spanef785aa7f4" />
        <div :class="$style.divdcd1ccc0b6">
          <div :class="$style.diva53cbfa6de2">
            <div :class="$style.spa">West</div>
          </div>
          <div :class="$style.spanabf093bdfe">
            <div :class="$style.div">134</div>
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.frame">
      <img :class="$style.frameIcon" alt="" src="@/assets/orangeGetFitt.png" />
    </div>
    <div :class="$style.frame1">
      <div :class="$style.fitnessForYou">Fitness For You</div>
    </div>
    <div :class="$style.frame2">
      <div :class="$style.divaca0ade214">
        <div :class="$style.linkmargin">
          <div :class="$style.linkList">List your property</div>
        </div>
        <div :class="$style.linkCreateAnAccountmargi">
          <div :class="$style.linkCreateAnAccount">
            <div :class="$style.register">Register</div>
          </div>
        </div>
      </div>
      <div :class="$style.linkCreateAnAccountmargi1">
        <div :class="$style.linkCreateAnAccount">
          <div :class="$style.register">Sign Out</div>
        </div>
      </div>
      <div :class="$style.welcomeUser123">Welcome, User123</div>
    </div>
    <div :class="$style.frame3">
      <div :class="$style.frame4">
        <img :class="$style.frameChild" alt="" src="/rectangle-3.svg" />
        <img :class="$style.frameItem" alt="" src="/rectangle-4.svg" />
        <div :class="$style.viewGyms">View Gyms</div>
        <div :class="$style.svg1">
          <img :class="$style.vectorIcon1" alt="" src="/vector1.svg" />
        </div>
        <div :class="$style.svg2" />
        <div :class="$style.viewProducts">View Products</div>
        <img :class="$style.image2Icon" alt="" src="/image-2@2x.png" />
      </div>
    </div>
  </div>
</template>
<script>
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "HomePage",
  });
</script>
<style module>
  .heading3 {
    position: absolute;
    top: 12px;
    left: 13px;
    font-size: var(--font-size-sm);
    line-height: 20px;
  }
  .spanef785aa7f4 {
    position: relative;
    border-radius: var(--br-9xs);
    background-color: var(--color-white);
    border: 1px solid var(--color-gray-100);
    box-sizing: border-box;
    width: 20px;
    height: 20px;
    z-index: 1;
  }
  .spa {
    position: relative;
    line-height: 20px;
  }
  .diva53cbfa6de {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-0) 7.3300018310546875px var(--padding-0)
      var(--padding-0);
  }
  .div {
    position: relative;
    line-height: 18px;
  }
  .spanabf093bdfe {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-0) 1.0300006866455078px var(--padding-0)
      var(--padding-0);
    font-size: var(--font-size-2xs);
    color: var(--color-darkslategray-100);
  }
  .divdcd1ccc0b6 {
    width: 205px;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    z-index: 0;
  }
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
  .diva53cbfa6de1 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-0) 2.3400001525878906px var(--padding-0)
      var(--padding-0);
  }
  .label1 {
    position: absolute;
    width: calc(100% - 21px);
    top: 63px;
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
  }
  .diva53cbfa6de2 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .label2 {
    position: absolute;
    width: calc(100% - 21px);
    top: 93px;
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
  }
  .diva53cbfa6de3 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-0) 0.5900001525878906px var(--padding-0)
      var(--padding-0);
  }
  .label3 {
    position: absolute;
    width: calc(100% - 21px);
    top: 123px;
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
  }
  .label4 {
    position: absolute;
    width: calc(100% - 21px);
    top: 153px;
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
  .svg {
    width: 24px;
    height: 24px;
    overflow: hidden;
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-5xs) 4.731846809387207px 7.999969482421875px
      4.731929779052734px;
    box-sizing: border-box;
  }
  .button {
    position: absolute;
    top: 194px;
    left: 13px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 0.39px;
    font-size: var(--font-size-sm);
    color: var(--color-royalblue);
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
  .areaOfSingapore {
    position: absolute;
    width: calc(100% - 1178px);
    top: 771px;
    right: 1176px;
    left: 2px;
    height: 226px;
    display: none;
  }
  .frameIcon {
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
    left: 0px;
    line-height: 20px;
  }
  .frame1 {
    position: absolute;
    top: 314px;
    left: 549px;
    width: 342px;
    height: 20px;
    overflow: hidden;
    font-size: var(--font-size-29xl);
    color: var(--color-black);
  }
  .linkList {
    position: relative;
    line-height: 24px;
    font-weight: 500;
  }
  .linkmargin {
    display: none;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: var(--padding-5xs) 24.610000610351562px var(--padding-5xs)
      var(--padding-xs);
    box-sizing: border-box;
    min-width: 56px;
    min-height: 56px;
  }
  .register {
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
  .linkCreateAnAccountmargi {
    display: none;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: var(--padding-9xs) var(--padding-5xs) var(--padding-9xs)
      var(--padding-0);
    box-sizing: border-box;
    min-width: 44px;
    min-height: 44px;
    font-size: var(--font-size-sm);
    color: var(--color-royalblue);
  }
  .divaca0ade214 {
    position: absolute;
    top: calc(50% - 44px);
    left: 1298px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
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
  .frameChild {
    position: absolute;
    top: 0px;
    left: 33px;
    width: 412px;
    height: 502px;
  }
  .frameItem {
    position: absolute;
    top: 0px;
    left: 584px;
    width: 412px;
    height: 502px;
  }
  .viewGyms {
    position: absolute;
    top: 389px;
    left: 119px;
    line-height: 20px;
  }
  .vectorIcon1 {
    position: relative;
    width: 288px;
    height: 239px;
    mix-blend-mode: color;
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
  .viewProducts {
    position: absolute;
    top: 389px;
    left: 638px;
    line-height: 20px;
  }
  .image2Icon {
    position: absolute;
    top: 80px;
    left: 673px;
    width: 251px;
    height: 263px;
    object-fit: cover;
    mix-blend-mode: hue;
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
  .homePage {
    position: relative;
    background-color: var(--color-white);
    width: 100%;
    height: 1024px;
    overflow: hidden;
    text-align: left;
    font-size: var(--font-size-smi);
    color: var(--color-gray-200);
    font-family: var(--font-roboto);
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
