<template>
    <Header/>
    <DashboardNav/>
</template>
  
<script>
import Header from '@/components/Header.vue';
import DashboardNav from '@/components/DashboardNav.vue';

export default {
    name: 'HomePage',
    components: {
        Header,
        DashboardNav
    }
}
</script>

<style scoped>
h1 {
    background-color: rgb(129, 184, 99);
    text-align: center;
}
</style>
  
  
  
  