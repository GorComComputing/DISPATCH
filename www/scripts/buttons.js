		$(document).ready(function(){
			var Protocol = window.location.protocol;
			var Host = window.location.hostname;
			var Port = window.location.port;
			
			$('#formDeleteUser1').submit(function(){
				$.ajax({
					type: "POST",
					//url: "/save",
					url: Protocol+"//192.168.63.60:8086/api",  //url: Protocol+"//"+Host+":8086/api",
					data: "cmd=delete from users where Id="+$("#id1").val(),
					success: function(html){
						$("#app").val(html);
				   	}
				});
				return false;
			});
			
			
			
			$('#formRunCmd').submit(function(){
				$.ajax({
					type: "POST",
					url: Protocol+"//"+Host+":"+Port+"/api",
					data: "cmd=run "+$("#exec").val(),
					success: function(html){
						$("#spar").val(html);
				   	}
				});
				return false;
			});
			
			$('#formKill').submit(function(){
				$.ajax({
					type: "POST",
					url: Protocol+"//"+Host+":8084/api",
					data: "cmd=kill "+$("#kpid").val(),
					success: function(html){
						$("#spar").val(html);
				   	}
				});
				return false;
			});
			
			$('#formKillAll').submit(function(){
				$.ajax({
					type: "POST",
					url: Protocol+"//"+Host+":8084/api",
					data: "cmd=killall "+$("#kname").val(),
					success: function(html){
						$("#spar").val(html);
				   	}
				});
				return false;
			});
		
			$('#formSave').submit(function(){
				$.ajax({
					type: "POST",
					//url: "/save",
					url: Protocol+"//"+Host+":8084/api",
					data: "cmd=write&leapsectz="+$("#Leapsectz").val() +"&"+
					//"driftfile="+$("#Driftfile").val() +"&"+
					"makestep="+$("#Makestep").val() +"&"+
					"makestep2="+$("#Makestep2").val() +"&"+
					"rtcsync="+$("#Rtcsync").val() +"&"+
					//"logdir="+$("#Logdir").val() +"&"+
					"localStratum="+$("#LocalStratum").val() +"&"+
					"server="+$("#Server").val() +"&"+
					"allow="+$("#Allow").val(),
					success: function(html){
						//$("#usage").html(html);
    						$('#usage').val(html);
				   	}
				});
				return false;
			});
			
			
			$('#btnStart').on('click',  function(){
				//const Protocol = window.location.protocol;
				//const Host = window.location.hostname;
				$.ajax({
					type: "POST",
					url: Protocol+"//"+Host+":8084/api",
					data: "cmd=start",
					//success: function(html){
						//$("#msg").html(html);
				   	//}
				});
				return false;
			});
			
			$('#btnStop').on('click',  function(){
				//const Protocol = window.location.protocol;
				//const Host = window.location.hostname;
				$.ajax({
					type: "POST",
					url: Protocol+"//"+Host+":8084/api",
					data: "cmd=stop",
					//success: function(html){
						//$("#msg").html(html);
				   	//}
				});
				return false;
			});
			
			$('#btnRestart').on('click',  function(){
				//const Protocol = window.location.protocol;
				//const Host = window.location.hostname;
				$.ajax({
					type: "POST",
					url: Protocol+"//"+Host+":8084/api",
					data: "cmd=restart",
					//success: function(html){
						//$("#msg").html(html);
				   	//}
				});
				return false;
			});
			
			$('#btnActivity').on('click',  function(){
				//const Protocol = window.location.protocol;
				//const Host = window.location.hostname;
				$.ajax({
					type: "POST",
					url: Protocol+"//"+Host+":8084/api",
					data: "cmd=activity",
					success: function(html){
						//$("#usage").html(html);
    						$('#usage').val(html);
				   	}
				});
				return false;
			});
			
			$('#btnTracking').on('click',  function(){
			//$('#formTracking').submit(function(){
				$.ajax({
					type: "POST",
					//url: "/tracking",
					url: Protocol+"//"+Host+":8084/api",
					data: "cmd=tracking",
					success: function(html){
						//$("#usage").html(html);
    						$('#usage').val(html);
				   	}
				});
				return false;
			});
			
			$('#btnSources').on('click',  function(){
			//$('#formSources').submit(function(){
				$.ajax({
					type: "POST",
					//url: "/sources",
					url: Protocol+"//"+Host+":8084/api",
					data: "cmd=sources",
					success: function(html){
						//$("#usage").html(html);
    						$('#usage').val(html);
				   	}
				});
				return false;
			});
			
			$('#btnSourceStats').on('click',  function(){
			//$('#formSourceStats').submit(function(){
				$.ajax({
					type: "POST",
					//url: "/sourcestats",
					url: Protocol+"//"+Host+":8084/api",
					data: "cmd=sourcestats",
					success: function(html){
						//$("#usage").html(html);
    						$('#usage').val(html);
				   	}
				});
				return false;
			});
			
			$('#btnClients').on('click',  function(){
			//$('#formClients').submit(function(){
				$.ajax({
					type: "POST",
					//url: "/clients",
					url: Protocol+"//"+Host+":8084/api",
					data: "cmd=clients",
					success: function(html){
						//$("#usage").html(html);
    						$('#usage').val(html);
				   	}
				});
				return false;
			});
			
			$('#btnConfig').on('click',  function(){
			//$('#formConfig').submit(function(){
				$.ajax({
					type: "POST",
					//url: "/config",
					url: Protocol+"//"+Host+":8084/api",
					data: "cmd=config",
					success: function(html){
						//$("#usage").html(html);
    						$('#usage').val(html);
				   	}
				});
				return false;
			});
			
			
			$('#btnSaveConfig').on('click',  function(){
			//$('#formSaveConfig').submit(function(){
				$.ajax({
					type: "POST",
					url: Protocol+"//"+Host+":8084/api",
					data: "cmd=save&text="+$("#usage").val(),
					/*success: function(html){
						//$("#usage").html(html);
    						$('textarea').val(html);
				   	}*/
				});
				return false;
			});
			
			$('#btnRestore').on('click',  function(){
			//$('#formRestore').submit(function(){
				$.ajax({
					type: "POST",
					//url: "/restore",
					url: Protocol+"//"+Host+":8084/api",
					data: "cmd=restore",
					success: function(html){
    						$('#usage').val(html);
				   	}
					
				});
				return false;
			});
			
			
			
			
			
			
			$('#btnTop').on('click',  function(){
				$.ajax({
					type: "POST",
					url: Protocol+"//"+Host+":8084/api",
					data: "cmd=top",
					success: function(html){
    						$("#spar").val(html);
				   	}
				});
				return false;
			});
			
			
			////////////////////////////////////////////////////////////////
			
			$('.btnCurl').on('click',  function(){
				var addId = $(this).attr('btnId');
				var addIP = $(this).attr('btnIP');
				var addCmd = $(this).attr('btnCmd');
				$.ajax({
					type: "POST",
					url: Protocol+"//"+Host+":"+Port+"/api",
					data: "cmd=curl "+addCmd+" http://"+addIP+"/cgi-bin/configs.cgi?",
					success: function(html){
    						$("#spar"+addId).val(html);
				   	}
				});
				return false;
			});
			
			
			$('.btnStatusCurl').on('click',  function(){
				var addId = $(this).attr('btnId');
				var addIP = $(this).attr('btnIP');
				
				$.ajax({
					type: "POST",
					url: Protocol+"//"+Host+":"+Port+"/api",
					data: "cmd=curlp getver http://"+addIP+"/cgi-bin/configs.cgi?",
					async: false,
					success: function(html){
						const obj = JSON.parse(html);
				
						$("#offcanvasTopLabel"+addId).empty();
						$("#offcanvasTopLabel"+addId).prepend(obj.devicename);
						
						$("#ipaddr"+addId).empty();
						$("#ipaddr"+addId).prepend(addIP);
						
						$("#status"+addId).empty();
						$("#status"+addId).prepend(obj.mode);
						
						$("#version"+addId).empty();
    						$("#version"+addId).prepend(obj.softversion);
				   	}
				});
				
				$.ajax({
					type: "POST",
					url: Protocol+"//"+Host+":"+Port+"/api",
					data: "cmd=curlp getsync http://"+addIP+"/cgi-bin/configs.cgi?",
					async: false,
					success: function(html){
						const obj = JSON.parse(html);
				
						/*$("#gnss"+addId).empty();
						$("#gnss"+addId).prepend(obj.gnss);
			
						$("#ptp"+addId).empty();
						$("#ptp"+addId).prepend(obj.ptp);*/

						$("#mesg"+addId).empty();
						if (obj.ptp == "ON") {
							$("#mesg"+addId).prepend("&nbsp; ptp &nbsp; <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#198754' class='bi bi-circle-fill' viewBox='0 0 16 16'><circle cx='8' cy='8' r='8'/></svg>");
						} else {
							$("#mesg"+addId).prepend("&nbsp; ptp &nbsp; <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#dc3545' class='bi bi-circle-fill' viewBox='0 0 16 16'><circle cx='8' cy='8' r='8'/></svg>");
						}
						
						if (obj.gnss == "ON") {
							$("#mesg"+addId).prepend("gnss &nbsp; <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#198754' class='bi bi-circle-fill' viewBox='0 0 16 16'><circle cx='8' cy='8' r='8'/></svg>");
						} else {
							$("#mesg"+addId).prepend("gnss &nbsp; <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#dc3545' class='bi bi-circle-fill' viewBox='0 0 16 16'><circle cx='8' cy='8' r='8'/></svg>");
						}

				   	}
				});

				return false;
			});
			
			
			$('.btnBaseCurl').on('click',  function(){
				var addId = $(this).attr('btnId');
				var addIP = $(this).attr('btnIP');
				var addName = "";
				var addVersion = "";
				
				response = $.ajax({
					type: "POST",
					url: Protocol+"//"+Host+":"+Port+"/api",
					data: "cmd=curlp getver http://"+addIP+"/cgi-bin/configs.cgi?",
					async: false,
					success: function(html){

				   	}
				}).responseText;
				//console.log(response);
				
				const obj = JSON.parse(response);
				
						$("#offcanvasTopLabel"+addId).empty();
						$("#offcanvasTopLabel"+addId).prepend(obj.devicename);
						
						$("#ipaddr"+addId).empty();
						$("#ipaddr"+addId).prepend(addIP);
						
						$("#status"+addId).empty();
						$("#status"+addId).prepend(obj.mode);
						
						$("#ptp"+addId).empty();
						$("#ptp"+addId).prepend(obj.ptp);
						
						$("#version"+addId).empty();
    						$("#version"+addId).prepend(obj.softversion);
    						
    						addVersion = obj.softversion;
    						addName = obj.devicename.replace(/\s/g,'_');
    						
    						
    						//var addNameStr = addName;
						//console.log(addNameStr= addNameStr.replace(/\s/g,''));
    						
				//console.log(addNameStr);
				
				$.ajax({
					type: "POST",
					url: Protocol+"//"+Host+":"+Port+"/api",
					data: "cmd=updatedev " + addId + " " + addName + " " + addVersion,
					async: false,
					success: function(html){
						$("#spar"+addId).val('Параметры сохранены в базе');
				   	}
				});
				
				return false;
			});
			
			
			
	
			
		});
