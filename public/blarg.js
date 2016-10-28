//Base URL should be changed to your URL
var base_url = "https://thegwe.apps.exosite.io"

function updateUserName()
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
		})
	});
}

function updateDiskFree()
{

	var url = base_url.concat("/device_info");

	$(document).ready(function() {
		$.ajax({
			url: url,
			type: "GET"
		})	
		.then(response => {
			var data = JSON.parse(response[0].value);
			document.getElementById("disk_free").innerHTML = data.df;
		})
	});
}

function updateIPAddress()
{

	var url = base_url.concat("/device_info");

	$(document).ready(function() {
		$.ajax({
			url: url,
			type: "GET"
		})	
		.then(response => {
			var data = JSON.parse(response[0].value);
			document.getElementById("ipaddrs").innerHTML = data.ipaddrs;
		})
	});
}

function updateFree()
{

	var url = base_url.concat("/device_info");

	$(document).ready(function() {
		$.ajax({
			url: url,
			type: "GET"
		})	
		.then(response => {
			var data = JSON.parse(response[0].value);
			document.getElementById("free").innerHTML = data.free;
		})
	});
}

function updateApps()
{

	var url = base_url.concat("/engine_report");

	$(document).ready(function() {
		$.ajax({
			url: url,
			type: "GET"
		})	
		.then(response => {
			var data = JSON.parse(response[0].value);
			document.getElementById("apps").innerHTML = data.apps;
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
