// events事件驱动

/*const events=require('events');

evt=new events.EventEmitter();

function eventHandler(){

	console.log('111');
	console.log('222');
}

evt.on('eventName',eventHandler);
evt.emit('eventName');*/

//自定义show模块

function show(){
	this.name='user1';
	this.say=function(){
		console.log('my name is '+this.name);
	}
}

//obj=new show();
module.exports=show;


