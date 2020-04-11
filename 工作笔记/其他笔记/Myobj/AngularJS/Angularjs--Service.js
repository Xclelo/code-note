angular.module('app', [])
   // value constant factory service provider
    .value('realname', 'MIKE')
    .value('realname', 'kanhan')            //是可以改变的
    .constant('http', 'www.baidu.com')       //常量
    .constant('http', 'www.sohu.com')       //不可以改变
    .factory('Data', function () {
        return {
            msg: 'nihao',
            setMsg: function () {
                this.msg = "我不好";
            }
        }
    })
    .service('User', function () {
        this.firstname = "诸葛";
        this.lasttname = "孔明";
        this.getName = function () {
            return this.firstname + this.lasttname;
        }
    })
    /*
        .factory('Data', function () {
            return new dd()
        })
    function dd() {
    this.firstname = "诸葛";
    this.lasttname = "孔明";
    this.getName = function () {
        return this.firstname + this.lasttname;
    }
}


//等同于以下
        .service('User', function () {
        this.firstname = "诸葛";
        this.lasttname = "孔明";
        this.getName = function () {
            return this.firstname + this.lasttname;
        }
    })
    
    */
.controller('Myctrl', function ($scope, realname, http, Data, User) {
    $scope.msg = "Hlleo";
    $scope.realname = realname;
    $scope.http = http;
    $scope.data = Data;
    Data.setMsg();
    $scope.uname = User.getName();
})

.controller('NextCtrl', function ($scope) {

})

