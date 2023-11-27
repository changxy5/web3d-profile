// 鼠标滚轮影响room的x坐标，实现平移的效果
// 使用scrolltrigger.matchmedia来实现不同的平移效果
import Experience from "../Experience.js";
import *  as THREE from "three";
import Time from "../Utiles.js/Time.js";
import GSAP from "gsap";
import {ScrollTrigger} from "gsap/src/ScrollTrigger";

export default class Controls{
  constructor(){
    this.experience = new Experience();
    this.time = new Time();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera;
    this.room = this.experience.world.room.actualroom;
    this.circleFloors = this.experience.world.floor.circleFloors;
    this.scrub = 2; // 过渡时间，越小越快
    // 找到面光，跟随房间进行缩放
    this.room.children.forEach((child)=>{
      if(child.type==='RectAreaLight'){
        this.rectLight = child;
      }
    })

    GSAP.registerPlugin(ScrollTrigger);
    this.setMovingPath();
    this.setCirclesPath();

  }

  // 房间缩放和摄像机平移
  setMovingPath(){
    // 响应式，不同尺寸触发不同动画：横屏平移竖屏缩放
    let mm = GSAP.matchMedia();
    // 横屏模式 firstmove，平移
    mm.add("(min-width: 669px)", () => {
      //#region .first-move---------------------
      this.firsttimeline = new GSAP.timeline({
        scrollTrigger:{
          trigger:".first-move", // 触发scroll的元素
          markers:false,  // 显示start和end的位置辅助标记，可关
          start:"top top", // 触发scroll的位置，在【元素顶部】移动到【页面顶部】时触发
          end:"bottom bottom", // 结束scroll的位置，在【元素底部】移动到【页面顶部】时结束
          scrub:this.scrub, // 过渡速度
          invalidateOnRefresh:true, // 刷新时重新计算
        }
      }).to(this.room.position, {
        // 过渡后的位置
        // 以函数形式返回，配合invaliadateOnRefresh令房间位置在刷新时（窗口尺寸变化时）重新计算
        x:()=>this.sizes.width*0.75*0.0029
      })
      // #endregion

    });

    // 竖屏模式 firstmove，缩放
    mm.add("(max-width: 668px)", () => {
      //#region .first-move---------------------
      this.firsttimeline = new GSAP.timeline({
        scrollTrigger:{
          trigger:".first-move", 
          markers:false, 
          start:"top top",
          end:"bottom bottom",
          scrub:this.scrub, 
          invalidateOnRefresh:true, 
        }
      }).to(this.room.scale, {
        x:()=>this.room.scale.x*1.5,
        y:()=>this.room.scale.y*1.5,
        z:()=>this.room.scale.z*1.5
      })
      // #endregion
        
    });

    //#region .second-move---------------------
    this.secondtimeline = new GSAP.timeline({
      scrollTrigger:{
        trigger:".second-move", // 触发scroll的元素
        markers:false,  // 显示start和end的位置辅助标记，可关
        start:"top top", // 触发scroll的位置，在【元素顶部】移动到【页面顶部】时触发
        end:"bottom bottom", // 结束scroll的位置，在【元素底部】移动到【页面顶部】时结束
        scrub:this.scrub, // 过渡速度，越小越快
        invalidateOnRefresh:true, // 刷新时重新计算
      }
    })
    // 过渡位置
    .to(this.room.position, {
      x:()=>2.5,
      z:()=>this.sizes.width*0.75*0.006
    },"same") // 位置和缩放同时进行
    // 过渡缩放
    .to(this.room.scale, {
      x:()=>this.room.scale.x*4,
      y:()=>this.room.scale.y*4,
      z:()=>this.room.scale.z*4
    },"same") // 位置和缩放同时进行
    // 过渡面光缩放
    .to(this.rectLight, {
      width:this.rectLight.width*4,
      height:this.rectLight.height*4,
    },"same")
    //#endregion

    //#region .third-move---------------------
    // 这次移动相机位置
    this.thirdtimeline = new GSAP.timeline({
      scrollTrigger:{
        trigger:".third-move", 
        markers:false,  
        start:"top top", 
        end:"bottom bottom", 
        scrub:this.scrub, 
        invalidateOnRefresh:true,
      }
    }).to(this.camera.orthographicCamera.position, {
      // 过渡相机位置
      x:()=>this.sizes.width*0.75*0.004,
      z:()=>this.sizes.height*0.75*0.03,
    })
    //#endregion

    //#region .end-move---------------------
    // 相机和缩放都要调回去
    this.endtimeline = new GSAP.timeline({
      scrollTrigger:{
        trigger:".end-move", 
        markers:false,  
        start:"top top", 
        end:"bottom bottom", 
        scrub:this.scrub, 
        invalidateOnRefresh:true,
      }
    }).to(this.camera.orthographicCamera.position, {
      // 过渡相机位置
      x:()=>0,
      z:()=>this.sizes.height*0.75*0.012,
    },"same").to(this.room.scale, {
      x:()=>this.room.scale.x*0.25,
      y:()=>this.room.scale.y*0.25,
      z:()=>this.room.scale.z*0.25
    },"same").to(this.room.position, {
      x:()=>0,
      z:()=>0
    },"same").to(this.rectLight, {
      width:this.rectLight.width*0.25,
      height:this.rectLight.height*0.25,
    },"same")
    //#endregion
  }

  // 地面圆圈的缩放
  setCirclesPath(){

    // 第一个圆圈，粉色
    let pinkCircle = this.circleFloors.pinkCircle;
    let grayCircle = this.circleFloors.grayCircle;
    GSAP.timeline({
      scrollTrigger:{
        trigger:'.first-move',
        start:"top top",
        end:"bottom bottom",
        scrub:3,
        invalidateOnRefresh:true,
      }
    }).to(pinkCircle.scale,{
      x:()=>pinkCircle.scale.x*10,
      y:()=>pinkCircle.scale.y*10,
      z:()=>pinkCircle.scale.z*10,
    },"same").to(pinkCircle.position,{
      x:()=>2
    },"same")

    // 最后的圆圈，灰色
    GSAP.timeline({
      scrollTrigger:{
        trigger:".end-move",
        start:"top bottom",
        end:"bottom bottom",
        scrub:3,
        invalidateOnRefresh:true,
      }
    }).to(grayCircle.scale,{
      x:()=>grayCircle.scale.x*10,
      y:()=>grayCircle.scale.y*10,
      z:()=>grayCircle.scale.z*10,
    },"same").to(grayCircle.position,{
      y:()=>-0.1
    },"same")

  }

  // 处理窗口大小变化
  resize(){

  }
  
  // 更新
  update(){

  }
}
