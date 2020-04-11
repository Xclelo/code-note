angular.module('app',[])
.controller('AddressCtrl',function($scope) {
	$scope.list=[
	{id:1,address:'小学'},
	{id:2,address:'初中'},
	{id:3,address:'高中'},
	{id:4,address:'大学'},
	];
})