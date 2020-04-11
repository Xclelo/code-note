const fs=require('fs');
file='test1.txt';
str='1111';
fs.writeFile(file,str,function(err){
	if(err){
		return console.error(err);
	}

});

fs.unlink(file,function(err){
	if(err){
		return console.error(err);
	}
});
console.log('file write end!');



