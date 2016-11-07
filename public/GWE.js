//Base URL should be changed to your URL
var base_url = "https://thegwe.apps.exosite.io"

//Get the data from device info and assign it to the id of the HTML Elements
function updateDeviceInfo()
{
	var url = base_url.concat("/device_info");

	$(document).ready(function() {
		$.ajax({
			url: url,
			type: "GET"
		})	
		.then(response => {
			var data = JSON.parse(response[0].value);

			document.getElementById("uname").innerHTML = data.uname;
			document.getElementById("disk_free").innerHTML = data.df;
			document.getElementById("free").innerHTML = data.free;

			//This is an array becasue it is on several elements
			var elements = document.getElementsByClassName("ipaddrs");
			for(var i = 0; i < elements.length; i++){
		   		elements[i].innerHTML=data.ipaddrs;    // Change the content
		    }

		})
	});
}

function updateEngineReport()
{
	var url = base_url.concat("/engine_report");

	$(document).ready(function() {
		$.ajax({
			url: url,
			type: "GET"
		})	
		.then(response => {

			var data = JSON.parse(response[0].value);
			var data_array = data.apps;

			var header = "<p> Program Name, Exit Status, Status, Uptime, Version\n </p>";


			var gmq = "<p>GMQ " + data_array[0].gmq.exitstatus + ", " + data_array[0].gmq.status + ", " + data_array[0].gmq.uptime + ", " + data_array[0].gmq.version + "\n</p>";
			var gmq_demo = "<p>GMQ_Demo " + data_array[1].gmq_demo.exitstatus + ", " + data_array[1].gmq_demo.status + ", " + data_array[1].gmq_demo.uptime + ", " + data_array[1].gmq_demo.version + "\n</p>";
			var gwe = "<p>GWE " + data_array[2].gwe.exitstatus + ", " + data_array[2].gwe.status + ", " + data_array[2].gwe.uptime + ", " + data_array[2].gwe.version + "\n</p>";


			var string_to_write = header + gmq + gmq_demo + gwe;

			document.getElementById("apps").innerHTML = string_to_write;

		})
	});
}

function updateUsageReport()
{
		var url = base_url.concat("/usage_report");

	$(document).ready(function() {
		$.ajax({
			url: url,
			type: "GET"
		})	
		.then(response => {

			var data = JSON.parse(response[0].value);

			for(var key in data.eth0){
				console.log(key);
				console.log(data.eth0[key]);

			}
		})
	});
}

function showDeviceInfo() {
	document.getElementById("device_info").style.display = "block";
	document.getElementById("engine_report").style.display = "none";
	document.getElementById("usage_report").style.display = "none";
	document.getElementById("data_view").style.display = "none";
}

function showEngineReport() {
	document.getElementById("device_info").style.display = "none";
	document.getElementById("engine_report").style.display = "block";
	document.getElementById("usage_report").style.display = "none";
	document.getElementById("data_view").style.display = "none";
}

function showUsageReport() {
	document.getElementById("device_info").style.display = "none";
	document.getElementById("engine_report").style.display = "none";
	document.getElementById("usage_report").style.display = "block";
	document.getElementById("data_view").style.display = "none";
}

function showDataView() {
	document.getElementById("device_info").style.display = "none";
	document.getElementById("engine_report").style.display = "none";
	document.getElementById("usage_report").style.display = "none";
	document.getElementById("data_view").style.display = "block";
}

function drawChart() {

}