Utils = {
	/**
	 * 获取项目根目录
	 */
	getRoot : function() {
		return "http://onepay.zjyy.com.cn:8082/zjhospital-app";
		//return "http://localhost:8080/zjhospital-app";
		
	},
	/**
	 * 接收URL值
	 */
	 getRequest:function() {
	  var url = decodeURI(location.search); //获取url中"?"符后的字串
	   var theRequest = new Object();
	   if (url.indexOf("?") != -1) {
	      var str = url.substr(1);
	      strs = str.split("&");
	      for(var i = 0; i < strs.length; i ++) {
	         theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
	      }
	   }
	   return theRequest;
	},
	/**
	 * 转换long值为日期字符串
	 * 
	 * @param l
	 *            long值
	 * @param isFull
	 *            是否为完整的日期数据, 为true时, 格式如"2000-03-05 01:05:04" 为false时, 格式如
	 *            "2000-03-05"
	 * @return 符合要求的日期字符串
	 */
	formatDateByLong : function(longDate, pattern) {
		if(!pattern){
			pattern = "yyyy-MM-dd HH:mm:ss";
		}
		var date = new Date(longDate);
		if (date == undefined) {
			date = new Date();
		}
		return date.format(pattern);
	},
	/**
	 * 把Date类型转为yyyy-MM-dd hh:mm:ss格式的字符串
	 * 
	 *@param 1
	 *            fmt,格式：yyyy-MM-dd hh:mm:ss
	 * @param 2
	 *            Date类型
	 * 
	 * @return 日期字符串
	 */
	formatDateStr : function(fmt,date) {  
	  var o = {   
	    "M+" : date.getMonth()+1,                 //月份   
	    "d+" : date.getDate(),                    //日   
	    "h+" : date.getHours(),                   //小时   
	    "m+" : date.getMinutes(),                 //分   
	    "s+" : date.getSeconds(),                 //秒   
	    "q+" : Math.floor((date.getMonth()+3)/3), //季度   
	    "S"  : date.getMilliseconds()             //毫秒   
	  };   
	  if(/(y+)/.test(fmt))   
	    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
	  for(var k in o)   
	    if(new RegExp("("+ k +")").test(fmt))   
	  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
	  return fmt;   
	},
	/**
	 * 把Date类型转为yyyy-MM-dd格式的字符串
	 * 
	 * @param l
	 *            Date类型
	 * 
	 * @return 日期字符串
	 */
	formatDate : function (date){
		// 获取当前月份
		var nowMonth = date.getMonth() + 1;
		// 获取当前是号数
		var strDate = date.getDate();
		// 添加分隔符“-”
		var seperator = "-";
		// 对月份进行处理，1-9月在前面添加一个“0”
		if (nowMonth >= 1 && nowMonth <= 9) {
		   nowMonth = "0" + nowMonth;
		}
		// 对月份进行处理，1-9号在前面添加一个“0”
		if (strDate >= 0 && strDate <= 9) {
		   strDate = "0" + strDate;
		}
		// 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
		return date.getFullYear() + seperator + nowMonth + seperator + strDate;
	},
	/**
	 * 获取当前日期后某天的日期
	 * 
	 * @param l
	 *            addDayCount值，后多少天的日期。
	 * 
	 * @return 日期字符串(yyyy-MM-dd)
	 */
	getDateStr : function(addDayCount) {   
	   var dd = new Date();  
	   dd.setDate(dd.getDate()+addDayCount);//获取AddDayCount天后的日期  
	   var y = dd.getFullYear();   
	   var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0  
	   var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0  
	   return y+"-"+m+"-"+d;   
	},
	/**
	 * 将时间戳转换成日期格式
	 * 
	 * @param l
	 *            timestamp，时时间戳。
	 * 
	 * @return 日期字符串(yyyy-MM-dd hh:mm:ss)
	 */
	timestampToTime : function(timestamp) {
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        Y = date.getFullYear() + '-';
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        D = date.getDate() + ' ';
        h = date.getHours() + ':';
        m = date.getMinutes() + ':';
        s = date.getSeconds();
        return Y+M+D+h+m+s;
   },
  	/**
	 * 根据出生日期算出年龄
	 * 
	 * @param 
	 *            strBirthday，yyyy-MM-dd 
	 * 
	 * @return 返回周岁年龄
	 */
	jsGetAge : function (strBirthday){       
	    var returnAge;
	    var strBirthdayArr=strBirthday.split("-");
	    var birthYear = strBirthdayArr[0];
	    var birthMonth = strBirthdayArr[1];
	    var birthDay = strBirthdayArr[2];
	    
	    d = new Date();
	    var nowYear = d.getFullYear();
	    var nowMonth = d.getMonth() + 1;
	    var nowDay = d.getDate();
	    
	    if(nowYear == birthYear){
	        returnAge = 0;//同年 则为0岁
	    }
	    else{
	        var ageDiff = nowYear - birthYear ; //年之差
	        if(ageDiff > 0){
	            if(nowMonth == birthMonth) {
	                var dayDiff = nowDay - birthDay;//日之差
	                if(dayDiff < 0)
	                {
	                    returnAge = ageDiff - 1;
	                }
	                else
	                {
	                    returnAge = ageDiff ;
	                }
	            }
	            else
	            {
	                var monthDiff = nowMonth - birthMonth;//月之差
	                if(monthDiff < 0)
	                {
	                    returnAge = ageDiff - 1;
	                }
	                else
	                {
	                    returnAge = ageDiff ;
	                }
	            }
	        }
	        else
	        {
	            returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
	        }
	    }
	    
	    return returnAge;//返回周岁年龄
	    
	},
	/**
	 * 根据日期字符串获取星期几
	 * @param dateString 日期字符串（如：2016-12-29），为空时为用户当前日期
	 * @returns String
	 */
	getWeek : function (dateString){
	    var date;
	    if(dateString==null || dateString==undefined || dateString==""){
	        date = new Date();
	    }else{
	        var dateArray = dateString.split("-");
	        date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
	    }
	    var weeks = new Array("日", "一", "二", "三", "四", "五", "六");
	    return "星期" + weeks[date.getDay()];
	},
	
	/**
	 * 身份证号合法性验证 
	 * 支持15位和18位身份证号
	 * 支持地址编码、出生日期、校验位验证
	 */
	IdentityCodeValid: function(code) {
		var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
		var tip = "";
		var pass = true;
		var reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)/;
//		var reg = /(^([0-9]{17}[0-9Xx])|([0-9]{15})$)/;
//		var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
//		if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
		if (!code || !reg.test(code)) {
				tip = "身份证号格式错误";
			pass = false;
		}else if (!city[code.substr(0, 2)]) {
			tip = "地址编码错误";
			pass = false;
		} else {
			// 18位身份证需要验证最后一位校验位
			if (code.length == 18) {
				code = code.split('');
				// ∑(ai×Wi)(mod 11)
				// 加权因子
				var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
				// 校验位
				var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
				var sum = 0;
				var ai = 0;
				var wi = 0;
				for (var i = 0; i < 17; i++) {
					ai = code[i];
					wi = factor[i];
					sum += ai * wi;
				}
				var last = parity[sum % 11];
				if (parity[sum % 11] != code[17]) {
					tip = "校验位错误";
					pass = false;
				}
			}
		}
		return pass;
	},
	dateJeDate: function (itemId, pattern){
		if(!pattern){
			pattern = "YYYY-MM-DD hh:mm:ss";
		}
		$.jeDate(itemId,{
			format: pattern,
			isinitVal:false,
			isTime:true
        })
	},
	
	validCellNumber: function(contactNum){
		var pass = true;
		if(!contactNum || (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(contactNum)) && !(/^0\d{2,3}-?\d{7,8}$/.test(contactNum)))){ 
	        pass = false;
	    }
		return pass;
	},
	
	validTirm: function(code){
		if(!code)
			return false;
		var pass = true;
		if(!code.replace(/(^\s*)|(\s*$)/g, "")){
			pass = false;
		}
		return pass;
	},
	
	isNotEmpty: function(element){
		for(var i = 0 ; i < element.length; i++){
			if(!$(element[i]).val()){
				return false;
			}
		}
		return true;
	},
	
	installNewVersion: function(){
		var plus = plus;
		if(!plus){
			plus = top.plus;
		}
		var wait = plus.nativeUI.showWaiting("下载更新文件...");
		var dtask = plus.downloader.createDownload( Utils.getRoot() + "/" + localStorage.getItem('update_path'), {method:"GET"} );
		var downloadedSize,totalSize,showString;
	    dtask.addEventListener("statechanged", function(task,status){
	    	switch(task.state) {
	    		case 3:	// 已接收到数据
	    			downloadedSize = task.downloadedSize/1024/1024;
	    			totalSize = task.totalSize/1024/1024;
	    			showString = downloadedSize.toFixed(2) + "/" + totalSize.toFixed(2) + "M"
	    			wait.setTitle('下载更新文件...\n' + showString);
	    			break;
	    		case 4:	// 下载完成
	    			wait.close();
	    			plus.nativeUI.showWaiting("整合资源文件...");
				    plus.runtime.install(task.filename, {force: true}, function(){
				        plus.nativeUI.closeWaiting();
				        plus.nativeUI.alert("应用资源更新完成！",function(){
				        	//更新之后重新登录
				        	localStorage.clear();
				            plus.runtime.restart();
				        });
				    },function(e){
				        plus.nativeUI.closeWaiting();
				        plus.nativeUI.alert("安装更新文件失败！");
				        //alert("安装更新文件失败");
				    });
	    			break;
	    	}
	    } );
	    dtask.start();
	},
	
	
	/*1.用浏览器内部转换器实现html转码*/
    htmlEncode:function (html){
        var s = "";
        if(html.length == 0) return "";
        s = html.replace(/&/g,"&amp;");
        s = s.replace(/</g,"&lt;");
        s = s.replace(/>/g,"&gt;");
        s = s.replace(/ /g,"&nbsp;");
        s = s.replace(/\'/g,"&apos;");
        s = s.replace(/\"/g,"&quot;");
        return s; 
    },
    /*2.用浏览器内部转换器实现html解码*/
    htmlDecode:function (text){
        var s = "";
        if(text.length == 0) return "";
        s = text.replace(/&amp;/g,"&");
        s = s.replace(/&lt;/g,"<");
        s = s.replace(/&gt;/g,">");
        s = s.replace(/&nbsp;/g," ");
        s = s.replace(/&apos;/g,"\'");
        s = s.replace(/&quot;/g,"\"");
        return s;
    },
    showConfirm: function (btn,msg,titleMsg){
    	var plus = plus;
		if(!plus){
			plus = top.plus;
		}
		//outSet( "弹出系统确认对话框：" );
		var bts=[btn];
		plus.nativeUI.confirm(msg,function(e){
			var i=e.index;
			//outLine( "按\""+((i>=0)?bts[e.index]:"返回")+"\"关闭！" );
		},titleMsg,bts);
	}
	
	
}

/**
 * 扩展Date format方法
 */
Date.prototype.format = function (format) {  
    var o = {  
        "M+": this.getMonth() + 1,  
        "d+": this.getDate(),  
        "H+": this.getHours(),  
        "m+": this.getMinutes(),  
        "s+": this.getSeconds(),  
        "q+": Math.floor((this.getMonth() + 3) / 3),  
        "S": this.getMilliseconds()  
    }  
    if (/(y+)/.test(format)) {  
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));  
    }  
    for (var k in o) {  
        if (new RegExp("(" + k + ")").test(format)) {  
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));  
        }  
    }  
    return format;  
}

