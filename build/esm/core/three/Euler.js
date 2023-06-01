import { Quaternion } from './Quaternion.js';
import { Vector3 } from './Vector3.js';
import { Matrix4 } from './Matrix4.js';
import { _Math } from './Math.js';
/**
 * @author mrdoob / http://mrdoob.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author bhouston / http://clara.io
 */

function Euler(x, y, z, order) {
  this._x = x || 0;
  this._y = y || 0;
  this._z = z || 0;
  this._order = order || Euler.DefaultOrder;
}

Euler.RotationOrders = ['XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX'];
Euler.DefaultOrder = 'XYZ';
Object.defineProperties(Euler.prototype, {
  x: {
    get: function () {
      return this._x;
    },
    set: function (value) {
      this._x = value;

      this._onChangeCallback();
    }
  },
  y: {
    get: function () {
      return this._y;
    },
    set: function (value) {
      this._y = value;

      this._onChangeCallback();
    }
  },
  z: {
    get: function () {
      return this._z;
    },
    set: function (value) {
      this._z = value;

      this._onChangeCallback();
    }
  },
  order: {
    get: function () {
      return this._order;
    },
    set: function (value) {
      this._order = value;

      this._onChangeCallback();
    }
  }
});
Object.assign(Euler.prototype, {
  isEuler: true,
  set: function (x, y, z, order) {
    this._x = x;
    this._y = y;
    this._z = z;
    this._order = order || this._order;

    this._onChangeCallback();

    return this;
  },
  clone: function () {
    return new this.constructor(this._x, this._y, this._z, this._order);
  },
  copy: function (euler) {
    this._x = euler._x;
    this._y = euler._y;
    this._z = euler._z;
    this._order = euler._order;

    this._onChangeCallback();

    return this;
  },
  setFromRotationMatrix: function (m, order, update) {
    var clamp = _Math.clamp; // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

    var te = m.elements;
    var m11 = te[0],
        m12 = te[4],
        m13 = te[8];
    var m21 = te[1],
        m22 = te[5],
        m23 = te[9];
    var m31 = te[2],
        m32 = te[6],
        m33 = te[10];
    order = order || this._order;

    if (order === 'XYZ') {
      this._y = Math.asin(clamp(m13, -1, 1));

      if (Math.abs(m13) < 0.99999) {
        this._x = Math.atan2(-m23, m33);
        this._z = Math.atan2(-m12, m11);
      } else {
        this._x = Math.atan2(m32, m22);
        this._z = 0;
      }
    } else if (order === 'YXZ') {
      this._x = Math.asin(-clamp(m23, -1, 1));

      if (Math.abs(m23) < 0.99999) {
        this._y = Math.atan2(m13, m33);
        this._z = Math.atan2(m21, m22);
      } else {
        this._y = Math.atan2(-m31, m11);
        this._z = 0;
      }
    } else if (order === 'ZXY') {
      this._x = Math.asin(clamp(m32, -1, 1));

      if (Math.abs(m32) < 0.99999) {
        this._y = Math.atan2(-m31, m33);
        this._z = Math.atan2(-m12, m22);
      } else {
        this._y = 0;
        this._z = Math.atan2(m21, m11);
      }
    } else if (order === 'ZYX') {
      this._y = Math.asin(-clamp(m31, -1, 1));

      if (Math.abs(m31) < 0.99999) {
        this._x = Math.atan2(m32, m33);
        this._z = Math.atan2(m21, m11);
      } else {
        this._x = 0;
        this._z = Math.atan2(-m12, m22);
      }
    } else if (order === 'YZX') {
      this._z = Math.asin(clamp(m21, -1, 1));

      if (Math.abs(m21) < 0.99999) {
        this._x = Math.atan2(-m23, m22);
        this._y = Math.atan2(-m31, m11);
      } else {
        this._x = 0;
        this._y = Math.atan2(m13, m33);
      }
    } else if (order === 'XZY') {
      this._z = Math.asin(-clamp(m12, -1, 1));

      if (Math.abs(m12) < 0.99999) {
        this._x = Math.atan2(m32, m22);
        this._y = Math.atan2(m13, m11);
      } else {
        this._x = Math.atan2(-m23, m33);
        this._y = 0;
      }
    } else {
      console.warn('THREE.Euler: .setFromRotationMatrix() given unsupported order: ' + order);
    }

    this._order = order;
    if (update !== false) this._onChangeCallback();
    return this;
  },
  setFromQuaternion: function () {
    var matrix = new Matrix4();
    return function setFromQuaternion(q, order, update) {
      matrix.makeRotationFromQuaternion(q);
      return this.setFromRotationMatrix(matrix, order, update);
    };
  }(),
  setFromVector3: function (v, order) {
    return this.set(v.x, v.y, v.z, order || this._order);
  },
  reorder: function () {
    // WARNING: this discards revolution information -bhouston
    var q = new Quaternion();
    return function reorder(newOrder) {
      q.setFromEuler(this);
      return this.setFromQuaternion(q, newOrder);
    };
  }(),
  equals: function (euler) {
    return euler._x === this._x && euler._y === this._y && euler._z === this._z && euler._order === this._order;
  },
  fromArray: function (array) {
    this._x = array[0];
    this._y = array[1];
    this._z = array[2];
    if (array[3] !== undefined) this._order = array[3];

    this._onChangeCallback();

    return this;
  },
  toArray: function (array, offset) {
    if (array === undefined) array = [];
    if (offset === undefined) offset = 0;
    array[offset] = this._x;
    array[offset + 1] = this._y;
    array[offset + 2] = this._z;
    array[offset + 3] = this._order;
    return array;
  },
  toVector3: function (optionalResult) {
    if (optionalResult) {
      return optionalResult.set(this._x, this._y, this._z);
    } else {
      return new Vector3(this._x, this._y, this._z);
    }
  },
  _onChange: function (callback) {
    this._onChangeCallback = callback;
    return this;
  },
  _onChangeCallback: function () {}
});
export { Euler };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb3JlL3RocmVlL0V1bGVyLmpzIl0sIm5hbWVzIjpbIlF1YXRlcm5pb24iLCJWZWN0b3IzIiwiTWF0cml4NCIsIl9NYXRoIiwiRXVsZXIiLCJ4IiwieSIsInoiLCJvcmRlciIsIl94IiwiX3kiLCJfeiIsIl9vcmRlciIsIkRlZmF1bHRPcmRlciIsIlJvdGF0aW9uT3JkZXJzIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydGllcyIsInByb3RvdHlwZSIsImdldCIsInNldCIsInZhbHVlIiwiX29uQ2hhbmdlQ2FsbGJhY2siLCJhc3NpZ24iLCJpc0V1bGVyIiwiY2xvbmUiLCJjb25zdHJ1Y3RvciIsImNvcHkiLCJldWxlciIsInNldEZyb21Sb3RhdGlvbk1hdHJpeCIsIm0iLCJ1cGRhdGUiLCJjbGFtcCIsInRlIiwiZWxlbWVudHMiLCJtMTEiLCJtMTIiLCJtMTMiLCJtMjEiLCJtMjIiLCJtMjMiLCJtMzEiLCJtMzIiLCJtMzMiLCJNYXRoIiwiYXNpbiIsImFicyIsImF0YW4yIiwiY29uc29sZSIsIndhcm4iLCJzZXRGcm9tUXVhdGVybmlvbiIsIm1hdHJpeCIsInEiLCJtYWtlUm90YXRpb25Gcm9tUXVhdGVybmlvbiIsInNldEZyb21WZWN0b3IzIiwidiIsInJlb3JkZXIiLCJuZXdPcmRlciIsInNldEZyb21FdWxlciIsImVxdWFscyIsImZyb21BcnJheSIsImFycmF5IiwidW5kZWZpbmVkIiwidG9BcnJheSIsIm9mZnNldCIsInRvVmVjdG9yMyIsIm9wdGlvbmFsUmVzdWx0IiwiX29uQ2hhbmdlIiwiY2FsbGJhY2siXSwibWFwcGluZ3MiOiJBQUFBLFNBQVNBLFVBQVQsUUFBMkIsaUJBQTNCO0FBQ0EsU0FBU0MsT0FBVCxRQUF3QixjQUF4QjtBQUNBLFNBQVNDLE9BQVQsUUFBd0IsY0FBeEI7QUFDQSxTQUFTQyxLQUFULFFBQXNCLFdBQXRCO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTQyxLQUFULENBQWdCQyxD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LEtBQUtWLEVBQXpCLEVBQTZCLEtBQUtDLEVBQWxDLEVBQXNDLEtBQUtDLEVBQTNDLENBQVA7QUFFQSxLQUpELE1BSU87QUFFTixhQUFPLElBQUlWLE9BQUosQ0FBYSxLQUFLUSxFQUFsQixFQUFzQixLQUFLQyxFQUEzQixFQUErQixLQUFLQyxFQUFwQyxDQUFQO0FBRUE7QUFFRCxHQWhQOEI7QUFrUC9CdUQsRUFBQUEsU0FBUyxFQUFFLFVBQVdDLFFBQVgsRUFBc0I7QUFFaEMsU0FBSzlDLGlCQUFMLEdBQXlCOEMsUUFBekI7QUFFQSxXQUFPLElBQVA7QUFFQSxHQXhQOEI7QUEwUC9COUMsRUFBQUEsaUJBQWlCLEVBQUUsWUFBWSxDQUFFO0FBMVBGLENBQWhDO0FBK1BBLFNBQVNqQixLQUFUIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUXVhdGVybmlvbiB9IGZyb20gJy4vUXVhdGVybmlvbi5qcyc7XG5pbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi9WZWN0b3IzLmpzJztcbmltcG9ydCB7IE1hdHJpeDQgfSBmcm9tICcuL01hdHJpeDQuanMnO1xuaW1wb3J0IHsgX01hdGggfSBmcm9tICcuL01hdGguanMnO1xuXG4vKipcbiAqIEBhdXRob3IgbXJkb29iIC8gaHR0cDovL21yZG9vYi5jb20vXG4gKiBAYXV0aG9yIFdlc3RMYW5nbGV5IC8gaHR0cDovL2dpdGh1Yi5jb20vV2VzdExhbmdsZXlcbiAqIEBhdXRob3IgYmhvdXN0b24gLyBodHRwOi8vY2xhcmEuaW9cbiAqL1xuXG5mdW5jdGlvbiBFdWxlciggeCwgeSwgeiwgb3JkZXIgKSB7XG5cblx0dGhpcy5feCA9IHggfHwgMDtcblx0dGhpcy5feSA9IHkgfHwgMDtcblx0dGhpcy5feiA9IHogfHwgMDtcblx0dGhpcy5fb3JkZXIgPSBvcmRlciB8fCBFdWxlci5EZWZhdWx0T3JkZXI7XG5cbn1cblxuRXVsZXIuUm90YXRpb25PcmRlcnMgPSBbICdYWVonLCAnWVpYJywgJ1pYWScsICdYWlknLCAnWVhaJywgJ1pZWCcgXTtcblxuRXVsZXIuRGVmYXVsdE9yZGVyID0gJ1hZWic7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKCBFdWxlci5wcm90b3R5cGUsIHtcblxuXHR4OiB7XG5cblx0XHRnZXQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0cmV0dXJuIHRoaXMuX3g7XG5cblx0XHR9LFxuXG5cdFx0c2V0OiBmdW5jdGlvbiAoIHZhbHVlICkge1xuXG5cdFx0XHR0aGlzLl94ID0gdmFsdWU7XG5cdFx0XHR0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKCk7XG5cblx0XHR9XG5cblx0fSxcblxuXHR5OiB7XG5cblx0XHRnZXQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0cmV0dXJuIHRoaXMuX3k7XG5cblx0XHR9LFxuXG5cdFx0c2V0OiBmdW5jdGlvbiAoIHZhbHVlICkge1xuXG5cdFx0XHR0aGlzLl95ID0gdmFsdWU7XG5cdFx0XHR0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKCk7XG5cblx0XHR9XG5cblx0fSxcblxuXHR6OiB7XG5cblx0XHRnZXQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0cmV0dXJuIHRoaXMuX3o7XG5cblx0XHR9LFxuXG5cdFx0c2V0OiBmdW5jdGlvbiAoIHZhbHVlICkge1xuXG5cdFx0XHR0aGlzLl96ID0gdmFsdWU7XG5cdFx0XHR0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKCk7XG5cblx0XHR9XG5cblx0fSxcblxuXHRvcmRlcjoge1xuXG5cdFx0Z2V0OiBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdHJldHVybiB0aGlzLl9vcmRlcjtcblxuXHRcdH0sXG5cblx0XHRzZXQ6IGZ1bmN0aW9uICggdmFsdWUgKSB7XG5cblx0XHRcdHRoaXMuX29yZGVyID0gdmFsdWU7XG5cdFx0XHR0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKCk7XG5cblx0XHR9XG5cblx0fVxuXG59ICk7XG5cbk9iamVjdC5hc3NpZ24oIEV1bGVyLnByb3RvdHlwZSwge1xuXG5cdGlzRXVsZXI6IHRydWUsXG5cblx0c2V0OiBmdW5jdGlvbiAoIHgsIHksIHosIG9yZGVyICkge1xuXG5cdFx0dGhpcy5feCA9IHg7XG5cdFx0dGhpcy5feSA9IHk7XG5cdFx0dGhpcy5feiA9IHo7XG5cdFx0dGhpcy5fb3JkZXIgPSBvcmRlciB8fCB0aGlzLl9vcmRlcjtcblxuXHRcdHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2soKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0Y2xvbmU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3RvciggdGhpcy5feCwgdGhpcy5feSwgdGhpcy5feiwgdGhpcy5fb3JkZXIgKTtcblxuXHR9LFxuXG5cdGNvcHk6IGZ1bmN0aW9uICggZXVsZXIgKSB7XG5cblx0XHR0aGlzLl94ID0gZXVsZXIuX3g7XG5cdFx0dGhpcy5feSA9IGV1bGVyLl95O1xuXHRcdHRoaXMuX3ogPSBldWxlci5fejtcblx0XHR0aGlzLl9vcmRlciA9IGV1bGVyLl9vcmRlcjtcblxuXHRcdHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2soKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0RnJvbVJvdGF0aW9uTWF0cml4OiBmdW5jdGlvbiAoIG0sIG9yZGVyLCB1cGRhdGUgKSB7XG5cblx0XHR2YXIgY2xhbXAgPSBfTWF0aC5jbGFtcDtcblxuXHRcdC8vIGFzc3VtZXMgdGhlIHVwcGVyIDN4MyBvZiBtIGlzIGEgcHVyZSByb3RhdGlvbiBtYXRyaXggKGkuZSwgdW5zY2FsZWQpXG5cblx0XHR2YXIgdGUgPSBtLmVsZW1lbnRzO1xuXHRcdHZhciBtMTEgPSB0ZVsgMCBdLCBtMTIgPSB0ZVsgNCBdLCBtMTMgPSB0ZVsgOCBdO1xuXHRcdHZhciBtMjEgPSB0ZVsgMSBdLCBtMjIgPSB0ZVsgNSBdLCBtMjMgPSB0ZVsgOSBdO1xuXHRcdHZhciBtMzEgPSB0ZVsgMiBdLCBtMzIgPSB0ZVsgNiBdLCBtMzMgPSB0ZVsgMTAgXTtcblxuXHRcdG9yZGVyID0gb3JkZXIgfHwgdGhpcy5fb3JkZXI7XG5cblx0XHRpZiAoIG9yZGVyID09PSAnWFlaJyApIHtcblxuXHRcdFx0dGhpcy5feSA9IE1hdGguYXNpbiggY2xhbXAoIG0xMywgLSAxLCAxICkgKTtcblxuXHRcdFx0aWYgKCBNYXRoLmFicyggbTEzICkgPCAwLjk5OTk5ICkge1xuXG5cdFx0XHRcdHRoaXMuX3ggPSBNYXRoLmF0YW4yKCAtIG0yMywgbTMzICk7XG5cdFx0XHRcdHRoaXMuX3ogPSBNYXRoLmF0YW4yKCAtIG0xMiwgbTExICk7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0dGhpcy5feCA9IE1hdGguYXRhbjIoIG0zMiwgbTIyICk7XG5cdFx0XHRcdHRoaXMuX3ogPSAwO1xuXG5cdFx0XHR9XG5cblx0XHR9IGVsc2UgaWYgKCBvcmRlciA9PT0gJ1lYWicgKSB7XG5cblx0XHRcdHRoaXMuX3ggPSBNYXRoLmFzaW4oIC0gY2xhbXAoIG0yMywgLSAxLCAxICkgKTtcblxuXHRcdFx0aWYgKCBNYXRoLmFicyggbTIzICkgPCAwLjk5OTk5ICkge1xuXG5cdFx0XHRcdHRoaXMuX3kgPSBNYXRoLmF0YW4yKCBtMTMsIG0zMyApO1xuXHRcdFx0XHR0aGlzLl96ID0gTWF0aC5hdGFuMiggbTIxLCBtMjIgKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHR0aGlzLl95ID0gTWF0aC5hdGFuMiggLSBtMzEsIG0xMSApO1xuXHRcdFx0XHR0aGlzLl96ID0gMDtcblxuXHRcdFx0fVxuXG5cdFx0fSBlbHNlIGlmICggb3JkZXIgPT09ICdaWFknICkge1xuXG5cdFx0XHR0aGlzLl94ID0gTWF0aC5hc2luKCBjbGFtcCggbTMyLCAtIDEsIDEgKSApO1xuXG5cdFx0XHRpZiAoIE1hdGguYWJzKCBtMzIgKSA8IDAuOTk5OTkgKSB7XG5cblx0XHRcdFx0dGhpcy5feSA9IE1hdGguYXRhbjIoIC0gbTMxLCBtMzMgKTtcblx0XHRcdFx0dGhpcy5feiA9IE1hdGguYXRhbjIoIC0gbTEyLCBtMjIgKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHR0aGlzLl95ID0gMDtcblx0XHRcdFx0dGhpcy5feiA9IE1hdGguYXRhbjIoIG0yMSwgbTExICk7XG5cblx0XHRcdH1cblxuXHRcdH0gZWxzZSBpZiAoIG9yZGVyID09PSAnWllYJyApIHtcblxuXHRcdFx0dGhpcy5feSA9IE1hdGguYXNpbiggLSBjbGFtcCggbTMxLCAtIDEsIDEgKSApO1xuXG5cdFx0XHRpZiAoIE1hdGguYWJzKCBtMzEgKSA8IDAuOTk5OTkgKSB7XG5cblx0XHRcdFx0dGhpcy5feCA9IE1hdGguYXRhbjIoIG0zMiwgbTMzICk7XG5cdFx0XHRcdHRoaXMuX3ogPSBNYXRoLmF0YW4yKCBtMjEsIG0xMSApO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdHRoaXMuX3ggPSAwO1xuXHRcdFx0XHR0aGlzLl96ID0gTWF0aC5hdGFuMiggLSBtMTIsIG0yMiApO1xuXG5cdFx0XHR9XG5cblx0XHR9IGVsc2UgaWYgKCBvcmRlciA9PT0gJ1laWCcgKSB7XG5cblx0XHRcdHRoaXMuX3ogPSBNYXRoLmFzaW4oIGNsYW1wKCBtMjEsIC0gMSwgMSApICk7XG5cblx0XHRcdGlmICggTWF0aC5hYnMoIG0yMSApIDwgMC45OTk5OSApIHtcblxuXHRcdFx0XHR0aGlzLl94ID0gTWF0aC5hdGFuMiggLSBtMjMsIG0yMiApO1xuXHRcdFx0XHR0aGlzLl95ID0gTWF0aC5hdGFuMiggLSBtMzEsIG0xMSApO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdHRoaXMuX3ggPSAwO1xuXHRcdFx0XHR0aGlzLl95ID0gTWF0aC5hdGFuMiggbTEzLCBtMzMgKTtcblxuXHRcdFx0fVxuXG5cdFx0fSBlbHNlIGlmICggb3JkZXIgPT09ICdYWlknICkge1xuXG5cdFx0XHR0aGlzLl96ID0gTWF0aC5hc2luKCAtIGNsYW1wKCBtMTIsIC0gMSwgMSApICk7XG5cblx0XHRcdGlmICggTWF0aC5hYnMoIG0xMiApIDwgMC45OTk5OSApIHtcblxuXHRcdFx0XHR0aGlzLl94ID0gTWF0aC5hdGFuMiggbTMyLCBtMjIgKTtcblx0XHRcdFx0dGhpcy5feSA9IE1hdGguYXRhbjIoIG0xMywgbTExICk7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0dGhpcy5feCA9IE1hdGguYXRhbjIoIC0gbTIzLCBtMzMgKTtcblx0XHRcdFx0dGhpcy5feSA9IDA7XG5cblx0XHRcdH1cblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLkV1bGVyOiAuc2V0RnJvbVJvdGF0aW9uTWF0cml4KCkgZ2l2ZW4gdW5zdXBwb3J0ZWQgb3JkZXI6ICcgKyBvcmRlciApO1xuXG5cdFx0fVxuXG5cdFx0dGhpcy5fb3JkZXIgPSBvcmRlcjtcblxuXHRcdGlmICggdXBkYXRlICE9PSBmYWxzZSApIHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2soKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0RnJvbVF1YXRlcm5pb246IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciBtYXRyaXggPSBuZXcgTWF0cml4NCgpO1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uIHNldEZyb21RdWF0ZXJuaW9uKCBxLCBvcmRlciwgdXBkYXRlICkge1xuXG5cdFx0XHRtYXRyaXgubWFrZVJvdGF0aW9uRnJvbVF1YXRlcm5pb24oIHEgKTtcblxuXHRcdFx0cmV0dXJuIHRoaXMuc2V0RnJvbVJvdGF0aW9uTWF0cml4KCBtYXRyaXgsIG9yZGVyLCB1cGRhdGUgKTtcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cdHNldEZyb21WZWN0b3IzOiBmdW5jdGlvbiAoIHYsIG9yZGVyICkge1xuXG5cdFx0cmV0dXJuIHRoaXMuc2V0KCB2LngsIHYueSwgdi56LCBvcmRlciB8fCB0aGlzLl9vcmRlciApO1xuXG5cdH0sXG5cblx0cmVvcmRlcjogZnVuY3Rpb24gKCkge1xuXG5cdFx0Ly8gV0FSTklORzogdGhpcyBkaXNjYXJkcyByZXZvbHV0aW9uIGluZm9ybWF0aW9uIC1iaG91c3RvblxuXG5cdFx0dmFyIHEgPSBuZXcgUXVhdGVybmlvbigpO1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uIHJlb3JkZXIoIG5ld09yZGVyICkge1xuXG5cdFx0XHRxLnNldEZyb21FdWxlciggdGhpcyApO1xuXG5cdFx0XHRyZXR1cm4gdGhpcy5zZXRGcm9tUXVhdGVybmlvbiggcSwgbmV3T3JkZXIgKTtcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cdGVxdWFsczogZnVuY3Rpb24gKCBldWxlciApIHtcblxuXHRcdHJldHVybiAoIGV1bGVyLl94ID09PSB0aGlzLl94ICkgJiYgKCBldWxlci5feSA9PT0gdGhpcy5feSApICYmICggZXVsZXIuX3ogPT09IHRoaXMuX3ogKSAmJiAoIGV1bGVyLl9vcmRlciA9PT0gdGhpcy5fb3JkZXIgKTtcblxuXHR9LFxuXG5cdGZyb21BcnJheTogZnVuY3Rpb24gKCBhcnJheSApIHtcblxuXHRcdHRoaXMuX3ggPSBhcnJheVsgMCBdO1xuXHRcdHRoaXMuX3kgPSBhcnJheVsgMSBdO1xuXHRcdHRoaXMuX3ogPSBhcnJheVsgMiBdO1xuXHRcdGlmICggYXJyYXlbIDMgXSAhPT0gdW5kZWZpbmVkICkgdGhpcy5fb3JkZXIgPSBhcnJheVsgMyBdO1xuXG5cdFx0dGhpcy5fb25DaGFuZ2VDYWxsYmFjaygpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHR0b0FycmF5OiBmdW5jdGlvbiAoIGFycmF5LCBvZmZzZXQgKSB7XG5cblx0XHRpZiAoIGFycmF5ID09PSB1bmRlZmluZWQgKSBhcnJheSA9IFtdO1xuXHRcdGlmICggb2Zmc2V0ID09PSB1bmRlZmluZWQgKSBvZmZzZXQgPSAwO1xuXG5cdFx0YXJyYXlbIG9mZnNldCBdID0gdGhpcy5feDtcblx0XHRhcnJheVsgb2Zmc2V0ICsgMSBdID0gdGhpcy5feTtcblx0XHRhcnJheVsgb2Zmc2V0ICsgMiBdID0gdGhpcy5fejtcblx0XHRhcnJheVsgb2Zmc2V0ICsgMyBdID0gdGhpcy5fb3JkZXI7XG5cblx0XHRyZXR1cm4gYXJyYXk7XG5cblx0fSxcblxuXHR0b1ZlY3RvcjM6IGZ1bmN0aW9uICggb3B0aW9uYWxSZXN1bHQgKSB7XG5cblx0XHRpZiAoIG9wdGlvbmFsUmVzdWx0ICkge1xuXG5cdFx0XHRyZXR1cm4gb3B0aW9uYWxSZXN1bHQuc2V0KCB0aGlzLl94LCB0aGlzLl95LCB0aGlzLl96ICk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRyZXR1cm4gbmV3IFZlY3RvcjMoIHRoaXMuX3gsIHRoaXMuX3ksIHRoaXMuX3ogKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdF9vbkNoYW5nZTogZnVuY3Rpb24gKCBjYWxsYmFjayApIHtcblxuXHRcdHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2sgPSBjYWxsYmFjaztcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0X29uQ2hhbmdlQ2FsbGJhY2s6IGZ1bmN0aW9uICgpIHt9XG5cbn0gKTtcblxuXG5leHBvcnQgeyBFdWxlciB9OyJdfQ==