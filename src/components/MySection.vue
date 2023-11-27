<template>
    <div class="root" :style="colorStyle">
    <div class="main" :style="mainPosition" ref="main">
    <div class="progress-bar" :style="progressStyle" ref="progressBar"></div>
    <div class="titleblock" ref="titleBlock">
      <div class="titles">
        <div class="style1"></div>
        <div class="style2"></div>
        <div class="style3"></div>
        <div class="title">0{{index}}<br/>{{title}}</div>
      </div>
    </div>

    <div class="echarty">
      <div id="myEcharts" :style="{ width: '100%', height: '400px' }"></div>
    </div>

    <div class="section" v-for="i in (0,10)">
      <div class="title">The Shawshank Redemption</div>
      <!-- 这里要用template吧 -->
      <div class="content">{{content}}</div>
    </div>
    </div>
  </div>
</template>

<script>
import {ref,reactive,onMounted} from "vue"
import ScrollTrigger from "gsap/ScrollTrigger"
import GSAP from "gsap"
import * as echarts from 'echarts'

export default {
  name:"MySection",
  props:{
    index:Number,
    title:String,
    color:String,
    position:String
  },
  setup(props){
    GSAP.registerPlugin(ScrollTrigger);
    let myEcharts = echarts;

    let content = ref("Hope is a good thing, maybe the best of things. And no good thing ever dies. \n 希望是美好的，或许是人间至善。而美好的事物永不消逝。");
    // 测试echarts

    // 提供dom元素绑定对象
    const main = ref(null)
    const titleBlock = ref(null)
    const progressBar = ref(null)
    // 配置颜色
    const colorStyle = reactive({
      '--pale-color':`var(--pale-${props.color})`,
      '--color':`var(--${props.color})`
    })
    const mainPosition = reactive({
      'border-top-right-radius':`${props.position==='right'?0:500}px`,
      'border-top-left-radius':`${props.position==='left'?0:500}px`,
      'border-bottom-right-radius':`${props.position==='right'?0:200}px`,
      'border-bottom-left-radius':`${props.position==='left'?0:200}px`,
      'margin-left':`${props.position==='right'?'auto':0}`,
    })
    const progressStyle = reactive({
      'left':`${props.position==='left'?0:null}`,
    })

    //  scrolltrigger border
    onMounted(()=>{
      // echarts
      initChart();


      // border
      if(props.position === 'left'){
        // 右上角border
        GSAP.to(main.value,{
        borderTopRightRadius:200,
        scrollTrigger:{
          trigger:main.value,
          start:"top bottom",
          end:"top top",
          scrub:0.5,
          // markers:true
          }
        })
        // 右下角border
        GSAP.to(main.value,{
          borderBottomRightRadius:500,
          scrollTrigger:{
            trigger:main.value,
            start:"bottom bottom",
            end:"bottom top",
            scrub:0.5,
            // markers:true
          }
        })
      }else if(props.position === 'right'){
        GSAP.to(main.value,{
          borderTopLeftRadius:200,
          scrollTrigger:{
            trigger:main.value,
            start:"top bottom",
            end:"top top",
            scrub:0.5,
            // markers:true
          }
        })
        GSAP.to(mainPosition,{
          borderBottomLeftRadius:500,
          scrollTrigger:{
            trigger:main.value,
            start:"bottom bottom",
            end:"bottom top",
            scrub:0.5,
            // markers:true
          }
        })
      }

            // 进度条，注意样式很重要
      GSAP.from(progressBar.value,{
        scaleY:0,
        scrollTrigger:{
          trigger:main.value,
          start:"top top ",
          end:"bottom bottom",
          scrub:2,
          pin:progressBar.value,
          pinSpacing:false,
        }
      })
      
    })

    const initChart = async() => {
      let chart = myEcharts.init(document.getElementById("myEcharts"),"purple-passion");
      chart.setOption({
        title: {
          text: "2021年各月份销售量（单位：件）",
          left: "center",
        },
        xAxis: {
          type: "category",
          data: [
            "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"
          ]
        },
        tooltip: {
          trigger: "axis"
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [
              606, 542, 985, 687, 501, 787, 339, 706, 383, 684, 669, 737
            ],
            type: "line",
            smooth: true,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: "top",
                  formatter: "{c}"
                }
              }
            }
          }
        ]
      })
      window.onresize = function () {
        chart.resize();
      };
    }
    return{content,colorStyle,mainPosition,progressStyle,main,titleBlock,progressBar,initChart}
  }  
}
</script>

<style lang="scss" scoped>

.root{
  z-index: 999;
  position:relative;
  width:100vw;
  .main{
  justify-content: center;
  width:50vw;
  align-items: center;
  flex-direction: column;
  background-color: var(--pale-color);
  padding:0 50px;
  padding-top:100px;
  padding-bottom: 500px;
  // 主题颜色切换时平滑过渡
  transition:all 0.3s;
  /* 滚动条 */
  .progress-bar{
    z-index: 999;
    position: absolute;
    top:0;
    // left:0;
    right:5px;
    width:10px;
    height:100vh;
    transform-origin: top;
    transform: scaleY(1);
    /* 默认粉色，不同组件自己调 */
    background-color: var(--color);
  }
  .titleblock{
    height:800px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    color:var(--color);
    border-bottom: 2px solid var(--color);
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
        width:200px;
        color:var(--color);
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
        border: 1px solid var(--color);
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
        background-color: var(--color);
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