// 管理光照、环境
import Experience from "../Experience.js";
import *  as THREE from "three"
import GSAP from 'gsap'


export default class World{
  constructor(){
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    
    // 设置光照
    this.setSunLight()
  }

  // 设置光照
  setSunLight(){
    // 平行光，用于模拟日光。可以用来投射阴影。
    this.sunLight = new THREE.DirectionalLight("#ffffff", 3);
    // 令阴影投射=true
    this.sunLight.castShadow = true;
    // 设置shadow.camera(一个正交相机)的视野范围，否则房间发生缩放时会出现阴影显示不全的问题.
    this.sunLight.shadow.camera.far = 100;
    this.sunLight.shadow.camera.top = 8;
    this.sunLight.shadow.camera.bottom = -8;
    this.sunLight.shadow.camera.left = -8;
    this.sunLight.shadow.camera.right = 8;
    // camerahelper
    // const shadowhelper = new THREE.CameraHelper( this.sunLight.shadow.camera);
    // this.scene.add( shadowhelper );
    // 设置阴影质量
    this.sunLight.shadow.mapSize.set(2048, 2048);
    // 设置阴影偏移，必须设置，否则会出现阴影抖动
    this.sunLight.shadow.normalBias = 0.1;
    // console.log('this.sunLight',this.sunLight.shadow.camera);

    // 设置光照的位置，先大致设置在屏幕的上方，之后再调整
    this.sunLight.position.set(2, 8, 8);
    // 将日光加载到场景中
    this.scene.add(this.sunLight)

    // 环境光
    this.ambientLight = new THREE.AmbientLight('#ECCEFF', 1);
    this.scene.add(this.ambientLight)

    // 其他光线需要在room中添加，因为需要根据room的旋转缩放来实时设置光线的位置

  }

  // 设置暗色模式
  setDarkMode(){
    GSAP.to(this.sunLight, {
      duration: 0.5, 
      intensity: 0.2
    })
    GSAP.to(this.ambientLight, {
      duration: 0.5, 
      intensity: 0.2,
      // color:"#A5D7E8"
    })
    this.ambientLight.color.set("#6b5b8c")
  }

  // 设置亮色模式
  setLightMode(){
    GSAP.to(this.sunLight, {
      duration: 0.5, 
      intensity: 3
    })
    GSAP.to(this.ambientLight, {
      duration: 0.5,
      intensity: 1
    })
    this.ambientLight.color.set("#ECCEFF")
  }

  // 处理窗口大小变化
  resize(){

  }
  
  // 更新
  update(){

  }
}
