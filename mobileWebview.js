var headline = $("#headline");
var selection = $("#selector");

function set_headline (text) {
    headline.text(text);
}

function rerouteTracking() {
  var kit = window.webkit;
  var handler = window.webkit.messageHandlers;
  var base = window.webkit.messageHandlers.firebase;

  sendErrorToNative("kit: " + kit + " handler: " + handler + " base: " + base);

  if (isMobileDevice()) {
    send_message_to_native();
  } else {
    track_web_headline_change();
  }
}

function send_message_to_native() {
    var message = selection.val();
//    var message = "superCoolMessage"
    set_headline("asked for " + message + "...");
    window.webkit.messageHandlers.observe.postMessage(message);
}

function track_web_headline_change() {
    window.dataLayer = window.dataLayer || [];
    if(!window.dataLayer) {
        sendErrorToNative("no dataLayer exists");
    }
    var choice = selection.val();
    window.dataLayer.push({
      "event": "logHeadlineChangeWeb",
      "headline": choice
    });
    window.dataLayer.push({
      "event": "altHeadlineChangeWeb",
      "headline": choice
    });
    logDataLayer();
}

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

function sendErrorToNative(msg) {
    window.webkit.messageHandlers.observe.postMessage(msg);
}

function logDataLayer() {
    sendErrorToNative("The data layer contents are as follows...");
    for (i=0;i<dataLayer.length;i++){
        sendErrorToNative(dataLayer[i]);
    }
}

setTimeout(rerouteTracking, 1000);
selection.on("change", rerouteTracking);




if (isMobileDevice()) {
    window.webkit.messageHandlers.observe.postMessage(data);
} else {

}
