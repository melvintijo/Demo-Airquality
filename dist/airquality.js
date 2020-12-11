var rootUrl = window.location.origin; // get the root URL, e.g. https://example.herokuapp.com

var app = new Vue({
    el: "#app",
    data: {
        //buttonState_0: "unknown", // the state of the button on device 0
        //buttonState_1: "unknown", // the state of the button on device 1
        //buttonPressCounter: 0,    // how many times the buttons were pressed
        //buttonsSync: false,       // true if the buttons were pressed within 1 second
        //blinking_0: false,        // true if device 0 is blinking.
        //blinking_1: false,        // true if device 0 is blinking.
        // add your own variables here ...
        Gas: "", // the last gas event
        AQI25: "",
        AQI100: "",
        AirQualityPm: "",
        AirQualityPmL: "",
    },
    // This function is executed once when the page is loaded.
    mounted: function () {
        this.initSse();
    },
    methods: {
        // Initialise the Event Stream (Server Sent Events)
        // You don't have to change this function
        initSse: function () {
            if (typeof (EventSource) !== "undefined") {
                var url = rootUrl + "/api/events";
                var source = new EventSource(url);
                source.onmessage = (event) => {
                    this.updateVariables(JSON.parse(event.data));
                };
            } else {
                this.message = "Your browser does not support server-sent events.";
            }
        },
        // react on events: update the variables to be displayed
        updateVariables(ev) {
            // Event "GasStateChanged"
            if (ev.eventName === "GasStateChanged") {
              this.Gas = ev.eventData.message;
            }
            if (ev.eventName === "AirQualityPmStateChanged") {
                this.AirQualityPm = ev.eventData.message;
            }
            if (ev.eventName === "AirQualityUmLStateChanged") {
                this.AirQualityPmL = ev.eventData.message;
            }
                        
            if (ev.eventName === "AQIPM25StateChanged") {
                this.AQI25 = ev.eventData.message;
                if (this.AQI25.includes("Good")){
                    
                    document.getElementById("p25").style.color = "rgb(0, 255, 21)";
                }
                if (this.AQI25.includes("Moderate")){
                    
                    document.getElementById("p25").style.color = "rgb(255, 238, 0)";
                }
                if (this.AQI25.includes("Unhealthy for Sensitive Groups")){
                    
                    document.getElementById("p25").style.color = "rgb(255, 123, 0)";
                }
                if (this.AQI25.includes("Unhealthy")){
                    
                    document.getElementById("p25").style.color = "rgb(255, 0, 0)";
                }
                if (this.AQI25.includes("Very Unhealthy")){
                    
                    document.getElementById("p25").style.color = "rgb(234, 0, 255)";
                }
                if (this.AQI25.includes("Hazardous")){
                    
                    document.getElementById("p25").style.color = "rgba(255, 0, 106, 0.26)";
                }
            }
            if (ev.eventName === "AQIPM100StateChanged") {
                this.AQI100 = ev.eventData.message;
                if (this.AQI100.includes("Good")){
                    
                    document.getElementById("p100").style.color = "rgb(0, 255, 21)";
                }
                if (this.AQI100.includes("Moderate")){
                    
                    document.getElementById("p100").style.color = "rgb(255, 238, 0)";
                }
                if (this.AQI100.includes("Unhealthy for Sensitive Groups")){
                    
                    document.getElementById("p100").style.color = "rgb(255, 123, 0)";
                }
                if (this.AQI100.includes("Unhealthy")){
                    
                    document.getElementById("p100").style.color = "rgb(255, 0, 0)";
                }
                if (this.AQI100.includes("Very Unhealthy")){
                    
                    document.getElementById("p100").style.color = "rgb(234, 0, 255)";
                }
                if (this.AQI100.includes("Hazardous")){
                   
                    document.getElementById("p100").style.color = "rgba(255, 0, 106, 0.26)";
                }
            }
        },
        // call the function "blinkRed" in your backend
        blinkRed: function (nr) {
            var duration = 2000; // blinking duration in milliseconds
            axios.post(rootUrl + "/api/device/" + nr + "/function/blinkRed", { arg: duration })
                .then(response => {
                    // Handle the response from the server
                    console.log(response.data); // we could to something meaningful with the return value here ... 
                })
                .catch(error => {
                    alert("Could not call the function 'blinkRed' of device number " + nr + ".\n\n" + error)
                })
        },
        // get the value of the variable "buttonState" on the device with number "nr" from your backend
        getButtonState: function (nr) {
            axios.get(rootUrl + "/api/device/" + nr + "/variable/buttonState")
                .then(response => {
                    // Handle the response from the server
                    var buttonState = response.data.result;
                    if (nr === 0) {
                        this.buttonState_0 = buttonState;
                    }
                    else if (nr === 1) {
                        this.buttonState_1 = buttonState;
                    }
                    else {
                        console.log("unknown device number: " + nr);
                    }
                })
                .catch(error => {
                    alert("Could not read the button state of device number " + nr + ".\n\n" + error)
                })
        }
    }
})
