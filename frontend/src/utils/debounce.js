/**
 * implement debounce function
 * explain: `func` will be called after `delay` ms. if `func` is called again before `delay` ms, the timer will be reset
 * @param func
 * @param delay
 */
export default function debounce(func, delay) {
  // your code here
  let timerID;
  return function (...args) {
    // ...args catches whatever parameters that are passed into func
    if (timerID) {
      // a timer has been set
      clearTimeout(timerID);
    }

    timerID = setTimeout(() => {
      func.apply(this, args); // this points to the returing function
      timerID = null; // reset timerID every time a new timer is set
    }, delay);
  };
}
