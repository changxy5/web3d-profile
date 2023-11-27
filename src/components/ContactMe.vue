<template>
  <div class="root">
    <div class="main">
      <div class="progress-bar"></div>
    <div class="titleblock">
      <div class="titles">
        <div class="style1"></div>
        <div class="style2"></div>
        <div class="style3"></div>
        <div class="title">03<br/>CONTACT&nbspME</div>
        <!-- <div class="index">01</div> -->
      </div>
    </div>

    <div class="section" v-for="i in (0,10)">
      <div class="title">Catch Me If You Can</div>
      <div class="content">Two little mice fell in a bucket of cream. The first mouse quickly gave up and drowend. The second mouse wouldn't quit. He struggled so hard that eventually he churned that cream into butter and crawled out. <br/>两只小老鼠掉进了牛奶桶，第一只很快就放弃了被淹死了。第二只却不放弃，它猛烈挣扎，直到把牛奶都搅拌成了奶油然后爬了出去。</div>
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
  position:absolute;
  width:100vw;
  overflow: hidden;
  .main{
  border-top-right-radius: 500px;
  // overflow: hidden;
  justify-content: center;
  width:50vw;
  align-items: center;
  flex-direction: column;
  background-color: var(--pale-gray);
  padding:50px 50px;
  // 主题切换时平滑过渡
  transition:all 0.3s;
  .progress-bar{
    background-color: var(--gray);
  }
  .titleblock{
    height:800px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    color:var(--gray);
    border-bottom: 2px solid var(--gray);
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
        color:var(--gray);
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
        border: 1px solid var(--gray);
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
        background-color: var(--gray);
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