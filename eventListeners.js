// react on the "GasStateChanged" Event
function handleGasStateChanged (event) {
    // read variables from the event
    let ev = JSON.parse(event.data); 
    let evData = ev.data; // the data from the argon event: "pressed" or "released"
    let evDeviceId = ev.coreid; // the device id
    let evTimestamp = Date.parse(ev.published_at); // the timestamp of the event

    // the data we want to send to the clients
    let data = {
        message: evData, // just forward "started blinking" or "stopped blinking"
    }

    // send data to all connected clients
    sendData("GasStateChanged", data, evDeviceId, evTimestamp );
}
// react on the "AQIPM25StateChanged" Event
function handleAQIPM25StateChanged (event) {
    // read variables from the event
    let ev = JSON.parse(event.data);
    let evData = ev.data; // the data from the argon event: "started blinking" or "stopped blinking"
    let evDeviceId = ev.coreid; // the device id
    let evTimestamp = Date.parse(ev.published_at); // the timestamp of the event

    // the data we want to send to the clients
    let data1 = {
        message: evData, // just forward "started blinking" or "stopped blinking"
    }

    // send data to all connected clients
    sendData("AQIPM25StateChanged", data1, evDeviceId, evTimestamp );
}
// react on the "AQIPM100StateChanged" Event
function handleAQIPM100StateChanged (event) {
    // read variables from the event
    let ev = JSON.parse(event.data);
    let evData = ev.data; // the data from the argon event: "started blinking" or "stopped blinking"
    let evDeviceId = ev.coreid; // the device id
    let evTimestamp = Date.parse(ev.published_at); // the timestamp of the event

    // the data we want to send to the clients
    let data2 = {
        message: evData, // just forward "started blinking" or "stopped blinking"
    }

    // send data to all connected clients
    sendData("AQIPM100StateChanged", data2, evDeviceId, evTimestamp );
}

// react on the "AirQualityPmStateChanged" Event
function handleAirqualityPmStateChanged (event) {
    // read variables from the event
    let ev = JSON.parse(event.data); 
    let evData = ev.data; // the data from the argon event: "pressed" or "released"
    let evDeviceId = ev.coreid; // the device id
    let evTimestamp = Date.parse(ev.published_at); // the timestamp of the event

    // the data we want to send to the clients
    let data3 = {
        message: evData, // just forward "started blinking" or "stopped blinking"
    }

    // send data to all connected clients
    sendData("AirQualityPmStateChanged", data3, evDeviceId, evTimestamp );
}

// react on the "AirQualityUmLStateChanged" Event
function handleAirqualityUmLStateChanged (event) {
    // read variables from the event
    let ev = JSON.parse(event.data); 
    let evData = ev.data; // the data from the argon event: "pressed" or "released"
    let evDeviceId = ev.coreid; // the device id
    let evTimestamp = Date.parse(ev.published_at); // the timestamp of the event

    // the data we want to send to the clients
    let data4 = {
        message: evData, // just forward "started blinking" or "stopped blinking"
    }

    // send data to all connected clients
    sendData("AirQualityUmLStateChanged", data4, evDeviceId, evTimestamp );
}

// send data to the clients.
// You don't have to change this function
function sendData(evName, evData, evDeviceId, evTimestamp ) {
    
    // map device id to device nr
    let nr = exports.deviceIds.indexOf(evDeviceId)

    // the message that we send to the client
    let data = {
        eventName: evName,
        eventData: evData,
        deviceNumber: nr,
        timestamp: evTimestamp,
    };

    // send the data to all connected clients
    exports.sse.send(data)
}

exports.deviceIds = [];
exports.sse = null;

// export your own functions here as well
exports.handleGasStateChanged = handleGasStateChanged;
exports.handleAQIPM25StateChanged = handleAQIPM25StateChanged;
exports.handleAQIPM100StateChanged = handleAQIPM100StateChanged;
exports.handleAirqualityPmStateChanged = handleAirqualityPmStateChanged;
exports.handleAirqualityUmLStateChanged = handleAirqualityUmLStateChanged;
