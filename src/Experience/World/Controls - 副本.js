// 管理所有控制器，包括相机路径、鼠标滚轮影响相机移动等
// 鼠标平移影响模型旋转在room.js中写。
import Experience from "../Experience.js";
import *  as THREE from "three";
import Time from "../Utiles.js/Time.js";
import GSAP from "gsap";

export default class Controls{
  constructor(){
    this.experience = new Experience();
    this.time = new Time();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera;
    this.room = this.experience.world.room;

    // this.lerp = {
    //   current:0,
    //   target:0,
    //   weight:0.1
    // }
    

    // // 建立相机路径
    // this.setPath();
    // // 相机移动的进度
    // this.movingProgress = 0
    // // 获取曲线上某个点的坐标并存储在假向量中
    // this.position = new THREE.Vector3(0,0,0);

    // // 鼠标滚轮影响相机移动
    // this.onWheel();

  }

  setPath(){
    // 建立一个贝塞尔曲线
    // this.curve = new THREE.CatmullRomCurve3( [
    //   new THREE.Vector3( 10, 3, 0 ),
    //   new THREE.Vector3( 0, 3, 10 ),
    //   new THREE.Vector3( -10, 3, 0 ),
    //   new THREE.Vector3( 0, 3, -10 )
    // ] ,true);
   
    // this.points = this.curve.getPoints( 50 );
    // this.geometry = new THREE.BufferGeometry().setFromPoints( this.points );
    
    // this.material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
    
    // Create a curve and add it to the scene
    // this.curveObject = new THREE.Line( this.geometry, this.material );

    // this.scene.add(this.curveObject)
  }

  // 鼠标滚轮影响相机【平滑】移动
  onWheel(){
    window.addEventListener('wheel', (e)=>{
      if(e.deltaY > 0){
        this.lerp.target += 0.1;
      }else if(e.deltaY <= 0){
        this.lerp.target -= 0.1;
      }
    })
  }

  setAnimation(){

  }

  // 处理窗口大小变化
  resize(){

  }
  
  // 更新
  update(){
    // 处理current和target越值([0,1])的情况，大于1时取1，小于0时取0
    // this.lerp.current = GSAP.utils.clamp(0.25,0.75,this.lerp.current);
    // this.lerp.target = GSAP.utils.clamp(0.25,0.75,this.lerp.target);

    // this.lerp.current = GSAP.utils.interpolate(
    //   this.lerp.current, 
    //   this.lerp.target, 
    //   this.lerp.weight
    // );

    // this.curve.getPointAt(this.lerp.current, this.position); 
    // // 令相机跟随曲线移动
    // this.camera.orthographicCamera.position.copy(this.position);
    
    // this.camera.orthographicCamera.lookAt(0,2,0);
  }
}
