"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BEHAVIOUR_TYPE_SPRING = exports.BEHAVIOUR_TYPE_SCALE = exports.BEHAVIOUR_TYPE_ROTATE = exports.BEHAVIOUR_TYPE_REPULSION = exports.BEHAVIOUR_TYPE_RANDOM_DRIFT = exports.BEHAVIOUR_TYPE_GRAVITY = exports.BEHAVIOUR_TYPE_FORCE = exports.BEHAVIOUR_TYPE_CROSS_ZONE = exports.BEHAVIOUR_TYPE_COLOR = exports.BEHAVIOUR_TYPE_COLLISION = exports.BEHAVIOUR_TYPE_ATTRACTION = exports.BEHAVIOUR_TYPE_ALPHA = exports.BEHAVIOUR_TYPE_ABSTRACT = void 0;
var BEHAVIOUR_TYPE_ABSTRACT = 'Behaviour';
exports.BEHAVIOUR_TYPE_ABSTRACT = BEHAVIOUR_TYPE_ABSTRACT;
var BEHAVIOUR_TYPE_ALPHA = 'Alpha';
exports.BEHAVIOUR_TYPE_ALPHA = BEHAVIOUR_TYPE_ALPHA;
var BEHAVIOUR_TYPE_ATTRACTION = 'Attraction';
exports.BEHAVIOUR_TYPE_ATTRACTION = BEHAVIOUR_TYPE_ATTRACTION;
var BEHAVIOUR_TYPE_COLLISION = 'Collision';
exports.BEHAVIOUR_TYPE_COLLISION = BEHAVIOUR_TYPE_COLLISION;
var BEHAVIOUR_TYPE_COLOR = 'Color';
exports.BEHAVIOUR_TYPE_COLOR = BEHAVIOUR_TYPE_COLOR;
var BEHAVIOUR_TYPE_CROSS_ZONE = 'CrossZone';
exports.BEHAVIOUR_TYPE_CROSS_ZONE = BEHAVIOUR_TYPE_CROSS_ZONE;
var BEHAVIOUR_TYPE_FORCE = 'Force';
exports.BEHAVIOUR_TYPE_FORCE = BEHAVIOUR_TYPE_FORCE;
var BEHAVIOUR_TYPE_GRAVITY = 'Gravity';
exports.BEHAVIOUR_TYPE_GRAVITY = BEHAVIOUR_TYPE_GRAVITY;
var BEHAVIOUR_TYPE_RANDOM_DRIFT = 'RandomDrift';
exports.BEHAVIOUR_TYPE_RANDOM_DRIFT = BEHAVIOUR_TYPE_RANDOM_DRIFT;
var BEHAVIOUR_TYPE_REPULSION = 'Repulsion';
exports.BEHAVIOUR_TYPE_REPULSION = BEHAVIOUR_TYPE_REPULSION;
var BEHAVIOUR_TYPE_ROTATE = 'Rotate';
exports.BEHAVIOUR_TYPE_ROTATE = BEHAVIOUR_TYPE_ROTATE;
var BEHAVIOUR_TYPE_SCALE = 'Scale';
exports.BEHAVIOUR_TYPE_SCALE = BEHAVIOUR_TYPE_SCALE;
var BEHAVIOUR_TYPE_SPRING = 'Spring';
exports.BEHAVIOUR_TYPE_SPRING = BEHAVIOUR_TYPE_SPRING;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iZWhhdmlvdXIvdHlwZXMuanMiXSwibmFtZXMiOlsiQkVIQVZJT1VSX1RZUEVfQUJTVFJBQ1QiLCJCRUhBVklPVVJfVFlQRV9BTFBIQSIsIkJFSEFWSU9VUl9UWVBFX0FUVFJBQ1RJT04iLCJCRUhBVklPVVJfVFlQRV9DT0xMSVNJT04iLCJCRUhBVklPVVJfVFlQRV9DT0xPUiIsIkJFSEFWSU9VUl9UWVBFX0NST1NTX1pPTkUiLCJCRUhBVklPVVJfVFlQRV9GT1JDRSIsIkJFSEFWSU9VUl9UWVBFX0dSQVZJVFkiLCJCRUhBVklPVVJfVFlQRV9SQU5ET01fRFJJRlQiLCJCRUhBVklPVVJfVFlQRV9SRVBVTFNJT04iLCJCRUhBVklPVVJfVFlQRV9ST1RBVEUiLCJCRUhBVklPVVJfVFlQRV9TQ0FMRSIsIkJFSEFWSU9VUl9UWVBFX1NQUklORyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQU8sSUFBTUEsdUJBQXVCLEdBQUcsV0FBaEM7O0FBQ0EsSUFBTUMsb0JBQW9CLEdBQUcsT0FBN0I7O0FBQ0EsSUFBTUMseUJBQXlCLEdBQUcsWUFBbEM7O0FBQ0EsSUFBTUMsd0JBQXdCLEdBQUcsV0FBakM7O0FBQ0EsSUFBTUMsb0JBQW9CLEdBQUcsT0FBN0I7O0FBQ0EsSUFBTUMseUJBQXlCLEdBQUcsV0FBbEM7O0FBQ0EsSUFBTUMsb0JBQW9CLEdBQUcsT0FBN0I7O0FBQ0EsSUFBTUMsc0JBQXNCLEdBQUcsU0FBL0I7O0FBQ0EsSUFBTUMsMkJBQTJCLEdBQUcsYUFBcEM7O0FBQ0EsSUFBTUMsd0JBQXdCLEdBQUcsV0FBakM7O0FBQ0EsSUFBTUMscUJBQXFCLEdBQUcsUUFBOUI7O0FBQ0EsSUFBTUMsb0JBQW9CLEdBQUcsT0FBN0I7O0FBQ0EsSUFBTUMscUJBQXFCLEdBQUcsUUFBOUIiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgQkVIQVZJT1VSX1RZUEVfQUJTVFJBQ1QgPSAnQmVoYXZpb3VyJztcbmV4cG9ydCBjb25zdCBCRUhBVklPVVJfVFlQRV9BTFBIQSA9ICdBbHBoYSc7XG5leHBvcnQgY29uc3QgQkVIQVZJT1VSX1RZUEVfQVRUUkFDVElPTiA9ICdBdHRyYWN0aW9uJztcbmV4cG9ydCBjb25zdCBCRUhBVklPVVJfVFlQRV9DT0xMSVNJT04gPSAnQ29sbGlzaW9uJztcbmV4cG9ydCBjb25zdCBCRUhBVklPVVJfVFlQRV9DT0xPUiA9ICdDb2xvcic7XG5leHBvcnQgY29uc3QgQkVIQVZJT1VSX1RZUEVfQ1JPU1NfWk9ORSA9ICdDcm9zc1pvbmUnO1xuZXhwb3J0IGNvbnN0IEJFSEFWSU9VUl9UWVBFX0ZPUkNFID0gJ0ZvcmNlJztcbmV4cG9ydCBjb25zdCBCRUhBVklPVVJfVFlQRV9HUkFWSVRZID0gJ0dyYXZpdHknO1xuZXhwb3J0IGNvbnN0IEJFSEFWSU9VUl9UWVBFX1JBTkRPTV9EUklGVCA9ICdSYW5kb21EcmlmdCc7XG5leHBvcnQgY29uc3QgQkVIQVZJT1VSX1RZUEVfUkVQVUxTSU9OID0gJ1JlcHVsc2lvbic7XG5leHBvcnQgY29uc3QgQkVIQVZJT1VSX1RZUEVfUk9UQVRFID0gJ1JvdGF0ZSc7XG5leHBvcnQgY29uc3QgQkVIQVZJT1VSX1RZUEVfU0NBTEUgPSAnU2NhbGUnO1xuZXhwb3J0IGNvbnN0IEJFSEFWSU9VUl9UWVBFX1NQUklORyA9ICdTcHJpbmcnO1xuIl19