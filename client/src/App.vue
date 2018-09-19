<template>
  <div id="app">
    <Navbar />
    <!-- <keep-alive>
      <router-view></router-view>
    </keep-alive> -->
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Index from "./components/Index";
import Footer from "./components/Footer";
export default {
  name: "app",
  components: {
    Navbar,
    Index,
    Footer
  }
};
</script>

<style>
</style>
