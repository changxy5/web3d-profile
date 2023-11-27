import Experience from "./Experience.js"
import *  as THREE from "three"

export default class Camera{
  constructor(){
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;

    this.setRenderer()
  }

  setRenderer(){
    this .renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias:true, // 打开抗锯齿模式
    })
    this.renderer.physicallyCorrectLights = true // 打开物理光照模式
    this.renderer.outputEncoding = THREE.sRGBEncoding // 输出编码模式，使用sRGB纹理
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping // 色调映射模式
    this.renderer.toneMappingExposure = 1.5 // 色调映射曝光度，值越大，曝光度越高

    this.renderer.shadowMap.enabled = true // 打开阴影贴图
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap // 阴影贴图类型,PCFSoftShadowMap的阴影可以一定程度改善阴影锯齿,但锯齿依旧存在

    this.renderer.setSize(this.sizes.width, this.sizes.height)
  }

  // 处理窗口大小变化，更新相机参数
  resize(){
    this.renderer.setSize(this.sizes.width,this.sizes.height)
    this.renderer.setPixelRatio(this.sizes.pixelRatio)
  }
  
  // 更新渲染
  update(){
    // 主视图
    this.renderer.setViewport(0,0,this.sizes.width,this.sizes.height)
    this.renderer.render(this.scene, this.camera.orthographicCamera)
    // 辅助视图
    // this.renderer.setScissorTest(true)
    // this.renderer.setViewport(
    //   this.sizes.width - this.sizes.width / 3,
    //   this.sizes.height - this.sizes.height / 3,
    //   this.sizes.width / 3,
    //   this.sizes.height / 3
    // )
    // this.renderer.setScissor(
    //   this.sizes.width - this.sizes.width / 3,
    //   this.sizes.height - this.sizes.height / 3,
    //   this.sizes.width / 3,
    //   this.sizes.height / 3
    // )
    // this.renderer.render(this.scene,this.camera.perspectiveCamera)

    // this.renderer.setScissorTest(false)
  }
}