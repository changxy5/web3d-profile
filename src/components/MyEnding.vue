<template>
  <div class="root" ref="root">
    <div class="title">
      感谢您的驻足
      <div class="subtitle">
        Our story has just begun...
      </div>
    </div>
    <div class="backtotop" @click="backToTop()">
      <svg 
        xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M480 896q-133 0-226.5-93.5T160 576q0-133 93.5-226.5T480 256q85 0 149 34.5T740 385V256h60v254H546v-60h168q-38-60-97-97t-137-37q-109 0-184.5 75.5T220 576q0 109 75.5 184.5T480 836q83 0 152-47.5T728 663h62q-29 105-115 169t-195 64Z"/>
      </svg>
      <div class='text'>重新浏览</div>
    </div>
  </div>
</template>

<script>
import {ref,onMounted} from 'vue'
import GSAP from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
GSAP.registerPlugin(ScrollTrigger)
export default {
  setup(){
    const root = ref(null)
    function backToTop(){
      window.scrollTo({
        top:0,
        behavior:"smooth"
      })
    }
    onMounted(()=>{
      GSAP.to(root.value,{
      })
    })
    return {backToTop,root}
  }
}
</script>

<style lang="scss" scoped>

  .root{
    z-index: 999;
    position: relative;
    height:100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 36px;
    backdrop-filter: blur(5px);
    .titles{
      line-height: 28px;
      font-size: 26px;
      position: absolute;
      transform: translate(-170px,150px);
      .subtitle{
        font-size: 14px;
      }
    }

  .backtotop{
    cursor:pointer;
    position:absolute;
    bottom:calc(50vh - 120px);
    text-align: center;
    padding:10px 20px 10px 10px;
    background-color: var(--pale-green);
    border-radius: 60px;
    font-size: 16px;
    display:flex;
    align-items: center;
    transition:all 0.3s;
    &:hover{
      background-color: #eee;
      box-shadow: rgba(255,255,255,0.3) 0 0 4px;
      transform: scale(1.1);
    }
    &:hover svg{
      animation:rotating 1s infinite linear;
    }
    &:hover .text{
      color:#000;
    }
    svg{
      margin-right: 10px;
      
    }
  }

  @keyframes rotating {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  }

</style>