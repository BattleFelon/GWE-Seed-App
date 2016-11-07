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

			//Format for display
			var uname = "<pre>" + data.uname + "</pre>";
			var disk_free = "<pre>" + data.df + "</pre>";
			var free = "<pre>" + data.free + "</pre>";

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

			//var to hold name values
			var keys = [];
			//Header to display
			var header = "<table><tr><b><th>Program Name</th><th>Exit Status</th><th>Status</th><th>Uptime</th><th>Version</th></b></tr>";
			//var to hold data values
			var values = [];

			for(i = 0; i < data.apps.length; ++i){

				for(var key in data.apps[i]){
					var value = [];

					keys.push(key);
					value.push(data.apps[i][key].exitstatus);
					value.push(data.apps[i][key].status);
					value.push(data.apps[i][key].uptime);
					value.push(data.apps[i][key].version);

					values.push(value);
				}
			}

			//Push values to document
			var string_to_write = header
			for(i = 0; i < keys.length; ++i){
				string_to_write += "<tr><b><td>" + keys[i] + "</td></b>";
				
				for(j = 0; j < values[i].length; ++j){
						string_to_write += "<td>" + values[i][j] + "</td>";
				}

				string_to_write += "</tr>";
			}

			string_to_write += "</table>";
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

			//var to hold name values
			var keys = [];
			//var to hold key values
			var header = "<table><tr><b><th>Method	</th><th>Total RX</th><th>MaxRX</th><th>Total TX</th><th>Max TX</th><th>Number of Requests</th></b></tr>"
			//var to hold data values
			var values = [];

			//Process the data for display
			for(var key1 in data){
				var line = data[key1];

				//Check to make sure the interface is used
				if(line.top_consumer != ""){
					for(key2 in line){
						
						var line2 = line[key2];
						for(key3 in line2){
							var value = [];
							if(key3.length > 2){
								keys.push(key3);

								//Add values to array
								value.push(line2[key3].tot_rx);
								value.push(line2[key3].max_rx);
								value.push(line2[key3].tot_tx);
								value.push(line2[key3].max_tx);
								value.push(line2[key3].num);

								values.push(value);
							}
						}
					}
				}
			}

			//Push values to document
			var string_to_write = header
			for(i = 0; i < keys.length; ++i){
				string_to_write += "<tr><b><td>" + keys[i] + "</td></b>";
				
				for(j = 0; j < values[i].length; ++j){
						string_to_write += "<td>" + values[i][j] + "</td>";
				}

				string_to_write += "</tr>";
			}

			string_to_write += "</table>";
			console.log(string_to_write);

			document.getElementById("usage").innerHTML = string_to_write;
			
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

			//Create a datapoint from the data
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