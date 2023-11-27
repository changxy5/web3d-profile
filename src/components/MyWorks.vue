<template>
  <div class="root">
    <div class="main">
    <div class="progress-bar"></div>
    <div class="titleblock">
      <div class="titles">
        <div class="style1"></div>
        <div class="style2"></div>
        <div class="style3"></div>
        <div class="title">02<br/>My&nbspWorks</div>
        <!-- <div class="index">01</div> -->
      </div>
    </div>

    <div class="section" v-for="i in (0,10)">
      <div class="title">The Shawshank Redemption</div>
      <div class="content">Hope is a good thing, maybe the best of things. And no good thing ever dies. <br/>希望是美好的，或许是人间至善。而美好的事物永不消逝。</div>
    </div>
    </div>
  </div>

</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>

.root{
  z-index: 999;
  position:relative;
  width:100vw;
  .main{
  border-top-left-radius: 500px;
  margin-left: auto;
  justify-content: center;
  width:50vw;
  align-items: center;
  flex-direction: column;
  background-color: var(--pale-green);
  padding:50px 50px;
  // 主题切换时平滑过渡
  transition:all 0.3s;
  .progress-bar{
    background-color: var(--green);
    right:5px;
    left:auto;
  }
  .titleblock{
    height:800px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    color:var(--green);
    border-bottom: 2px solid  var(--green);
    .titles{
      position: relative;
      top:150px;
      height:500px;
      // justify-content: center;
      // align-items: center;
      .title{
        padding: 5px;
        font-size:26px;
        font-weight: 600;
        position:absolute;
        top:40px;
        transform:skewY(25deg);
        height:45px;
        width:150px;
        color:var(--green);
        // background-color: #fae3d9;
      }
      .style1,.style2,.style3{
        // 主题切换时平滑过渡
        transition:all 0.3s;
        position: absolute;
        display: block;
        width: 100%;
        max-width: 268px;
        height:60px;
        border: 1px solid var(--green);
        transform-origin: left;
        transform: skewY(-25deg);
      }

      .style1{
        top: 0px;
      }

      .style2{
        top:80px;
      }

      .style3{
        top:80px;
        transform: skewY(25deg);
        background-color: var(--green);
      }
    }
  }

  
  }

  .section{
    margin-top: 30px;
    .title{
      font-size:16px;
      font-weight: 600;
      line-height: 40px;
    }
    .content{
      font-size:14px;
      line-height: 26px;
    }
  }

  // 响应式
  @media (max-width:668px){
    .main{
      width:100vw;
    }
  }

}

</style>