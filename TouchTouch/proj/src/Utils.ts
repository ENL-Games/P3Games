const Async_Pause = (ms) => {
   return new Promise(resolve => setTimeout(resolve, ms))
}

export {
   Async_Pause,
}