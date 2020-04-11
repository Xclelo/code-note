const promise = new Promise(function(resolve, reject) {
  // ... some code
  testTime()
  if (true){
    resolve("chenggong");
  } else {
    reject(error);
  }
});

function testTime(){
	console.log("some code Succ！")
	//return true
}
promise.then(function(data){
	console.log(data)
})