// 管理模型、材质等资源的加载

import Experience from '../Experience.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader.js'
import * as THREE from 'three'

// 引入eventEmmiter来让全局动画共用一个计时器
import {EventEmitter} from 'events'

export default class Resources extends EventEmitter{
  constructor(assets){
    // 初始化父类
    super();
    this.experience = new Experience();
    this.renderer = this.experience.renderer;
    // 引入建模材质
    this.assets = assets;
    
    // 加载建模材质（暂空）
    this.items = {};
    // 需要加载的资源的数量（用于显示进度条）
    this.queue = this.assets.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  // 加载loader
  setLoaders(){
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.dracoLoader = new DRACOLoader();
    this.loaders.dracoLoader.setDecoderPath("/draco/");
    this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
  }

  // 加载资源
  startLoading(){
    for(const asset of this.assets){
      if(asset.type==="glbModel"){
        // 加载glt建模
        this.loaders.gltfLoader.load(asset.path,(file)=>{
          // 建模加载完成的回调函数
          this.singleAssetLoaded(asset,file);
        })
         // 加载媒体材质
      }else if(asset.type==='videoTexture'){
        
        this.video = {};
        this.videoTexture = {};

        this.video[asset.name] = document.createElement('video');
        this.video[asset.name].src = asset.path;
        this.video[asset.name].muted = true;
        this.video[asset.name].loop = true;
        this.video[asset.name].autoplay = true;
        this.video[asset.name].playsInline = true;
        this.video[asset.name].play();

        this.videoTexture[asset.name] = new THREE.VideoTexture(this.video[asset.name]);
        this.videoTexture[asset.name].minFilter = THREE.LinearFilter;
        this.videoTexture[asset.name].magFilter = THREE.LinearFilter;
        this.videoTexture[asset.name].flipY = false;
        this.videoTexture[asset.name].generateMipmaps = false;
        this.videoTexture[asset.name].encoding = THREE.sRGBEncoding;
        this.singleAssetLoaded(asset,this.videoTexture[asset.name]);
      }
    }
  }

  // 资源加载完成，进度条前进
  singleAssetLoaded(asset,file){
    this.items[asset.name] = file;
    this.loaded++;
    if(this.loaded === this.queue){
      // 资源全部加载后，触发ready事件，开始加载world
      console.log('all assets loaded.',this.items);
      this.emit("ready");
    }
  }
}