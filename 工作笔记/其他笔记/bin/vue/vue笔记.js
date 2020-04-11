/*
<div id="watch-example">
    <p>
    Ask a yes/no question:
    <input v-model="question">
     </p>
     <p>{{ answer }}</p>
</div>
 
<!-- Since there is already a rich ecosystem of ajax libraries    -->
<!-- and collections of general-purpose utility methods, Vue core -->
<!-- is able to remain small by not reinventing them. This also   -->
<!-- gives you the freedom to just use what you're familiar with. -->
<script src="https://unpkg.com/axios@0.12.0/dist/axios.min.js"></script>
<script src="https://unpkg.com/lodash@4.13.1/lodash.min.js"></script>
        
 */
 




var watchExampleVM = new Vue({
    el: '#watch-example',
    data: {
        question: '',
        answer: 'I cannot give you an answer until you ask a question!'
    },
    watch: {
        // 如果 question 发生改变，这个函数就会运行
        question: function (newQuestion) {
            this.answer = 'Waiting for you to stop typing...'
            this.getAnswer()
        }
    },
    methods: {
        // _.debounce 是一个通过 lodash 限制操作频率的函数。
        // 在这个例子中，我们希望限制访问yesno.wtf/api的频率
        // ajax请求直到用户输入完毕才会发出
        // 学习更多关于 _.debounce function (and its cousin
        // _.throttle), 参考: https://lodash.com/docs#debounce
        getAnswer: _.debounce(
            function () {
                var vm = this
                if (this.question.indexOf('?') === -1) {
                    vm.answer = 'Questions usually contain a question mark. ;-)'
                    return
                }
                vm.answer = 'Thinking...'
                axios.get('https://yesno.wtf/api')
                    .then(function (response) {
                        vm.answer = _.capitalize(response.data.answer)
                    })
                    .catch(function (error) {
                        vm.answer = 'Error! Could not reach the API. ' + error
                    })
            },
            // 这是我们为用户停止输入等待的毫秒数
            500)
    }
})


var vm = new Vue({
    el: '#id',
    data: {
        fristName:'clelo',
        lastname:'',
    },
    methods: {

    },
    filters: {//定义私有过滤器  过滤器名称和处理函数
        'filterName': function (dateStr) {       //过滤器函数总接受表达式的值作为第一个参数。
            var dt = new Date(dateStr);
            var y = dt.getFullYear();
            var m = dt.getMonth();
            var d = dt.getDate();
            return y + '-' + m + '-' + d;
            // return ~${y}-${m}-${d}~
        }

    },
    directives: {//自定义私有指令
        'fontweight': {
            bind: function (el, binding) {
                el.style.fontWeight = binding.value;
            }
        },

        'fontsize': function (el,binding) {//这个function等同于把代码写道bind和update里面
            el.style.fontsize = parseInt(binding.value) + 'px';
        }

    },
    components: {//定义私有组件
        login: {
            template:'<h1>私有组件</h1>'
        }

    },
    router: routerObj,//路由
    watch: {
        //使用这个属性可以监视data中指定数据的变化 ，然后触发watch中的function处理函数

        'fristName': function (newVal,oldVal) {//有两个参数使用
            console.log("监视到了data数据变化");
        }
    },
    computed: {
        //可以定义一些属性，叫做计算属性    d
        //注意：1.引用的时候不要加（）  直接当作普通属性去使用  
        //2.只要计算属性这个function内部的所用到的任何data中数据发生了变化（fristName或者lastname），就会重新计算这个计算属性（fillname）
        //3.计算属性的计算结果会被缓存起来，方便下次使用 ，如果计算属性中所依赖的任何数据都没有发生过变化就不会多计算属性重新赋值
        'fillname': function () {
            return this.fristName + this.lastname;
        }
    },
    //用render相比于用components，components只是替换组件  而render在一个app容器中只能存在一个组件
    render: function (createElements) {
        return createElements(login)//到前面定义 var login={template:'<h1>这是登录组件</h1>'}
    }



})















//全局过滤器
/*        {{time|filterName}}         */

Vue.filter('filterName', function (dateStr) {       //过滤器函数总接受表达式的值作为第一个参数。
    var dt = new Date(dateStr);
    var y = dt.getFullYear();
    var m = dt.getMonth();
    var d = dt.getDate();
    return y + '-' + m + '-' + d;
   // return ~${y}-${m}-${d}~


})


