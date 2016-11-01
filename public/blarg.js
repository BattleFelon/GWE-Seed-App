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
			//var data = JSON.parse(response[0].value);
			//document.getElementById("apps").innerHTML = data.apps;
			var key;
			var value;
			//JSON.parse(response[0].value,key,value);
			//document.write(data.apps[0].key);
		})
	});
}

function updateUsageReport()
{

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

    var data = google.visualization.arrayToDataTable([
      ['Year', 'Sales'],
      ['2004',  1000],
      ['2005',  1170],
      ['2006',  660],
      ['2007',  1030]
    ]);

    var options = {
      title: 'Test Data',
      curveType: 'function',
      legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

    chart.draw(data, options);
    }