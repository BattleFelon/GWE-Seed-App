
--#ENDPOINT GET /device_info
local result = Keystore.get({ key = "device_info" })
response.code = 201
response.message = {result}
response.headers["x-my-custom-header"] = "my header content"

--#ENDPOINT GET /usage_report
local result = Keystore.get({ key = "usage_report" })
response.code = 201
response.message = {result}
response.headers["x-my-custom-header"] = "my header content"

--#ENDPOINT GET /engine_report
local result = Keystore.get({ key = "engine_report" })
response.code = 201
response.message = {result}
response.headers["x-my-custom-header"] = "my header content"

--#ENDPOINT GET /test_data
local query_string =  "select test from raw_data limit 100"
local data = Timeseries.query({
  q = query_string
})

response.code = 201
response.message = data.results
response.headers["x-my-custom-header"] = "my header content"