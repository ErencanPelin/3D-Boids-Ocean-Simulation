"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_CROSS_TYPE = exports.PARTICLE_LENGTH_SQ_THRESHOLD = exports.PARTICLE_ALPHA_THRESHOLD = exports.DEFAULT_RANDOM_DRIFT_DELAY = exports.DEFAULT_BEHAVIOUR_EASING_TYPE = exports.DEFAULT_BEHAVIOUR_EASING = exports.DEFAULT_ATTRACTION_FORCE_SCALAR = exports.DEFAULT_ATTRACITON_RADIUS = exports.DEFAULT_LIFE = void 0;

var _ease = require("../ease");

var DEFAULT_LIFE = Infinity;
exports.DEFAULT_LIFE = DEFAULT_LIFE;
var DEFAULT_ATTRACITON_RADIUS = 1000;
exports.DEFAULT_ATTRACITON_RADIUS = DEFAULT_ATTRACITON_RADIUS;
var DEFAULT_ATTRACTION_FORCE_SCALAR = 100;
exports.DEFAULT_ATTRACTION_FORCE_SCALAR = DEFAULT_ATTRACTION_FORCE_SCALAR;
var DEFAULT_BEHAVIOUR_EASING = _ease.easeLinear;
exports.DEFAULT_BEHAVIOUR_EASING = DEFAULT_BEHAVIOUR_EASING;
var DEFAULT_BEHAVIOUR_EASING_TYPE = 'easeLinear';
exports.DEFAULT_BEHAVIOUR_EASING_TYPE = DEFAULT_BEHAVIOUR_EASING_TYPE;
var DEFAULT_RANDOM_DRIFT_DELAY = 0.03;
exports.DEFAULT_RANDOM_DRIFT_DELAY = DEFAULT_RANDOM_DRIFT_DELAY;
var PARTICLE_ALPHA_THRESHOLD = 0.002;
exports.PARTICLE_ALPHA_THRESHOLD = PARTICLE_ALPHA_THRESHOLD;
var PARTICLE_LENGTH_SQ_THRESHOLD = 0.000004;
exports.PARTICLE_LENGTH_SQ_THRESHOLD = PARTICLE_LENGTH_SQ_THRESHOLD;
var DEFAULT_CROSS_TYPE = 'dead';
exports.DEFAULT_CROSS_TYPE = DEFAULT_CROSS_TYPE;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iZWhhdmlvdXIvY29uc3RhbnRzLmpzIl0sIm5hbWVzIjpbIkRFRkFVTFRfTElGRSIsIkluZmluaXR5IiwiREVGQVVMVF9BVFRSQUNJVE9OX1JBRElVUyIsIkRFRkFVTFRfQVRUUkFDVElPTl9GT1JDRV9TQ0FMQVIiLCJERUZBVUxUX0JFSEFWSU9VUl9FQVNJTkciLCJlYXNlTGluZWFyIiwiREVGQVVMVF9CRUhBVklPVVJfRUFTSU5HX1RZUEUiLCJERUZBVUxUX1JBTkRPTV9EUklGVF9ERUxBWSIsIlBBUlRJQ0xFX0FMUEhBX1RIUkVTSE9MRCIsIlBBUlRJQ0xFX0xFTkdUSF9TUV9USFJFU0hPTEQiLCJERUZBVUxUX0NST1NTX1RZUEUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFFTyxJQUFNQSxZQUFZLEdBQUdDLFFBQXJCOztBQUNBLElBQU1DLHlCQUF5QixHQUFHLElBQWxDOztBQUNBLElBQU1DLCtCQUErQixHQUFHLEdBQXhDOztBQUNBLElBQU1DLHdCQUF3QixHQUFHQyxnQkFBakM7O0FBQ0EsSUFBTUMsNkJBQTZCLEdBQUcsWUFBdEM7O0FBQ0EsSUFBTUMsMEJBQTBCLEdBQUcsSUFBbkM7O0FBQ0EsSUFBTUMsd0JBQXdCLEdBQUcsS0FBakM7O0FBQ0EsSUFBTUMsNEJBQTRCLEdBQUcsUUFBckM7O0FBQ0EsSUFBTUMsa0JBQWtCLEdBQUcsTUFBM0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBlYXNlTGluZWFyIH0gZnJvbSAnLi4vZWFzZSc7XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0xJRkUgPSBJbmZpbml0eTtcbmV4cG9ydCBjb25zdCBERUZBVUxUX0FUVFJBQ0lUT05fUkFESVVTID0gMTAwMDtcbmV4cG9ydCBjb25zdCBERUZBVUxUX0FUVFJBQ1RJT05fRk9SQ0VfU0NBTEFSID0gMTAwO1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfQkVIQVZJT1VSX0VBU0lORyA9IGVhc2VMaW5lYXI7XG5leHBvcnQgY29uc3QgREVGQVVMVF9CRUhBVklPVVJfRUFTSU5HX1RZUEUgPSAnZWFzZUxpbmVhcic7XG5leHBvcnQgY29uc3QgREVGQVVMVF9SQU5ET01fRFJJRlRfREVMQVkgPSAwLjAzO1xuZXhwb3J0IGNvbnN0IFBBUlRJQ0xFX0FMUEhBX1RIUkVTSE9MRCA9IDAuMDAyO1xuZXhwb3J0IGNvbnN0IFBBUlRJQ0xFX0xFTkdUSF9TUV9USFJFU0hPTEQgPSAwLjAwMDAwNDtcbmV4cG9ydCBjb25zdCBERUZBVUxUX0NST1NTX1RZUEUgPSAnZGVhZCc7XG4iXX0=