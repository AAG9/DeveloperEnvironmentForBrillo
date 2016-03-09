var messaging;
var cb = new ClearBlade();

var part7Event = function() {

    var callback = function(data) {
        document.getElementById("part7SubscribeButton").disabled=false;
        document.getElementById("part7PublishButton").disabled=true;
        // showView("part7b");
    }
    messaging = cb.ClearBlade.Messaging(config, success);
    var initOptions = {
        URI : "https://rtp.clearblade.com",
        messagingURI : "rtp.clearblade.com",
        useMQTT: true,
        messagingPort: 8904,   
        cleanSession: true,
        systemKey: "c8f5baed0ab4adf9e6fea491f125",
        systemSecret: "C8F5BAED0AB68FFB81FB95C9C6E001",
        //onSuccess: part7SubscriptionSuccess  
    }
    messaging = cb.Messaging(initOptions, callback);
    // messaging = cb.Messaging({}, callback);
    part7SubscribeEvent();
};

var part7MessageArriveEvent = function(message) {
    var node = document.createElement("div");                
    var textnode = document.createTextNode(message);         // Create a text node
    node.appendChild(textnode);
    document.getElementById("part7Content").appendChild(node);
    alert("messageArrived: "+message);
    
};

var part7SubscribeEvent = function() {
    messaging.subscribe("/Weave", {}, part7MessageArriveEvent);
    document.getElementById("part7SubscribeButton").disabled=true;
    document.getElementById("part7PublishButton").disabled=false;
    
};

var part7PublishEvent = function() {
    var textVal = document.getElementById("part7PublishInput").value;
    var msg = {part:"part7",ts:new Date(),value:textVal};
    messaging.publish("/Weave", JSON.stringify(msg) );
    
};
