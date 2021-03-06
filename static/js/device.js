(function(ns) {
    "use strict";

    function Device(deviceInfo) {
        this.deviceInfo = deviceInfo;
        this.dom = null;
    }

    Device.prototype = {
        augmentDOM: function(dom){
            // should be implemented by children
        },

        getDOM: function (callback) {
            $.get("/" + this.deviceInfo.type + "/static/partials/dashboardItem.html", $.proxy(function (template) {
                this.dom = $(Mustache.render(template, this.deviceInfo));

                this.augmentDOM();

                callback.call(this, this.dom);
            }, this));
        }
    };

    ns.Device = Device;
    ns.registeredDevice = {};
}(io.pible));
