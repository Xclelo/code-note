var app = angular.module('app',[])
/*app.directive('hello',function () {
	return {
		restrict:'E',
		replace:true,//替换自定义的标签
		template:'<div>HELLO angular</div>',
	}
})
*/
/*app.directive('hello',function () {
	return {
		restrict:'A',//A 属性 E template C class 默认A
		link:function(){
			alert("i am here!")
		}
	}
})

app.directive('aaa',function () {
	return {
		restrict:'C',//A 属性 E template C class
		link:function(){
			alert("i am CLASS!")
		}
	}
})*/

/*app.controller('AppCtrl',function($scope){
	$scope.loadMoreData=function(){
		alert("zhengzaijiazaishuju...")
	}

})

app.directive('enter',function(){
	return function(scope,element,attrs){
		element.bind('mouseenter',function(){
			// scope.loadMoreData();
			scope.$apply(attrs.enter);
		})

	}
})*/

// directive的相互调用

app.directive('food',function(){
	return{
		restrict:'E',
		scope:{},
		controller:function($scope){
			$scope.foods=[];
			this.addApple=function(){
				$scope.foods.push('apple');
			}
			this.addOrange=function(){
				$scope.foods.push('Orange');
			}
			this.addbann=function(){
				$scope.foods.push('bann');
			}
		},
		link:function(scope,element,attrs){
			element.bind('mouseenter',function(){
				console.log(scope.foods);
			})
		}

	}
})

app.directive('apple',function(){
	return{
		require:'food',
		link:function(scope,element,attrs,foodCtrl){
		foodCtrl.addApple();
		}
	}
})

app.directive('Orange',function(){
	return{
		require:'food',
		link:function(scope,element,attrs,foodCtrl){
		foodCtrl.addOrange();
		}
	}
})

app.directive('bann',function(){
	return{
		require:'food',
		link:function(scope,element,attrs,foodCtrl){
		foodCtrl.addbann();
		}
	}
})