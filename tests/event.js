let assert = require('assert');
let sinon = require('sinon');
let Evento = require('../src/');


describe('Event', function() {
  let evento = null;
  beforeEach(function () {
    evento = new Evento();
  });

  it('should register new event group', () => {
    const eventName = 'gigi';
    evento.on(eventName, () => {});
    assert.ok(eventName in evento.listeners);
  });

  it('should subscribe listeners', () => {
    const eventName = 'yoyo';
    const callback = () => {};
    evento.on(eventName, callback);
    assert.ok(evento.listeners[eventName][0] === callback);
  });

  it('should unsubscribe listener', () => {
    const eventName = 'yoyo';
    const callback = () => {};
    const unsubscribe = evento.on(eventName, callback);
    assert.ok(evento.listeners[eventName][0] === callback);
    unsubscribe();
    assert.ok(evento.listeners[eventName].length === 0);
  });

  it('should dispatch event', () => {
    const eventName = 'yoyo';
    const callback = sinon.spy();
    evento.on(eventName, callback);
    evento.dispatch(eventName, {});
    assert.ok(callback.calledOnce);
  });

  it('should listen once', () => {
    const eventName = 'yoyo';
    const callback = sinon.spy();
    evento.once(eventName, callback);
    evento.dispatch(eventName, {});
    evento.dispatch(eventName, {});
    evento.dispatch(eventName, {});
    assert.ok(callback.calledOnce);
  });
});