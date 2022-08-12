const Async_Pause = (ms) => {
   return new Promise(resolve => setTimeout(resolve, ms))
}
type Values<T> = T[keyof T];

export {
   Async_Pause,
   Values,
}