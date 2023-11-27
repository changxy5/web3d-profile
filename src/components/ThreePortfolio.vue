<template>
<transition name="fadeOut"
  enter-active-class="animate__animated animate__fadeInDown"
  leave-active-class="animate__animated animate__fadeOutUp"
>
  <Preloader v-if="loading"></Preloader>
</transition>
<div class="rooting" asscroll-container>
  <ToggleBar></ToggleBar>
  <div asscroll>

  <div class="first-move">
    <MainTitle></MainTitle>
    <div class="space1">
    </div>
  </div>
  <my-section
    :index="1"
    title="ABOUT ME"
    color="pink"
    position="left"
  ></my-section>

  <div class="space second-move"></div>
  <my-section
    :index="2"
    title="MY WORKS"
    color="green"
    position="right"
  ></my-section>

  <div class="space third-move"></div>
  <my-section
    :index="3"
    title="CONTACT ME"
    color="gray"
    position="left"
  ></my-section>

  <div class="space end-move"></div>
  <MyEnding></MyEnding>

  <div class="exp">
    <canvas class="exp-canvas"></canvas>
  </div>
  </div>
</div>
</template>

<script>
import {onMounted,ref} from 'vue'
import Experience from '../Experience/Experience.js'
import MainTitle from './MainTitle.vue'
import ToggleBar from './ToggleBar.vue'
import MySection from './MySection.vue'
import Preloader from './Preloader.vue'
import MyEnding from './MyEnding.vue'

import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ASScroll from '@ashthornton/asscroll'


gsap.registerPlugin(ScrollTrigger);

export default{
  components:{MySection,MainTitle,ToggleBar,Preloader,MyEnding},
  setup(){
    const loading = ref(true)

  // asscroll 无缝滚动
  function setupASScroll() {
    const asscroll = new ASScroll({
        // disableRaf: true
    });

    // gsap.ticker.add(asscroll.update);

    // ScrollTrigger.defaults({
    //     scroller: asscroll.containerElement
    // });

    // ScrollTrigger.scrollerProxy(asscroll.containerElement, {
    //     scrollTop(value) {
    //         if (arguments.length) {
    //             asscroll.currentPos = value;
    //             return;
    //         }
    //         return asscroll.currentPos;
    //     },
    //     getBoundingClientRect() {
    //         return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
    //     },
    //     fixedMarkers: true
    // });

    // asscroll.on("update", ScrollTrigger.update);
    // ScrollTrigger.addEventListener("refresh", asscroll.resize);
    
    // requestAnimationFrame(() => {
    //    asscroll.enable({
    //         newScrollElements: document.querySelectorAll(".gsap-marker-start, .gsap-marker-end, [asscroll]")
    //     }); 
    // });
    return asscroll;
  }
    
    onMounted(()=>{
      // 写静态页面省省内存吧谢谢
      const experience = new Experience(document.querySelector('.exp-canvas'))
      experience.world.on("worldready",()=>{
        console.log('world is ready now.');
        loading.value = false;
      })
      // 当loaded的时候，摧毁preloader
    })

    return{loading}
  }
}
</script>

<style lang="scss" scoped>

.exp{
  position:fixed;
  top:0;
  left:0;
  width:100vw;
  height:100vh
}

.exp-canvas{
  width: 100vw;
  height: 100vh;
  /* cursor: pointer; */
}

.space1{
  position: relative;
  z-index: 999;
  height:800px;
  width:100vw;
}

.space{
  position: relative;
  z-index: 999;
  height:1200px;
  width:100vw;
}

</style>