/*
根据〖中华人民共和国国家标准 GB 11643-1999〗中有关公民身份号码的规定，公民身份号码是特征组合码，由十七位数字本体码和一位数字校验码组成。排列顺序从左至右依次为：六位数字地址码，八位数字出生日期码，三位数字顺序码和一位数字校验码。
    地址码表示编码对象常住户口所在县(市、旗、区)的行政区划代码。
    出生日期码表示编码对象出生的年、月、日，其中年份用四位数字表示，年、月、日之间不用分隔符。
    顺序码表示同一地址码所标识的区域范围内，对同年、月、日出生的人员编定的顺序号。顺序码的奇数分给男性，偶数分给女性。
    校验码是根据前面十七位数字码，按照ISO 7064:1983.MOD 11-2校验码计算出来的检验码。

出生日期计算方法。
    15位的身份证编码首先把出生年扩展为4位，简单的就是增加一个19或18,这样就包含了所有1800-1999年出生的人;
    2000年后出生的肯定都是18位的了没有这个烦恼，至于1800年前出生的,那啥那时应该还没身份证号这个东东，⊙﹏⊙b汗...
下面是正则表达式:
 出生日期1800-2099  (18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])
 身份证正则表达式 /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i            
 15位校验规则 6位地址编码+6位出生日期+3位顺序号
 18位校验规则 6位地址编码+8位出生日期+3位顺序号+1位校验位
 
 校验位规则     公式:∑(ai×Wi)(mod 11)……………………………………(1)
                公式(1)中： 
                i----表示号码字符从由至左包括校验码在内的位置序号； 
                ai----表示第i位置上的号码字符值； 
                Wi----示第i位置上的加权因子，其数值依据公式Wi=2^(n-1）(mod 11)计算得出。
                i 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
                Wi 7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4 2 1

 */
