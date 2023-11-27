// 相机类
import Experience from "./Experience.js"
import {PerspectiveCamera, OrthographicCamera,CameraHelper} from "three"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js"

export default class Camera{
  constructor(){
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    // 创建透视相机
    this.createPerspectiveCamera();
    // 创建正交相机
    this.createOrthographicCamera();
    // 创建视角控制器
    this.setOrbitControls();
  }

  // 创建透视相机
  createPerspectiveCamera(){
    this.perspectiveCamera = new PerspectiveCamera(
      35, // fov = field of view
      this.sizes.aspect, // aspect ratio
      0.1, // near clipping plane
      1000 // far clipping plane
    );
    this.scene.add(this.perspectiveCamera)

    // 初始化相机位置
    this.perspectiveCamera.position.x = 0;
    this.perspectiveCamera.position.y = 10;
    this.perspectiveCamera.position.z = 10;
    // this.perspectiveCamera.lookAt(0,10,10)

    // camerahelper
    
  }

  // 创建正交相机
  createOrthographicCamera(){
    // 管理长宽比，这些参数不要动
    this.orthographicCamera = new OrthographicCamera(
      (-this.sizes.aspect * this.sizes.frustrum) / 2, 
      (this.sizes.aspect * this.sizes.frustrum) / 2, 
      this.sizes.frustrum / 2, 
      - this.sizes.frustrum / 2,
      -20,
      20
    );
    this.orthographicCamera.position.y = 5;
    this.orthographicCamera.position.z = 5;
    this.orthographicCamera.rotation.x = -Math.PI * 0.2;
    console.log('orthographicCamera created.',this.orthographicCamera);
    
    this.scene.add(this.orthographicCamera)
    
    // camerahelper, remember to update
    this.orthoHelper = new CameraHelper(this.orthographicCamera);
    // this.scene.add(this.orthoHelper);
  }

  // 创建视角控制器
  setOrbitControls(){
    this.OrbitControls = new OrbitControls(this.perspectiveCamera, this.canvas);
    this.OrbitControls.enableDamping = true; // 开启阻尼效果，也就是拖动后保留惯性
    this.OrbitControls.enableZoom = true; // 开启缩放
  }

  // 处理窗口大小变化，更新相机参数
  resize(){
    this.perspectiveCamera.aspect = this.sizes.aspect;
    this.perspectiveCamera.updateProjectionMatrix();

    this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum) / 2;
    this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum) / 2;
    this.orthographicCamera.top = this.sizes.frustrum / 2;
    this.orthographicCamera.bottom = - this.sizes.frustrum / 2;
    this.orthographicCamera.updateProjectionMatrix();
  }

  // 更新相机位置，在此使用视角控制器的更新方法
  update(){
    this.OrbitControls.update();
    
  }
  
}