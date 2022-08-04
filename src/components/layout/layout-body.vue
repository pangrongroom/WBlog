<template>
  <div id="layout-body">
    <vue-particles
      color="#dedede"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#dedede"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    <router-view></router-view>
    <back-top></back-top>
  </div>
</template>

<script>
import backTop from "@/components/back-top";
export default {
  name: "layout-body",
  data() {
    return {
      minHeight: 600,
      time: "",
      date: "",
    };
  },
  components: { backTop },
};
console.clear();
</script>

<style scoped>
#layout-body {
  /* header = 80px */
  /* min-height: -moz-calc(100vh - 80px);
  min-height: -webkit-calc(100vh - 80px);
  min-height: calc(100vh - 80px); */
}
#particles-js {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: -1;
}
</style>
