if(window.plus){
	plusReady();
}else{
	document.addEventListener('plusready',plusReady,false);
}

function plusReady(){
	
	// Android处理返回键
	plus.key.addEventListener('backbutton',function(){
		history.go(-1);
	},false);
}