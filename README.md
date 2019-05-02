# evento.ts
evento is just another simple event bus library written in TypoScript

# Oh how do I install this ?

run
```
yarn add evento-ts
```

Oh but I don't like yarn
```
npm install evento-ts
```

How do I use it ?
```typescript
const Evento = require('evento-ts');
const EventBus = new Evento();

```

### `on` listens to events
 ```typescript
 EventBus.on('stuff', (payload: any) => {
  console.log(payload);
});

 ```
### `once` listens just once
 ```typescript
 EventBus.once('stuff', (payload: any) => {
  console.log(payload);
});

 ```
### `off` removes the listener
```typescript
// Somewhere in your code
EventBus.off('stuff', callback);
```

### `dispatch` fires an event
```typescript
// Somewhere in your code
EventBus.dispatch('stuff', 'take this!');
```

### `unsubscribe` ? similar to `off` easy way to remove listener
```typescript
const unsubscribe = EventBus.on('stuff', (payload: any) => {
  console.log(payload);
});
unsubscribe();
```
