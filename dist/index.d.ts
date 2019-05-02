declare class EventBus {
    /** Map of listeners */
    private listeners;
    /**
     * Creates new array of listeners if there isn't one yet
     * @param eventName
     */
    private register;
    /**
     * Subscribes to event and fires on every event
     * @param eventName
     * @param callback
     */
    on(eventName: string, callback: Function): Function;
    /**
     * Subscribes to event and only fires once
     * @param eventName
     * @param callback
     */
    once(eventName: string, callback: Function): Function;
    /**
     * Unsubscribes to event by providing event name and callback
     * @param eventName
     * @param callback
     */
    off(eventName: string, callback: Function): void;
    /**
     * Fires manually the event and passes a payload
     * @param eventName
     * @param payload
     */
    dispatch(eventName: string, payload?: any): void;
}
export = EventBus;
