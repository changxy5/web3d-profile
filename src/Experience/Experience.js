import * as THREE from 'three' // 引用threejs
import Sizes from './Utiles.js/Sizes'
import Time from './Utiles.js/Time'
import Camera from './Camera';
import Renderer from './Renderer';
import World from './World/World';
import Resources from './Utiles.js/Resources';
import assets from './Utiles.js/assets';
import { LightProbeHelper } from 'three/addons/helpers/LightProbeHelper.js';

export default class Experience{
  static instance;
  constructor(canvas){
    // 节省内存的关键
    if(Experience.instance){
      return Experience.instance;
    }
    //创建初始的场景、相机、渲染器、时间、资源、世界，顺序不可随意调整
    Experience.instance = this;
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.sizes = new Sizes();
    this.time = new Time();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.resources = new Resources(assets);
    this.world = new World();
    this.addHelpers();

    console.log('---Experience inited---', this);

    // 当time的update事件触发时，触发renderder和camera的update事件；
    // 当size的resize事件触发时，触发renderder和camera的resize事件。
    this.time.on("update", () => {
      this.update()
    })

    this.sizes.on("resize",()=>{
      this.resize()
    })
    
  }

  addHelpers(){
    // 添加坐标轴辅助器
    // this.scene.add(new THREE.AxesHelper(5));
    // 添加网格辅助器
    this.scene.add(new THREE.GridHelper(20, 20));
  }

  // 触发所有resize事件
  resize(){
    this.camera.resize();
    this.renderer.resize();
    this.world.resize();
  }

  // 触发所有update事件
  update(){
    this.camera.update();
    this.renderer.update();
    this.world.update();
  }
  
}