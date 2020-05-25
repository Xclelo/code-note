/**
 * npm istall -g typescript
 * tsc -v
 * 编译文件：tsc .\笔记.ts
 * 
 * 设置vscode自动编译
 * 01.  tsc --init,创建tsconfig.json文件
 * 02.  修改tsconfig.json文件,设置js文件夹：'outDor':'./js/'
 * 03.  vscode监视任务:终端->运行任务
 * 
 * 
 * 
 */
let name1: String = 'clelo';

//声明数组方式一
let arr1: string[] = ['a', 'b', 'c']
//声明数组方式二
let arr2: Array<number> = [1, 2, 3]

/*元组 有类型声明的数组*/
let tup1:[string,undefined,number,boolean] = ['c',undefined,12,true]


/*枚举*/
enum Gender{
    Boy = 0,
    Girl = 1,
    Unknown = 2
}

console.log(Gender.Boy)//0

//上面的简写
enum Gender2{
    Boy,
    Girl,
    Unknown
}

//使用
let userSex:Gender = Gender.Boy;//0


/**any类型：代表任意类型，一般在获取dom时使用
 * 接受不能确定会返回什么类型的值
 */
let textName:any = document.getElementById('idName')


/**void:代表没有类型 */
function say():string{
    return 'hi'
}
function say1():void{
    console.log('hi')
}

/**never:代表不存在的值的类型 */
function test():never{
    while(true){}
}

function test2():never{
    throw new Error('err');
}

//never类型时ts中的底部类型，所有类型都是never类型的父类
//所以never类型值可以赋给任意类型的变量
let x:never = test();
let y:never = test();

/**联合类型 */
let uni1:string|number = 123;
let uni2:string|number = '123';