//自定义全局按键修饰符
Vue.config.keyCode.f2 = 113;

// 注册一个全局自定义指令 v-focus
/*    <input type="text" id="inputid" v-focus v-color="'red'"></input>      */
Vue.directive('focus', {
    // 当绑定元素插入到 DOM 中。
    inserted: function (el) {
        // 聚焦元素
        el.focus()
    }
})

Vue.directive('color', {
    bind: function (el, binding) {
        el.style.color = binding.value;

    }
})




//生命周期函数
var vm = new Vue({
    el: '#app',
    data: {
        msg:'ok'
    },
    methods: {
        show() {
            console.log('执行了show方法');
        }
    },
    beforeCreate() {//这是我们遇到的第一个生命周期函数，表示实例完全被创建出来之前，会执行它
        //console.log(this.msg);
        //this.show();
        //注意：在beforeCreate生命周期函数执行之前，data和methods中的函数都还没初始化
    },
    created() {//第二个生命周期函数，data和methods已经被初始化好了
        console.log(this.msg);
        this.show();
    },
    beforeMount() {//第三个周期函数，模板已经在内存中编译完成，但是尚未把模板渲染到页面上

    },
    mounted() {//第四个周期函数，内存中的模板已经真实的挂载到页面中

    },



    //接下来是运行中的事件
    beforeUpdate() {
        console.log("界面上元素内容：" + document.getElementById('h3').innerHTML);//OK
        console.log("data中msg的数据是：" + this.msg);//NO 更新后是NO
        //
    },
    updated() {
        console.log("界面上元素内容：" + document.getElementById('h3').innerHTML);///NO 更新后是NO
        console.log("data中msg的数据是：" + this.msg);//NO 更新后是NO

    },

});



//vue-resource.js         发起get,post,jsonp请求

var vm = new Vue({
    el: '#app',
    data: {},
    methods: {
        getInfo() {//发起get请求，通过.then来设置成功的回调函数
            this.$http.get('http://www.baidu.com').then(function (result) {
                //通过result.body拿到服务器返回的成功数据
                console.log(result.body)
            })
        },
        postInfo() {//发起post请求
            //第二参数提交给服务器的数据
            //通过post方法的第三个参数，设置提交的内容类型 为 普通表单数据格式 
            this.$http.post('http://www.baidu.com', {}, {emulateJSON:true}).then(result=> {
                console.log(result.body)
            })
        },
        jsonpInfo() {//JSONP请求
            this.$http.jsonp('http://www.baidu.com').then(function (result) {
                //通过result.body拿到服务器返回的成功数据
                console.log(result.body)
            })
        },

    },


});










/***  使用ref获取DOM  
可以获取组件的DOM  还有组件中的方法和数据

**/

/* 
<h3 id="myh3" ref="myh3">通过ref获取的DOM</h3>
*/
var myref = $refs.myh3.innerText;
console.log(myref);




/************** 路由   vue-router***************/
/*
<div id="app">
    <a href="#/login?id=10&name=denglu">登录</a>
    <a href="#/register/12">注册</a>
    或者router-link   (默认渲染一个a标签  tag可以改变标签)
    <router-link to="/register" tag="span">注册</router-link>
    <router-view></router-view>             <!--  vue-router提供的标签  -->
</div>
实现高亮的两种方式    一：router-link-active（写在CSS中  自写）   router自带的   二：linkActiveClass:'myactive'
*/


var login = {
    template: '<h1>登录组件</h1>',
    created() {
        console.log(this.$route.query.id);
    }
}
var register = {
    template: '<h1>注册组件</h1>',
    created() {
        console.log(this.$route.params.id);
    }
}


var routerObj = new VueRouter({
    //router 【路由匹配规则】 path表示监听哪个路由连接地址  component 要展示的组件
    routes: [
        { path: '/', redirect: '/login' },//如果是跟路径  则展示为login路径
        { path: '/login', component: login },
        //children  路由的嵌套  子路由的path前面不要带/
        { path: '/register/:id', component: register, children: [{ path: 'login', component: login }, { path: 'register', component: register }] },
    ],
    linkActiveClass: 'myactive'//第二种高亮方法

})

var vmrouter = new Vue({
    el: '#app',
    data: {},
    methods: {},
    router: routerObj
})

