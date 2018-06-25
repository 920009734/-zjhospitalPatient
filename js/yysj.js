$(function(){
	var Request = new Object();
	Request = Utils.getRequest();
	$("#deptCode").val(Request["deptCode"]);
	$("#doctorCode").val(Request["doctorCode"]);
	$("#clinicType").val(Request["clinicType"]);
	$("#doctorName").text(Request["doctorName"]);
	$("#deptName").text(Request["deptName"]);
	$("#dateTime").text(Request["dateTime"]);
	var timeFlag = Request["timeFlag"];
	var params={};
	params.deptCode = Request["deptCode"];
	params.doctorCode = Request["doctorCode"];
	params.dateTime = Request["dateTime"];
	
	$.post(Utils.getRoot()+"/registerApp/selhasDetailTime",params,function(data){
		if (data.success) {
			var doctorInfo = new Array();
			doctorInfo= data.data;
			var s=0,x=0,w=0;
			for (var i = 0; i < doctorInfo.length; i++) {
					//按日期选择进入
					$("#rqgh").show();
					if(doctorInfo[i].timeFlag==timeFlag){
						if (doctorInfo[i].hasDetailTime==1) {//判断是否有分时
							//把挂号费转为元，原本是分
							var regFee = parseInt(doctorInfo[i].regFee)/100;
							$("#dateTimeDiv").append(
								"<div class='ck_dateTime'>"+
									"<div class='slot_item'>"+
										"<input type='hidden' name='timeFlag_' value='"+doctorInfo[i].timeFlag+"' />"+
										"<span class='time_slot'>"+
											"<span class='beginTime_'>"+doctorInfo[i].beginTime+"</span>"+
											"~"+
											"<span class='endTime_'>"+doctorInfo[i].endTime+"</span>"+
										"</span>"+
										"<span class='yuhao'>余号：<span class='yuhao_'>"+doctorInfo[i].leftNum+"</span></span>"+
										"<span class='ghmoney'><span>￥</span><span class='regFee'>"+regFee+"</span></span>"+
									"</div>"+
								"</div>"
							);
						}else{
							$("#dateTimeDiv").append(
								"<div class='slot_item'>"+
									"<p class='notData'>暂无数据</p>"+
								"</div>"
							);
						}
					}
			}
			
		}
		
	});
	
	$("#dateTimeDiv").on("click",".ck_dateTime",function(){//按日期选择
		if($(this).children().children(".yuhao").children(".yuhao_").text()>0){
			var deptCode = $("#deptCode").val();
			var deptName = $("#deptName").text();
			var doctorCode = $("#doctorCode").val();
			var clinicType = $("#clinicType").val();
			var doctorName = $("#doctorName").text();
			var dateTime = $("#dateTime").text();
			var regFee = $(this).children().children(".ghmoney").children(".regFee").text();
			var beginTime = $(this).children().children(".time_slot").children(".beginTime_").text();
			var endTime = $(this).children().children(".time_slot").children(".endTime_").text();
			var timeFlag = $(this).children().find("input[name='timeFlag_']").val();
			window.location.href="../yuyueguahao/comfirmMsg.html?deptCode="+deptCode+"&deptName="+deptName+"&doctorCode="+doctorCode+"&doctorName="+doctorName+"&dateTime="+dateTime+"&regFee="+regFee+"&beginTime="+beginTime+"&endTime="+endTime+"&timeFlag="+timeFlag+"&clinicType="+clinicType;            
		}
	});
	
});