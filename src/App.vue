<script>
import ThreePortfolio from "./components/ThreePortfolio.vue";
import {onMounted} from "vue";

export default {
  components: {ThreePortfolio},
  setup() { 
    onMounted(()=>{
    })
  },
};
</script>

<template>

<div class="root">
  <ThreePortfolio></ThreePortfolio>
</div>

</template>

<style>

*{
  color:var(--text-color)
}

@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.font.im/s/montserrat/v24/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Hw5aXx-obK4.woff) format('woff');
}

@font-face {
  font-family: "harmonyOS";
  src: url("/fonts/HarmonyOS_Sans_SC_Regular.ttf");
}

*{
  font-family: "Montserrat","harmonyOS";
}

*::-webkit-scrollbar {
/*滚动条整体样式*/
width : 5px;  /*高宽分别对应横竖滚动条的尺寸*/
height: 1px;
}

*::-webkit-scrollbar-thumb {
/*滚动条里面小方块*/
border-radius: 10px;
box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
background : var(--pink);
}

*::-webkit-scrollbar-track {
/*滚动条里面轨道*/
box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
border-radius: 10px;
background   : #ededed;
}

</style>
