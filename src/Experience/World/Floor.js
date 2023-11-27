// 管理白色的地面/背景
import *  as THREE from "three"
import Experience from "../Experience.js";

export default class Floor{
  constructor(){
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.setFloor();
    this.setCircle();

  }

  setFloor(){
    this.geometry = new THREE.PlaneGeometry(100,100)
    this.material = new THREE.MeshStandardMaterial({
      color:"#ffffff",
    })
    this.plane = new THREE.Mesh(this.geometry,this.material);
    this.scene.add(this.plane);
    this.plane.rotation.x = -Math.PI * 0.5;
    this.plane.position.y = -0.3;
    // 让地面可以被投射阴影
    this.plane.receiveShadow = true;
  }

  setCircle(){
    const geometry1 = new THREE.CircleGeometry( 1, 32 );
    const geometry2 = new THREE.CircleGeometry( 1, 32 );

    const material1 = new THREE.MeshPhysicalMaterial( { color: "#ffb6b9" } );
    const material2 = new THREE.MeshPhysicalMaterial( { color: "#8b8687" } );

    this.circleFloors={};
    this.circleFloors.pinkCircle = new THREE.Mesh( geometry1, material1 );
    this.circleFloors.grayCircle = new THREE.Mesh( geometry2, material2 );
    let delta = 0.05;
    let count  = 0;
    for (let c in this.circleFloors){
      this.scene.add(this.circleFloors[c]);
      this.circleFloors[c].receiveShadow = true;
      this.circleFloors[c].rotation.x = -Math.PI * 0.5;
      this.circleFloors[c].position.y = -0.2 - delta * count;
      count++;
    }

  }
  
  // 处理窗口大小变化
  resize(){

  }
  
  // 更新
  update(){

  }

}

