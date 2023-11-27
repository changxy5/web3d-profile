<template>
  <div class="root">
    <div class="loadingtext">Room is getting prepared...</div>
    <!-- <canvas id="loadingCircles" width="80" height="20"></canvas> -->
    <div class="loadingcircles">
      <div class="circles1"></div>
      <div class="circles2"></div>
      <div class="circles3"></div>
    </div>
    
  </div>
</template>

<script>
import {onMounted,ref,reactive,onBeforeUnmount} from "vue"
export default {
  setup(){
  }
}
</script>

<style lang="scss" scoped>
$radius:20px;
$border-radius : calc($radius / 2);
.root{
  position:fixed;
  overflow: hidden;
  width:100vw;
  height:100vh;
  top:0;
  left:0;
  background-color: #f4f0e6;
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .loadingtext{
    font-size: 20px;
    font-weight: 600;
  }
  .loadingcircles{
    display: flex;
    justify-content: space-between;
    width:80px;
    margin-top: 30px;
  }
  .circles1, .circles2, .circles3{
    display: inline-block;
    padding:10px;
    width:$radius;
    height: $radius;
    border-radius:$border-radius;
    background-color: #ea7070;
    animation: jumping 1s infinite;
  }
  .circles2{
    animation-delay: 0.2s;
  }
  .circles3{
    animation-delay: 0.4s;
  }
}

@keyframes jumping {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
  100% {
    transform: translateY(0px);
  }
}

</style>