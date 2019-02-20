var headline = $("#headline");
var selection = $("#selector");

function set_headline (text) {
    headline.text(text);
}

function rerouteTracking() {
  var message = selection.val();

  set_headline("asked for " + message + "...");
  track_web_headline_change();
}

function send_message_to_native() {
    var message = selection.val();

    set_headline("asked for " + message + "...");
    if (window.webkit.messageHandlers) {
      window.webkit.messageHandlers.observe.postMessage(message);
    }
}

function track_web_headline_change() {
    window.dataLayer = window.dataLayer || [];
    if(!window.dataLayer) {
        sendErrorToNative("no dataLayer exists");
    }

    var action;
    if (isMobileDevice()) {
      action = "mobile"
    } else {
      action = "desktop"
    }

    var choice = selection.val();
    window.dataLayer.push({
      "event": "logHeadlineChangeWeb",
      "headline": choice,
      "customAction": action
    });
    logDataLayer();
}

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

function sendErrorToNative(msg) {
    if (window.webkit.messageHandlers) {
      window.webkit.messageHandlers.observe.postMessage(msg);
    }
}

function logDataLayer() {
    sendErrorToNative("The data layer contents are as follows...");
    for (i=0;i<dataLayer.length;i++){
        sendErrorToNative(dataLayer[i]);
    }
}

setTimeout(rerouteTracking, 1000);
selection.on("change", rerouteTracking);
