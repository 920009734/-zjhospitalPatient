$(function(){
	//选择日期还是医生
	$("#rq").show();
	//选择专家还是名医
	$("#zj").hide();
	//判断条件参数，按日期还是医生挂号
	var tj = 0;
	//判断条件参数，按名专家还是名医
	var ghtype = "1";
	//储存数据
	var sdata = new Object();//号源数据
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
	$("#nowTime").html(nt);
	//开始日期，结束日期，一共是七天
	var dateTime = getSevenDate(nowdate);
	//科室ID
	var deptCode = $("#deptCode").val();
	//动态生成当前日期
	createTime(dateTime, deptCode);
	
	$(".date_item").on("click",".date_list",function(){
		cleanDiv();
		
		var a = $(this).attr("class");
		if(a=="date_list"){
			$(this).addClass("active").siblings(".date_list.active").removeClass("active");
			exditTopDate();
		}else{
			
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
	//条件选择
	$(".show_tab_time").on("click",".guahao",function(){
		if($(this).children("input").val()=="xzDate"){
			$("#dateGh").show();
			$(".nowTime").show();
		}else{
			$("#rq").hide();
			$("#zj").show();
			tj = 1;
			var nt = $("#nowTime").text();
			ghtype = $(".guahao1.active").attr("id");
			doctorInfoList(nt);
		}
		var a = $(this).hasClass("active");
		if(!a){
			$(this).addClass("active");
		}
	});
	
	//按医生选择
	$(".show_tab_time").on("click",".guahao1",function(){
		var a = $(this).hasClass("active");
		if(!a){
			$(this).addClass("active").siblings("span").removeClass("active");
			ghtype = $(".guahao1.active").attr("id");
			var nt = $("#nowTime").text();
			doctorInfoList(nt);
		}
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
			}
		});
	}
	
	//返回七天的字符串
	function getSevenDate(nt) {
		var s = Utils.formatDateByLong(nt, "yyyy-MM-dd") + ",";
		for (var i = 1; i < 7; i++) {
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
	        			$(".date_item").append('<div class="date_list active" id="'+tDate+'">'
							+'<h3 class="dep_name">'+tday+'</h3>'
							+'<p class="dep_addr">'+tDate+'(有)</p>'
							+'</div>');
	        		} else {//无号
	        			$(".date_item").append('<div class="date_list noactive" id="'+tDate+'" >'
							+'<h3 class="dep_name">'+tday+'</h3>'
							+'<p class="dep_addr">'+tDate+'(无)</p>'
							+'</div>');
	        		}
	        	}
	        }else{
	        	if (tDate == data[i].dataday) {
	        		if (data[i].status == 1) {
	        			$(".date_item").append('<div class="date_list" id="'+tDate+'">'
							+'<h3 class="dep_name">'+tday+'</h3>'
							+'<p class="dep_addr">'+tDate+'(有)</p>'
							+'</div>');
	        		} else {
	        			$(".date_item").append('<div class="date_list noactive" id="'+tDate+'">'
							+'<h3 class="dep_name">'+tday+'</h3>'
							+'<p class="dep_addr">'+tDate+'(无)</p>'
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
		var day = $(".date_list.active").attr("id");
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
				var dortorInfo = new Array();
				dortorInfo= data.data;
				sdata = JSON.stringify(dortorInfo);
				console.log("dortorInfo:"+JSON.stringify(dortorInfo));
				var s=0,x=0,w=0;
				for (var i = 0; i < dortorInfo.length; i++) {
					//按照日期
					if (tj == 0) {
						if (dortorInfo[i].timeFlag==1) {//上午
							s++;
							$("#swcount").text(s+"人");
							$("#swinfoList").append(
								"<div class='con_doc'>"+
									 "<div class='doc_img'><img src='../../img/docImg.png'></div>"+
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
						} else if(dortorInfo[i].timeFlag==2) {//下午
							x++;
							$("#xwcount").text(x+"人");
							$("#xwinfoList").append(
								"<div class='con_doc' >"+
									"<div class='doc_img'><img src='../../img/docImg.png'></div>"+
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
						}else if(dortorInfo[i].timeFlag==3){//晚上
							w++;
							$("#wscount").text(w+"人");
							$("#wsinfoList").append(
								"<div class='con_doc'>"+
									"<div class='doc_img'><img src='../../img/docImg.png'></div>"+
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
					//还是按照医生
					} else {
						if (ghtype=="0") {
							if (dortorInfo[i].clinicType == "普通号") {
								if (dortorInfo[i].timeFlag==1) {//上午
									s++;
									$("#swcount").text(s+"人");
									$("#swinfoList").append(
										"<div class='con_doc'>"+
											 "<div class='doc_img'><img src='../../img/docImg.png'></div>"+
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
								} else if(dortorInfo[i].timeFlag==2) {//下午
									x++;
									$("#xwcount").text(x+"人");
									$("#xwinfoList").append(
										"<div class='con_doc' >"+
											"<div class='doc_img'><img src='../../img/docImg.png'></div>"+
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
								}else if(dortorInfo[i].timeFlag==3){//晚上
									w++;
									$("#wscount").text(w+"人");
									$("#wsinfoList").append(
										"<div class='con_doc'>"+
											"<div class='doc_img'><img src='../../img/docImg.png'></div>"+
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
							}
						} else {
							if (dortorInfo[i].clinicType != "普通号") {
								if (dortorInfo[i].timeFlag==1) {//上午
									s++;
									$("#swcount").text(s+"人");
									$("#swinfoList").append(
										"<div class='con_doc'>"+
											 "<div class='doc_img'><img src='../../img/docImg.png'></div>"+
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
								} else if(dortorInfo[i].timeFlag==2) {//下午
									x++;
									$("#xwcount").text(x+"人");
									$("#xwinfoList").append(
										"<div class='con_doc' >"+
											"<div class='doc_img'><img src='../../img/docImg.png'></div>"+
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
								}else if(dortorInfo[i].timeFlag==3){//晚上
									w++;
									$("#wscount").text(w+"人");
									$("#wsinfoList").append(
										"<div class='con_doc'>"+
											"<div class='doc_img'><img src='../../img/docImg.png'></div>"+
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
							}
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
				alert(data.message);
				/*$("#swinfoList").append(
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
				);*/
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
	
	
	
	/*function doctorGh(deptCode){
		$("#dortorList").html("");
		var params={};
		params.deptCode=deptCode;
		$.post(Utils.getRoot()+"/registerApp/selDoctor",params,function(data){
			if (data.success) {
				var dortorInfo = new Array();
				dortorInfo= data.data;
				for (var i = 0; i < dortorInfo.length; i++) {
					$("#dortorList").append(
						"<div class='con_doc' >"+
							"<div class='doc_img'><img src='../../img/docImg.png'></div>"+
							"<div class='doc_detail'>"+
								"<input type='hidden' value='ysid' id='ysid'>"+
								"<input type='hidden' value='"+dortorInfo[i].doctorCode+"' name='doctorCode'>"+
								"<input type='hidden' value='"+dortorInfo[i].clinicType+"' name='clinicType'>"+
								"<input type='hidden' value='"+dortorInfo[i].deptCode+"' name='deptCode'>"+
								"<span class='doc_name'>"+dortorInfo[i].doctorName+"<span class='main_doc'>"+dortorInfo[i].doctorTitle+"</span></span>"+
							"</div>"+
						"</div>"
					);
				}
			}
		});
		
	}
	$("#dortorList").on("click",".con_doc",function(){
		var doctorCode = $(this).children(".doc_detail").children("input[name='doctorCode']").val();
		var clinicType = $(this).children(".doc_detail").children("input[name='clinicType']").val();
		var deptCode = $("#deptCode").val();
		var deptName = $("#deptName").text();
		var dateTime = $("#nowTime").text();
		var timeFlag = "";
		window.location.href="../yuyueguahao/choiceTime.html?deptCode="+deptCode+"&doctorCode="+doctorCode+"&doctorName="+doctorName+"&deptName="+deptName+"&dateTime="+dateTime+"&timeFlag="+timeFlag+"&clinicType="+clinicType;;
	});*/
		
});