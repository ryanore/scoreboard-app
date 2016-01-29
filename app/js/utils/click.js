let getClickEvent = function() {
  var evt = ('ontouchstart' in window || 'onmsgesturechange' in window ) ? 'touchstart' : 'click';
  return evt;
};

export default  getClickEvent()
