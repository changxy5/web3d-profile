// 管理单个建模
import Experience from "../Experience.js";
import *  as THREE from "three"
import Time from "../Utiles.js/Time.js"
import GSAP from "gsap";
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';

export default class Room{
  constructor(){
    this.experience = new Experience();
    this.time = new Time();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.environment = this.experience.world.environment; // 用于调整暗色和亮色模式，需要在room旋转之前设置位置，否则不能随着房间旋转
    
    this.lerp = {
      current:0,
      target:0,
      weight:0.1
    }

    // 沙漠小屋的模型
    this.room = this.resources.items.desertHouse;
    this.actualroom = this.room.scene;


    
    // 将建模加载到屏幕上
    this.setModel();
    // 加载动画
    this.setAnimation();
    // 灯光

    this.rotation = 0;
    // 鼠标移动控制房间旋转
    this.onMouseMove();


  }

  setModel(){
    console.log('this.actualroom',this.actualroom.children);
    
    // 设置阴影
    this.room.scene.children.forEach(child => {

      child.castShadow = true;
      child.receiveShadow = true;

      // 处理图层组中子元素的阴影
      if(child instanceof THREE.Group){
        child.children.forEach((groupChild)=>{
          groupChild.castShadow = true;
          groupChild.receiveShadow = true;
        })
      }

      // 处理玻璃材质，抄官网。nmd真耗内存不加载了
      if(child.name.indexOf("tank")!= -1){
        child.children[3].material = new THREE.MeshPhysicalMaterial();
        child.children[3].material.roughness = 0;
        child.children[3].material.color.set("#fff");
        child.children[3].material.transmission = 1;
        // 玻璃不要投阴影，否则效果很丑
        child.children[3].castShadow = false;
        child.children[3].receiveShadow = false;
      }

      // 处理电脑屏幕显示视频
      if(child.name==="Computer"){
        child.children[0].material = new THREE.MeshBasicMaterial({
          map: this.resources.items.musicCat
        })
      }

      // 处理灯罩材质，自发光
      if(child.name==="items"){
        child.children[10].material = new THREE.MeshPhysicalMaterial({
          color: "#fff",
          emissive:"#fff"
        })
      }
    });

    // 将建模加载到屏幕上
    this.scene.add(this.actualroom);
    // 将暗黑模式下的灯光添加到场景中，必须在房间发生缩放旋转之前进行
    this.addLights();
    this.actualroom.scale.set(0.7,0.7,0.7);

  }

  // 鼠标移动控制房间旋转
  onMouseMove(){
    window.addEventListener('mousemove', (e)=>{
      // 将鼠标移动的距离转换为旋转角度
      // clientX∈[0,window.innerWidth]，而我们要让它转换为[-1,1]之间
      this.rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
      
      this.lerp.target = this.rotation*0.1; // 可旋转的范围
    })
  }

  // 将三方导出的动画捆绑到模型中
  setAnimation(){
    this.mixer = new THREE.AnimationMixer(this.room.scene);
    this.swim = this.mixer.clipAction(this.room.animations[0]);
    
    this.swim.play();
  }

  // 添加跟随房间移动的点光源和面光源
  addLights(){
    // 灯泡点光
    this.pointLight = new THREE.PointLight("#fecbba", 0, 2,2); // color,intensity=0, distance,decay

    // 鱼缸面光
    this.rectLight = new THREE.RectAreaLight("#fecbba", 0, 0.5, 0.5); // color,intensity=0, width, height
    // blender中的坐标数值要绕x轴旋转90度，才能和threejs中的坐标数值一致
    this.rectLight.position.set(-0.15,0.2,-1.8);
    this.pointLight.position.set(-1.37,2.6,-1)

    // 面光向上or向下
    this.rectLight.rotation.x = Math.PI / 2;
    this.rectLight.rotation.z = Math.PI / 4     
    this.actualroom.add(this.rectLight);
    this.actualroom.add(this.pointLight);

    // helper
    this.rectLight.add(new RectAreaLightHelper( this.rectLight) )
  }

  // 设置暗色模式
  setDarkMode(){
    this.rectLight.intensity = 2;
    this.pointLight.intensity = 0.5;
  }

  // 设置亮色模式
  setLightMode(){
    this.rectLight.intensity = 0;
    this.pointLight.intensity = 0;
  }

  // 处理窗口大小变化
  resize(){

  }
  
  // 更新
  update(){
    // 处理鼠标移动影响建模旋转
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current, 
      this.lerp.target, 
      this.lerp.weight
    );
    this.room.scene.rotation.y = this.lerp.current;

    this.mixer.update(this.time.delta*0.001)
  }
}
