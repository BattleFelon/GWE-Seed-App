//Base URL should be changed to your URL
var base_url = "https://thegwe.apps.exosite.io"

//Test Data graph information
var test_data = [];
test_data.push(['Time', 'Data']);

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

			var uname = data.uname.replace(/(\r\n|\n|\r)/gm, "<br>");
			var disk_free = data.df.replace(/(\r\n|\n|\r)/gm, "<br>");
			var free = data.free.replace(/(\r\n|\n|\r)/gm, "<br>");

			document.getElementById("uname").innerHTML = uname;
			document.getElementById("disk_free").innerHTML =  disk_free;
			document.getElementById("free").innerHTML = free;

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
				//console.log(key);
				//console.log(data.eth0[key]);

			}
		})
	});
}

//Grabs the test data from Murano to update the graph
function updateGraph()
{
		var url = base_url.concat("/test_data");

	$(document).ready(function() {
		$.ajax({
			url: url,
			type: "GET"
		})	
		.then(response => {

			var current_time = new Date();

			var point = [current_time.toString(), parseInt(response[0].value)];

			test_data.push(point);

			//Removes the first elements when the array becomes size 50
			if(test_data.length > 50){
				test_data.splice(1,1);
			}

		})
	});
}

//Controls the index page view
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

//Draws the linehcat of the test data
function drawChart() {

	updateGraph();

    var data = google.visualization.arrayToDataTable(test_data);

    var options = {
      title: 'Test Data',
      legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('line'));

    chart.draw(data, options);

}