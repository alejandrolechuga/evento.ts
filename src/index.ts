
class EventBus { 
  /** Map of listeners */
  private listeners: Record<string, Function[]> = {};
  
  /**
   * Creates new array of listeners if there isn't one yet
   * @param eventName 
   */
  private register(eventName: string) {
    const exists = eventName in this.listeners;
    if (!exists) {
      this.listeners[eventName] = [];
    }
  }

  /**
   * Subscribes to event and fires on every event 
   * @param eventName 
   * @param callback 
   */
  public on(eventName: string, callback: Function) : Function {
    this.register(eventName);
    this.listeners[eventName].push(callback);
    return () => {
      this.off(eventName, callback);
    };
  }

  /**
   * Subscribes to event and only fires once
   * @param eventName 
   * @param callback 
   */
  public once(eventName: string, callback: Function) : Function {
    const unsubscribe = this.on(eventName, (payload: any) => {
      callback(payload);
      unsubscribe();
    });
    return unsubscribe;
  }

  /**
   * Unsubscribes to event by providing event name and callback
   * @param eventName 
   * @param callback 
   */
  public off(eventName: string, callback: Function) {
    const listeners = this.listeners[eventName];
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (listeners[index]) {
        listeners.splice(index, 1);
      }
    }
  }

  /**
   * Fires manually the event and passes a payload
   * @param eventName 
   * @param payload 
   */
  public dispatch(eventName: string, payload: any) {
    const listeners = this.listeners[eventName];
    if (listeners) {
      listeners.forEach((listener) => listener(payload));
    }
  }
}

export = EventBus;