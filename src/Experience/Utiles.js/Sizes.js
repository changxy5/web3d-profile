// 处理窗口大小变化，以及设备像素比

// 引入eventEmmiter来让全局动画共用一个计时器
import {EventEmitter} from 'events'

export default class Sizes extends EventEmitter{
  constructor(){
    // 初始化父类
    super()
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.aspect = this.width / this.height
    this.pixelRatio = Math.min(window.devicePixelRatio, 2)
    this.frustrum = 5

    window.addEventListener('resize', () => {
      this.width = window.innerWidth
      this.height = window.innerHeight
      this.aspect = this.width / this.height
      this.emit("resize");
    })
  }
}