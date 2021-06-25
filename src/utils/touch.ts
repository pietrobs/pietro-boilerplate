const isTouchSupported = () => {
  const anyWindow: any = window;
  const isTouchCapable =
    "ontouchstart" in window ||
    (anyWindow.DocumentTouch && document instanceof anyWindow.DocumentTouch) ||
    navigator.maxTouchPoints > 0 ||
    window.navigator.msMaxTouchPoints > 0;

  return isTouchCapable;
};

export default isTouchSupported;
