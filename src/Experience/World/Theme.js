// 管理颜色主题
import Experience from '../Experience.js'
import {EventEmitter} from 'events'
import GSAP from 'gsap'

export default class Theme extends EventEmitter{
  constructor(assets){
    // 初始化父类
    super();
    this.experience = new Experience();
    this.environment = this.experience.world.environment;
    this.room = this.experience.world.room;

    this.on("switchMode",(darkMode)=>{
      // 暗色模式
      if(darkMode===true){
        this.environment.setDarkMode();
        this.room.setDarkMode();
      }else if(darkMode===false){
        // 浅色模式
        this.environment.setLightMode();
        this.room.setLightMode();
      }
    })
    
  }


}