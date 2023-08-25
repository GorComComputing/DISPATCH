// Обновляет страницу
/*function Refresh() {
	location.reload();
}*/



 function  HttpRequest(s, body) {
  	//console.log('Log from JS: ['+s+']');
	var response = "";
	var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
        	//console.log(xhttp.responseText);
            response = xhttp.responseText;
        }
      };
      //xhttp.withCredentials = true;
      xhttp.open("POST", s, false);
      //xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencode');
	  xhttp.send(body);
     
      return {response: response};
}
		

// Обновляет информацию (для запросов каждые 15 секунд)		
function reqStatusGNSS_PTP(addIP, addId) {
			var Protocol = window.location.protocol;
			var Host = window.location.hostname;
			var Port = window.location.port;
			
			console.log("Запрос на устройство:");
// Обновление режима gnss/ptp пока отключу для увеличения скорости			
/*  				$.ajax({
					type: "POST",
					url: Protocol+"//"+Host+":"+Port+"/api",
					data: "cmd=curls getsync http://"+addIP+"/cgi-bin/configs.cgi?",
					async: true,
					success: function(html){
						if (html == "Request FAIL\n"){
							$("#spar"+addId).val("Error: Устройство " + addIP + " не отвечает");
							$("#mesg"+addId).empty();
							$("#mesg"+addId).prepend("&nbsp; ptp &nbsp; <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#dc3545' class='bi bi-circle-fill' viewBox='0 0 16 16'><circle cx='8' cy='8' r='8'/></svg>");
							$("#mesg"+addId).prepend("gnss &nbsp; <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#dc3545' class='bi bi-circle-fill' viewBox='0 0 16 16'><circle cx='8' cy='8' r='8'/></svg>");
							
							$("#mesg_base"+addId).empty();
							$("#mesg_base"+addId).prepend(" / <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#dc3545' class='bi bi-circle-fill' viewBox='0 0 16 16'><circle cx='8' cy='8' r='8'/></svg>");
							$("#mesg_base"+addId).prepend("<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#dc3545' class='bi bi-circle-fill' viewBox='0 0 16 16'><circle cx='8' cy='8' r='8'/></svg>");
							return;
						}
						const obj = JSON.parse(html);
						
						$("#mesg"+addId).empty();
						$("#mesg_base"+addId).empty();
						if (obj.ptp == "ON") {
							$("#mesg"+addId).prepend("&nbsp; ptp &nbsp; <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#198754' class='bi bi-circle-fill' viewBox='0 0 16 16'><circle cx='8' cy='8' r='8'/></svg>");
							$("#mesg_base"+addId).prepend(" / <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#198754' class='bi bi-circle-fill' viewBox='0 0 16 16'><circle cx='8' cy='8' r='8'/></svg>");
						} else {
							$("#mesg"+addId).prepend("&nbsp; ptp &nbsp; <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#dc3545' class='bi bi-circle-fill' viewBox='0 0 16 16'><circle cx='8' cy='8' r='8'/></svg>");
							$("#mesg_base"+addId).prepend(" / <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#dc3545' class='bi bi-circle-fill' viewBox='0 0 16 16'><circle cx='8' cy='8' r='8'/></svg>");
						}
						
						if (obj.gnss == "ON") {
							$("#mesg"+addId).prepend("gnss &nbsp; <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#198754' class='bi bi-circle-fill' viewBox='0 0 16 16'><circle cx='8' cy='8' r='8'/></svg>");
							$("#mesg_base"+addId).prepend("<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#198754' class='bi bi-circle-fill' viewBox='0 0 16 16'><circle cx='8' cy='8' r='8'/></svg>");
						} else {
							$("#mesg"+addId).prepend("gnss &nbsp; <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#dc3545' class='bi bi-circle-fill' viewBox='0 0 16 16'><circle cx='8' cy='8' r='8'/></svg>");
							$("#mesg_base"+addId).prepend("<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#dc3545' class='bi bi-circle-fill' viewBox='0 0 16 16'><circle cx='8' cy='8' r='8'/></svg>");
						}

				   	},
				   	error: function(xhr, status, error){
                				$("#mesg"+addId).empty();
						$("#mesg"+addId).prepend("&nbsp; ptp &nbsp; <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#dc3545' class='bi bi-circle-fill' viewBox='0 0 16 16'><circle cx='8' cy='8' r='8'/></svg>");
						$("#mesg"+addId).prepend("gnss &nbsp; <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#dc3545' class='bi bi-circle-fill' viewBox='0 0 16 16'><circle cx='8' cy='8' r='8'/></svg>");
						
						$("#mesg_base"+addId).empty();
							$("#mesg_base"+addId).prepend(" / <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#dc3545' class='bi bi-circle-fill' viewBox='0 0 16 16'><circle cx='8' cy='8' r='8'/></svg>");
							$("#mesg_base"+addId).prepend("<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#dc3545' class='bi bi-circle-fill' viewBox='0 0 16 16'><circle cx='8' cy='8' r='8'/></svg>");
				        }

				});
*/				
				
				$.ajax({
					type: "POST",
					url: Protocol+"//"+Host+":"+Port+"/api",
					data: "cmd=curls getgenerator http://"+addIP+"/cgi-bin/configs.cgi?",
					async: true,
					success: function(html){
						if (html == "Request FAIL\n"){
							$("#seven-seg-array-gnss_ref"+addId).sevenSeg({ digits: 8, value: null });
							$("#seven-seg-array-ptp_ref"+addId).sevenSeg({ digits: 8, value: null });
							return;
						}
						const obj = JSON.parse(html);
						console.log(obj.gnssref + " " + obj.ptpref);
						
						var gnssref = "";
						var ptpref = "";
						var ptplen = 0;
						var gnsslen = 0;
						
						if (obj.gnssref == "" || obj.gnssref == "-"){
							gnssref = "-"
							gnsslen = 8
						} else {
							gnssref = obj.gnssref
							gnssref.padStart(gnsslen_old , " ");
							gnsslen_old = gnsslen;
							if (gnssref.length < 8) gnsslen = 8
							else 
							gnsslen = gnssref.length
						}
						if (obj.ptpref == "" || obj.ptpref == "-"){
							ptpref = "-"
							ptplen = 8
						} else {
							ptpref = obj.ptpref
							ptpref.padStart(ptplen_old , " ");
							ptplen_old = ptplen;
							if (ptpref.length < 8) ptplen = 8
							else 
							ptplen = ptpref.length
						}
					

		
					
				//$("#seven-seg-array-gnss_ref"+addId).sevenSeg({ digits: gnsslen, value: null });
				//$("#seven-seg-array-gnss_ref"+addId).html('');	
				$("#seven-seg-array-gnss_ref"+addId).sevenSeg({
        				digits: gnsslen,
        				value: gnssref,
        				colorOff: "#212529",
        				colorOn: "#0d6efd",
        				decimalPlaces: -1,
        				colorBackground: "#212529",
        				//slant: 10   // наклон
    				});
    				
    				//$("#seven-seg-array-ptp_ref"+addId).sevenSeg({ digits: ptplen, value: null });
    				//$("#seven-seg-array-ptp_ref"+addId).html('');
    				$("#seven-seg-array-ptp_ref"+addId).sevenSeg({
        				digits: ptplen,
        				value: ptpref,
        				colorOff: "#212529",
        				decimalPlaces: -1,
        				colorBackground: "#212529",
        				//colorOn: "#0d6efd",
    				});
    				
    				console.log(ptpref + " : " + ptplen);
    				console.log(gnssref + " : " + gnsslen);
						

				
					},
				   	error: function(xhr, status, error){
                				$("#seven-seg-array-gnss_ref"+addId).sevenSeg({ digits: 8, value: null });
						$("#seven-seg-array-ptp_ref"+addId).sevenSeg({ digits: 8, value: null });
				        }
				
				});
}
		
		
		
		
		

