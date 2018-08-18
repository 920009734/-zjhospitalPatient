$(function(){
	
	//储存数据
	var rdata = new Object();//日期数据
	
	//获取当前时间
	var nowdateTime = Utils.formatDateByLong(new Date(), "yyyy-MM-dd");
	var Request = new Object();
	Request = Utils.getRequest();
	$("#deptCode").val(Request["deptCode"]);
	$("#deptName").text(Request["deptName"]);
	
	
	//获取当前时间
	var nowdate = new Date();
	var nt = Utils.formatDateByLong(nowdate, "yyyy-MM-dd");
//	$("#nowTime").html(nt);
	//开始日期，结束日期，一共是14天
	var dateTime = getSevenDate(nowdate);
	//科室ID
	var deptCode = $("#deptCode").val();
	//动态生成当前日期
	createTime(dateTime, deptCode);
	
	$(".box_list").on("click",".date_list",function(){
		cleanDiv();
		var a = $(this).attr("class");
		if(a=="date_list"){
			$(this).addClass("active").siblings(".date_list.active").removeClass("active");
			exditTopDate();
		}else{
			exditTopDate();
		}
	});
	
	$(".show_tab_time").on("click",".nowTime",function(){
		var a = $(this).hasClass("openTime");
		if(!a){
			$(".nav_date").removeClass("active");
			$(this).addClass("openTime");
			$(this).children("i").removeClass("icon-xiajiantou");
			$(this).children("i").addClass("icon-youjiantou");
		}else{
			$(".nav_date").addClass("active");
			$(this).removeClass("openTime");
			$(this).children("i").addClass("icon-xiajiantou");
			$(this).children("i").removeClass("icon-youjiantou");
		}
		
	});
	//按医生选择
	$(".show_tab_time").on("click","#ysgh",function(){
		var deptCode = $("#deptCode").val();
		var deptName = $("#deptName").text();
		window.location.href="../yuyueguahao/doctorGuahao.html?deptCode="+deptCode+"&deptName="+deptName;
		
	});
	
	//创建日期
	function createTime(dateTime, deptCode) {
		var params={};
		params.deptCode = deptCode;
		params.dateTime = dateTime;
		$.post(Utils.getRoot()+"/registerApp/seldatetime", params, function(res){
			if (res.success) {
				rdata = JSON.stringify(res.data);
				getDay(res.data);
				var height_ = $(".date_list>span").width();
				$(".date_list>span").height(height_);
			}
		});
	}
	
	//返回七天的字符串
	function getSevenDate(nt) {
		var s = Utils.formatDateByLong(nt, "yyyy-MM-dd") + ",";
		for (var i = 1; i < 14; i++) {
			 nt.setDate(nt.getDate() + 1);
			 s += nt.getFullYear()+"-"+(doHandleMonth(nt.getMonth()+1))+"-"+(doHandleMonth(nt.getDate())) + ",";
		}
		//去除最后一位
		s = s.substring(0, s.length-1);
		return s;
	}
	
	function getDay(data){ 
		for (var i = 0; i < data.length; i++) {
			var today = new Date();
        	var targetday_milliseconds = today.getTime() + 1000*60*60*24*i;
        	today.setTime(targetday_milliseconds); //注意，这行是关键代码
	        var tYear = today.getFullYear();    
	        var tMonth = today.getMonth();    
	        var tDate = today.getDate();
	        var tday = today.getDay();
	        tMonth = doHandleMonth(tMonth + 1);
	        tDate = doHandleMonth(tDate);
	        if(tday == 0){
	        	tday = "日";
	        }else if(tday == 1){
	        	tday = "一";
	        }else if(tday == 2){
	        	tday = "二";
	        }else if(tday == 3){ 
	        	tday = "三";
	        }else if(tday == 4){
	        	tday = "四";
	        }else if(tday == 5){
	        	tday = "五";
	        }else if(tday == 6){
	        	tday = "六";
	        }
	        var showday = new Date();
	        if(tDate == doHandleMonth(showday.getDate())){
	        	if (tDate == data[i].dataday) {
	        		if (data[i].status == 1) {//有号
	        			$(".box_list").append('<div class="date_list active" id="'+tDate+'">'
							+'<span class="riqi_date"><span class="dep_name">'+tDate+'</span>'
							+'<span class="dep_addr">有号</span></span>'
							+'</div>');
	        		} else {//无号 2
	        			$(".box_list").append('<div class="nodate_list noactive" id="'+tDate+'" >'
							+'<span class="riqi_date"><span class="dep_name">'+tDate+'</span>'
							+'<span class="dep_addr">(无)</span></span>'
							+'</div>');
	        		}
	        	}
	        }else{
	        	var day = $(".box_list").children(".active").attr("id");
	        	if (tDate == data[i].dataday) {
	        		if (data[i].status == 1) {
		        		$(".box_list").append('<div class="date_list" id="'+tDate+'">'
						+'<span class="riqi_date"><span class="dep_name">'+tDate+'</span>'
						+'<sapn class="dep_addr">有号</sapn></span>'
						+'</div>');
						if(day==undefined){
							$(".date_list").attr("class","date_list active");
						}
	        		}else {
	        			$(".box_list").append('<div class="nodate_list noactive" id="'+tDate+'">'
							+'<span class="riqi_date"><span class="dep_name">'+tDate+'</span>'
							+'<span class="dep_addr">无</span></span>'
							+'</div>');
	        		}
	        	}
	        	
	        }
		}
		exditTopDate();
	}  
	function doHandleMonth(month){    
      	var m = month;    
	    if(month.toString().length == 1){    
	        m = "0" + month;    
	    }    
        return m;    
	}
	
	function exditTopDate() {
		var day = $(".box_list").children(".active").attr("id");
		var topTime = "";
		var nowdate = new Date();
		var s = getSevenDate(nowdate);
		
		var ss = new Array();
		ss = s.split(",");
		for (var i = 0; i < ss.length; i++) {
			var sss = ss[i].substring(ss[i].length-2, ss[i].length);
			if (day == sss) {
				topTime = ss[i];
				break;
			}
		}
		$("#nowTime").html("");
		$("#nowTime").html(topTime);
		doctorInfoList(topTime);
	}
	
	//清空append追加的数据
	function cleanDiv(){
		$("#swinfoList").html("");
		$("#xwinfoList").html("");
		$("#wsinfoList").html("");
		$("#swcount").html("");
		$("#xwcount").html("");
		$("#wscount").html("");
		
	}
		
	function doctorInfoList(nowdate){
		cleanDiv();
		var params={};
		params.deptCode=Request["deptCode"];
		params.dateTime = nowdate;
		//刚添加，尚未用到doctorCode字段，默认为null
		params.doctorCode = "";
		$.post(Utils.getRoot()+"/registerApp/selclinicSchedule",params,function(data){
			if (data.success) {
				var dortorInfo = data.data;
//				console.log("dortorInfo:"+JSON.stringify(dortorInfo));
				var s=0,x=0,w=0;
				for (var i = 0; i < dortorInfo.length; i++) {
//					console.log("dortorInfo:"+JSON.stringify(dortorInfo[i]));
					//按照日期
					if (dortorInfo[i].timeFlag==1) {//上午
						s++;
						$("#swcount").text(s+"人");
						var doctorPhoto = dortorInfo[i].doctorPhoto;
						if(doctorPhoto==null || doctorPhoto== "" 
							|| doctorPhoto=="http://www.zjyy.com.cn/expertPhoto/"){
							doctorPhoto = "../../img/self/self.png";
						}
						if (dortorInfo[i].workStatus==1) {//出诊状态
							if(dortorInfo[i].leftNum<=0){//余号为0，约满状态
								$("#swinfoList").append(
									"<div class='nocon_doc'>"+
										 "<div class='doc_img'><img src='"+doctorPhoto+"'></div>"+
										 "<div class='doc_detail'>"+
											"<span class='doc_name'><span class='doctorName'>"+dortorInfo[i].doctorName+"</span><span class='main_doc'>"+dortorInfo[i].doctorTitle+"</span></span>"+
											"<span class='doc_time'>"+dortorInfo[i].scheduleDate+"<span class='dep_type'>"+dortorInfo[i].clinicType+"</span></span>"+
										"</div>"+
										"<div class='doc_yynum'>"+
											"<span class='noyhao_num'>约满</span>"+
										"</div>"+
									"</div>"
								);
							}else{//余号不为0，可预约
								$("#swinfoList").append(
									"<div class='con_doc'>"+
										 "<div class='doc_img'><img src='"+doctorPhoto+"'></div>"+
										 "<div class='doc_detail'>"+
											"<input type='hidden' value='"+dortorInfo[i].doctorCode+"' name='doctorCode'>"+
											"<input type='hidden' value='"+dortorInfo[i].timeFlag+"' name='timeFlag'>"+
											"<input type='hidden' value='"+dortorInfo[i].clinicType+"' name='clinicType'>"+
											"<span class='doc_name'><span class='doctorName'>"+dortorInfo[i].doctorName+"</span><span class='main_doc'>"+dortorInfo[i].doctorTitle+"</span></span>"+
											"<span class='doc_time'>"+dortorInfo[i].scheduleDate+"<span class='dep_type'>"+dortorInfo[i].clinicType+"</span></span>"+
										"</div>"+
										"<div class='doc_yynum'>"+
											"<span class='yhao'>余号</span>"+
											"<span class='yhao_num'>"+dortorInfo[i].leftNum+"</span>"+
										"</div>"+
									"</div>"
								);
							}
						}else{//停诊状态
							if (dortorInfo[i].doctorName!=null && dortorInfo[i].doctorName!="" && dortorInfo[i].doctorName!=undefined) {
								$("#swinfoList").append(
									"<div class='nocon_doc'>"+
										 "<div class='doc_img'><img src='"+doctorPhoto+"'></div>"+
										 "<div class='doc_detail'>"+
											"<span class='doc_name'><span class='doctorName'>"+dortorInfo[i].doctorName+"</span><span class='main_doc'>"+dortorInfo[i].doctorTitle+"</span></span>"+
											"<span class='doc_time'>"+dortorInfo[i].scheduleDate+"<span class='dep_type'>"+dortorInfo[i].clinicType+"</span></span>"+
										"</div>"+
										"<div class='doc_yynum'>"+
											"<span class='noyhao_num'>停诊</span>"+
										"</div>"+
									"</div>"
								);
							}
							
						}
						
					} else if(dortorInfo[i].timeFlag==2) {//下午
						x++;
						$("#xwcount").text(x+"人");
						var doctorPhoto = dortorInfo[i].doctorPhoto;
						if(doctorPhoto==null || doctorPhoto== "" 
							|| doctorPhoto=="http://www.zjyy.com.cn/expertPhoto/"){
							doctorPhoto = "../../img/self/self.png";
						}
						
						if (dortorInfo[i].workStatus==1) {//出诊状态
							if(dortorInfo[i].leftNum==0){//余号为0，约满状态
								$("#xwinfoList").append(
									"<div class='nocon_doc' >"+
										"<div class='doc_img'><img src='"+doctorPhoto+"'></div>"+
										 "<div class='doc_detail'>"+
											"<span class='doc_name'><span class='doctorName'>"+dortorInfo[i].doctorName+"</span><span class='main_doc'>"+dortorInfo[i].doctorTitle+"</span></span>"+
											"<span class='doc_time'>"+dortorInfo[i].scheduleDate+"<span class='dep_type'>"+dortorInfo[i].clinicType+"</span></span>"+
										"</div>"+
										"<div class='doc_yynum'>"+
											"<span class='yhao'>余号</span>"+
											"<span class='noyhao_num'>约满</span>"+
										"</div>"+
									"</div>"
								);
							}else{//余号不为0，可预约
								$("#xwinfoList").append(
									"<div class='con_doc' >"+
										"<div class='doc_img'><img src='"+doctorPhoto+"'></div>"+
										 "<div class='doc_detail'>"+
											"<input type='hidden' value='"+dortorInfo[i].doctorCode+"' name='doctorCode'>"+
											"<input type='hidden' value='"+dortorInfo[i].timeFlag+"' name='timeFlag'>"+
											"<input type='hidden' value='"+dortorInfo[i].clinicType+"' name='clinicType'>"+
											"<span class='doc_name'><span class='doctorName'>"+dortorInfo[i].doctorName+"</span><span class='main_doc'>"+dortorInfo[i].doctorTitle+"</span></span>"+
											"<span class='doc_time'>"+dortorInfo[i].scheduleDate+"<span class='dep_type'>"+dortorInfo[i].clinicType+"</span></span>"+
										"</div>"+
										"<div class='doc_yynum'>"+
											"<span class='yhao'>余号</span>"+
											"<span class='yhao_num'>"+dortorInfo[i].leftNum+"</span>"+
										"</div>"+
									"</div>"
								);
							}
						}else{//停诊状态
							$("#xwinfoList").append(
								"<div class='nocon_doc' >"+
									"<div class='doc_img'><img src='"+doctorPhoto+"'></div>"+
									 "<div class='doc_detail'>"+
										"<span class='doc_name'><span class='doctorName'>"+dortorInfo[i].doctorName+"</span><span class='main_doc'>"+dortorInfo[i].doctorTitle+"</span></span>"+
										"<span class='doc_time'>"+dortorInfo[i].scheduleDate+"<span class='dep_type'>"+dortorInfo[i].clinicType+"</span></span>"+
									"</div>"+
									"<div class='doc_yynum'>"+
										/*"<span class='yhao'>余号</span>"+*/
										"<span class='noyhao_num'>停诊</span>"+
									"</div>"+
								"</div>"
							);
						}
						
					}else if(dortorInfo[i].timeFlag==3){//晚上
						w++;
						$("#wscount").text(w+"人");
						var doctorPhoto = dortorInfo[i].doctorPhoto;
						if(doctorPhoto==null || doctorPhoto== "" 
							|| doctorPhoto=="http://www.zjyy.com.cn/expertPhoto/"){
							doctorPhoto = "../../img/self/self.png";
						}
						
						if (dortorInfo[i].workStatus==1) {//出诊状态
							if(dortorInfo[i].leftNum==0){//余号为0，约满状态
								$("#wsinfoList").append(
									"<div class='nocon_doc'>"+
										"<div class='doc_img'><img src='"+doctorPhoto+"'></div>"+
										 "<div class='doc_detail'>"+
											"<span class='doc_name'><span class='doctorName'>"+dortorInfo[i].doctorName+"</span><span class='main_doc'>"+dortorInfo[i].doctorTitle+"</span></span>"+
											"<span class='doc_time'>"+dortorInfo[i].scheduleDate+"<span class='dep_type'>"+dortorInfo[i].clinicType+"</span></span>"+
										"</div>"+
										"<div class='doc_yynum'>"+
											"<span class='noyhao_num'>约满</span>"+
										"</div>"+
									"</div>"
								);
							}else{//余号不为0，可预约
								$("#wsinfoList").append(
									"<div class='con_doc'>"+
										"<div class='doc_img'><img src='"+doctorPhoto+"'></div>"+
										 "<div class='doc_detail'>"+
											"<input type='hidden' value='"+dortorInfo[i].doctorCode+"' name='doctorCode'>"+
											"<input type='hidden' value='"+dortorInfo[i].timeFlag+"' name='timeFlag'>"+
											"<input type='hidden' value='"+dortorInfo[i].clinicType+"' name='clinicType'>"+
											"<span class='doc_name'><span class='doctorName'>"+dortorInfo[i].doctorName+"</span><span class='main_doc'>"+dortorInfo[i].doctorTitle+"</span></span>"+
											"<span class='doc_time'>"+dortorInfo[i].scheduleDate+"<span class='dep_type'>"+dortorInfo[i].clinicType+"</span></span>"+
										"</div>"+
										"<div class='doc_yynum'>"+
											"<span class='yhao'>余号</span>"+
											"<span class='yhao_num'>"+dortorInfo[i].leftNum+"</span>"+
										"</div>"+
									"</div>"
								);
							}	
						}else{//停诊状态
							$("#wsinfoList").append(
								"<div class='nocon_doc'>"+
									"<div class='doc_img'><img src='"+doctorPhoto+"'></div>"+
									 "<div class='doc_detail'>"+
										"<span class='doc_name'><span class='doctorName'>"+dortorInfo[i].doctorName+"</span><span class='main_doc'>"+dortorInfo[i].doctorTitle+"</span></span>"+
										"<span class='doc_time'>"+dortorInfo[i].scheduleDate+"<span class='dep_type'>"+dortorInfo[i].clinicType+"</span></span>"+
									"</div>"+
									"<div class='doc_yynum'>"+
										"<span class='noyhao_num'>停诊</span>"+
									"</div>"+
								"</div>"
							);
						}
					}
					
				}
				if (s == 0) {
					$("#swinfoList").append(
						"<div class='list-item '>"+
							"<p class='notData'>暂无数据</p>"+
						"</div>"
					);
				}
				if (x == 0) {
					$("#xwinfoList").append(
						"<div class='list-item '>"+
							"<p class='notData'>暂无数据</p>"+
						"</div>"
					);
				}
				if (w == 0) {
					$("#wsinfoList").append(
						"<div class='list-item '>"+
							"<p class='notData'>暂无数据</p>"+
						"</div>"
					);
				}
			}else{
//				alert(data.message);
				$("#swinfoList").append(
					"<div class='list-item '>"+
						"<p class='notData'>暂无数据</p>"+
					"</div>"
				);
				$("#xwinfoList").append(
					"<div class='list-item '>"+
						"<p class='notData'>暂无数据</p>"+
					"</div>"
				);
				$("#wsinfoList").append(
					"<div class='list-item '>"+
						"<p class='notData'>暂无数据</p>"+
					"</div>"
				);
			}
		});
	}
	
	$("#swinfoList,#xwinfoList,#wsinfoList").on("click",".con_doc",function(){
		var doctorCode = $(this).children(".doc_detail").children("input[name='doctorCode']").val();
		var clinicType = $(this).children(".doc_detail").children("input[name='clinicType']").val();
		var doctorName = $(this).children(".doc_detail").children(".doc_name").children(".doctorName").text();
		var deptCode = $("#deptCode").val();
		var deptName = $("#deptName").text();
		var dateTime = $("#nowTime").text();
		var timeFlag = $(this).children().find("input[name='timeFlag']").val();
		window.location.href="../yuyueguahao/choiceTime.html?deptCode="+deptCode+"&doctorCode="+doctorCode+"&deptName="+deptName+"&dateTime="+dateTime+"&timeFlag="+timeFlag+"&doctorName="+doctorName+"&clinicType="+clinicType;
	});
	
});