/*
 * @Author: xcq
 * @Date: 2019-09-03 21:45:32
 * @LastEditors  : xcq
 * @LastEditTime : 2020-01-08 20:36:17
 * @FilePath: \学习Code\ES6\class.js
 * @Description: 文件头部注释 快捷键：window：ctrl+alt+i,mac：ctrl+cmd+i
 * @函数注释 快捷键：window：ctrl+alt+t,mac：ctrl+cmd+t
 */

class A {
  constructor() {
    this.x = 777;
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
    super.x = 3;
    console.log(super.x); // undefined
    console.log(this.x); // 3
  }
}

let a = new A(666);
console.log(a.x); //777
//   let b = new B();

/*---------------------------------------------------------*/

class User {
  constructor(name, pass) {
    this.name = name;
    this.pass = pass;
    console.log(`123456789`)
  }
  showName() {
    console.log(this.name)
  }
  showPass() {
    console.log(this.pass)
  }
}

class vipUser extends User {
  constructor(name, pass, leve) {
    super(name, pass);
    this.leve = leve;
  }
  showLeve() {
    console.log(this.leve)
  }
}
var user = new User('xcq', '123')
user.showName()

// var vipuser = new vipUser('xcq', '123', '6')
// vipuser.showLeve()


/*---------------------------------------------------------*/
