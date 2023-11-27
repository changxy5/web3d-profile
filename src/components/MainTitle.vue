<template>
  <div class="root">
    <div class="titles2">
      深圳市租房数据可视化系统
      <div class="subtitle">
        时间取自2021年1月-2023年12月
      </div>
    </div>
    <div class="titles1">
      Rendting Data visualization
      <div class="subtitle">
        Everything you what to know about renting.
      </div>
    </div>
    <div class="scrollTip">
      <div>
        Scroll to get started...
      </div>
      <div class="scrollSVG"><svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M480 711 240 471l43-43 197 198 197-197 43 43-240 239Z"/></svg></div>
    </div>
  </div>
</template>

<script>
export default {

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
    .titles1{
      line-height: 36px;
      position:absolute;
      transform: translate(-100px,120px);
      .subtitle{
        font-size: 16px;
      }
    }
    .titles2{
      line-height: 28px;
      font-size: 26px;
      position: absolute;
      transform: translate(170px,-150px);
      .subtitle{
        font-size: 14px;
      }
    }
    .scrollTip{
      position:absolute;
      bottom:50px;
      font-size: 16px;
      display: flex;
      justify-content: center;
      .scrollSVG{
        position: absolute;
        top:10px;
        animation:fadeOutDown 1s infinite;
      }
    }

    @keyframes fadeOutDown {
      0% {
        opacity: 1;
        transform: translateY(0);
      }
      100% {
        opacity: 0;
        transform: translateY(10px);
      }
    }
  }

</style>