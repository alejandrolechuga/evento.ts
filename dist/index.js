"use strict";
var EventBus = /** @class */ (function () {
    function EventBus() {
        /** Map of listeners */
        this.listeners = {};
    }
    /**
     * Creates new array of listeners if there isn't one yet
     * @param eventName
     */
    EventBus.prototype.register = function (eventName) {
        var exists = eventName in this.listeners;
        if (!exists) {
            this.listeners[eventName] = [];
        }
    };
    /**
     * Subscribes to event and fires on every event
     * @param eventName
     * @param callback
     */
    EventBus.prototype.on = function (eventName, callback) {
        var _this = this;
        this.register(eventName);
        this.listeners[eventName].push(callback);
        return function () {
            _this.off(eventName, callback);
        };
    };
    /**
     * Subscribes to event and only fires once
     * @param eventName
     * @param callback
     */
    EventBus.prototype.once = function (eventName, callback) {
        var unsubscribe = this.on(eventName, function (payload) {
            callback(payload);
            unsubscribe();
        });
        return unsubscribe;
    };
    /**
     * Unsubscribes to event by providing event name and callback
     * @param eventName
     * @param callback
     */
    EventBus.prototype.off = function (eventName, callback) {
        var listeners = this.listeners[eventName];
        if (listeners) {
            var index = listeners.indexOf(callback);
            if (listeners[index]) {
                listeners.splice(index, 1);
            }
        }
    };
    /**
     * Fires manually the event and passes a payload
     * @param eventName
     * @param payload
     */
    EventBus.prototype.dispatch = function (eventName, payload) {
        var listeners = this.listeners[eventName];
        if (listeners) {
            listeners.forEach(function (listener) { return listener(payload); });
        }
    };
    return EventBus;
}());
module.exports = EventBus;
