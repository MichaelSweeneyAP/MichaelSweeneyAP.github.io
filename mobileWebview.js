var headline = $("#headline");
var selection = $("#selector");

function set_headline (text) {
    headline.text(text);
}

function rerouteTracking() {
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

    if (isMobileDevice()) {
      sendErrorToNative("value of window orientation = " + isMobileDevice())
        window.webkit.messageHandlers.observe.postMessage(message);
    } else {

    }
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

setTimeout(send_message_to_native, 1000);
setTimeout(track_web_headline_change, 1000);
selection.on("change", send_message_to_native);
selection.on("change", track_web_headline_change);
