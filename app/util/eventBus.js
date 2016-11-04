let handlers = {};

const eventBus = {
  on: function(eventName, eventHandler) {
    handlers[eventName] = handlers[eventName] || [];
    handlers[eventName].push(eventHandler);

    return () => {
      handlers[eventName] = handlers[eventName].filter(handler => handler !== eventHandler);
    };
  },

  trigger: function(eventName) {
    if (!handlers[eventName]) {
      return;
    }

    handlers[eventName].forEach(handler => handler());
  }
};

export default eventBus;
