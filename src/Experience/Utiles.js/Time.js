// 处理动画时间线

// 引入eventEmmiter来让全局动画共用一个计时器
import {EventEmitter} from 'events'

export default class Time extends EventEmitter{
  constructor(){
    // 初始化父类
    super()

    this.start = Date.now();
    this.current = this.start; // 初始目前时间即初始时间
    this.elapsed = 0; // 初始经过时间为0
    this.delta = 16; // 初始时间差为16ms，即60fps下的每次刷新时间
    this.update()
  }

  update(){
    const currentTime = Date.now()
    this.delta = currentTime - this.current; // 时间差为当前时间减去目前时间
    this.current = currentTime; // 更新目前时间
    this.elapsed = this.current - this.start; // 更新经过时间
    // console.log(this.delta);

    // 将该事件命名为update，在全局触发
    this.emit("update")
    window.requestAnimationFrame(()=>{this.update()})
  }
}