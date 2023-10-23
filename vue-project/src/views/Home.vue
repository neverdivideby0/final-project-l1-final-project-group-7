<template>
    <Header/>
    <WelcomeCpp/>
    <AddCoin @added="change" />
    <ProfitDisplay :key="refreshComp"/>
    <img id = "bg" src = "@/assets/Coins.png" alt="">
</template>

<script>
import Header from '@/components/Header.vue'
import WelcomeCpp from '@/components/WelcomeCpp.vue'
import AddCoin from '@/components/AddCoin.vue'
import ProfitDisplay from '@/components/ProfitDisplay.vue'

export default{
    name: 'App',
    components:{
      WelcomeCpp,
      AddCoin,
      ProfitDisplay
    },
    data(){
      return{
        refreshedComp:0
      }
    },
    methods:{
      change(){
        this.refreshedComp += 1
      }
    }
  }
</script>

