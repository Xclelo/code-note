//策略模式的定义：定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换
//目的：将算法的使用金与算法的实现分离开来


//以计算奖金的案例来举例
var strategies = {
    'S': function (salary) {
        return salary * 4;
    },
    'A': function (salary) {
        return salary * 3;
    },
    'B': function (salary) { 
        return salary * 2;
    },
}

var calculateBonus = function (level, salary) {
    return strategies[level](salary);
}

console.log(calculateBonus('S', 20000))




//让小球动起来

//缓动算法
