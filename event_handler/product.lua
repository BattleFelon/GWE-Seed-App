local value = data.value[2]
local alias = data.alias

local data = {
  ["socket_id"] = websocketInfo.socket_id,
  message = "hello world"
} Websocket.send(data)


if alias == "device_info" then
  Keystore.set({ key = "device_info", value = value })
end

if alias == "usage_report" then
  Keystore.set({ key = "usage_report", value = value })
end

if alias == "engine_report" then
  Keystore.set({ key = "engine_report", value = value })
end

--WOOOOO