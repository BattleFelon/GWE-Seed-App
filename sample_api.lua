
--#ENDPOINT GET /device_info
local result = Keystore.get({ key = "device_info" })
response.code = 201 response.message = {result} response.headers["x-my-custom-header"] = "my header content"

--#ENDPOINT GET /usage_report
local result = Keystore.get({ key = "usage_report" })
response.code = 201 response.message = {result} response.headers["x-my-custom-header"] = "my header content"

--#ENDPOINT GET /engine_report
local result = Keystore.get({ key = "engine_report" })
response.code = 201 response.message = {result} response.headers["x-my-custom-header"] = "my header content"

--#ENDPOINT GET /test_data
local result = Keystore.get({ key = "test" })
response.code = 201 response.message = {result} response.headers["x-my-custom-header"] = "my header content"