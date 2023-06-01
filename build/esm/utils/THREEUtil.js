import { Vector3 } from '../core/three/';
export default {
  toScreenPos: function () {
    var vector = new Vector3();
    return function (pos, camera, canvas) {
      vector.copy(pos); // map to normalized device coordinate (NDC) space

      vector.project(camera); // map to 2D screen space

      vector.x = Math.round((vector.x + 1) * canvas.width / 2);
      vector.y = Math.round((-vector.y + 1) * canvas.height / 2);
      vector.z = 0;
      return vector;
    };
  }(),
  toSpacePos: function () {
    var vector = new Vector3(),
        dir = new Vector3(),
        distance;
    return function (pos, camera, canvas) {
      vector.set(pos.x / canvas.width * 2 - 1, -(pos.y / canvas.height) * 2 + 1, 0.5);
      vector.unproject(camera);
      dir.copy(vector.sub(camera.position).normalize());
      distance = -camera.position.z / dir.z;
      vector.copy(camera.position);
      vector.add(dir.multiplyScalar(distance));
      return vector;
    };
  }()
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9USFJFRVV0aWwuanMiXSwibmFtZXMiOlsiVmVjdG9yMyIsInRvU2NyZWVuUG9zIiwidmVjdG9yIiwicG9zIiwiY2FtZXJhIiwiY2FudmFzIiwiY29weSIsInByb2plY3QiLCJ4IiwiTWF0aCIsInJvdW5kIiwid2lkdGgiLCJ5IiwiaGVpZ2h0IiwieiIsInRvU3BhY2VQb3MiLCJkaXIiLCJkaXN0YW5jZSIsInNldCIsInVucHJvamVjdCIsInN1YiIsInBvc2l0aW9uIiwibm9ybWFsaXplIiwiYWRkIiwibXVsdGlwbHlTY2FsYXIiXSwibWFwcGluZ3MiOiJBQUFBLFNBQVNBLE9BQVQsUUFBd0IsZ0JBQXhCO0FBRUEsZUFBZTtBQUNiQyxFQUFBQSxXQUFXLEVBQUcsWUFBVztBQUN2QixRQUFJQyxNQUFNLEdBQUcsSUFBSUYsT0FBSixFQUFiO0FBRUEsV0FBTyxVQUFTRyxHQUFULEVBQWNDLE1BQWQsRUFBc0JDLE1BQXRCLEVBQThCO0FBQ25DSCxNQUFBQSxNQUFNLENBQUNJLElBQVAsQ0FBWUgsR0FBWixFQURtQyxDQUVuQzs7QUFDQUQsTUFBQUEsTUFBTSxDQUFDSyxPQUFQLENBQWVILE1BQWYsRUFIbUMsQ0FJbkM7O0FBQ0FGLE1BQUFBLE1BQU0sQ0FBQ00sQ0FBUCxHQUFXQyxJQUFJLENBQUNDLEtBQUwsQ0FBWSxDQUFDUixNQUFNLENBQUNNLENBQVAsR0FBVyxDQUFaLElBQWlCSCxNQUFNLENBQUNNLEtBQXpCLEdBQWtDLENBQTdDLENBQVg7QUFDQVQsTUFBQUEsTUFBTSxDQUFDVSxDQUFQLEdBQVdILElBQUksQ0FBQ0MsS0FBTCxDQUFZLENBQUMsQ0FBQ1IsTUFBTSxDQUFDVSxDQUFSLEdBQVksQ0FBYixJQUFrQlAsTUFBTSxDQUFDUSxNQUExQixHQUFvQyxDQUEvQyxDQUFYO0FBQ0FYLE1BQUFBLE1BQU0sQ0FBQ1ksQ0FBUCxHQUFXLENBQVg7QUFFQSxhQUFPWixNQUFQO0FBQ0QsS0FWRDtBQVdELEdBZFksRUFEQTtBQWlCYmEsRUFBQUEsVUFBVSxFQUFHLFlBQVc7QUFDdEIsUUFBSWIsTUFBTSxHQUFHLElBQUlGLE9BQUosRUFBYjtBQUFBLFFBQ0VnQixHQUFHLEdBQUcsSUFBSWhCLE9BQUosRUFEUjtBQUFBLFFBRUVpQixRQUZGO0FBSUEsV0FBTyxVQUFTZCxHQUFULEVBQWNDLE1BQWQsRUFBc0JDLE1BQXRCLEVBQThCO0FBQ25DSCxNQUFBQSxNQUFNLENBQUNnQixHQUFQLENBQ0dmLEdBQUcsQ0FBQ0ssQ0FBSixHQUFRSCxNQUFNLENBQUNNLEtBQWhCLEdBQXlCLENBQXpCLEdBQTZCLENBRC9CLEVBRUUsRUFBRVIsR0FBRyxDQUFDUyxDQUFKLEdBQVFQLE1BQU0sQ0FBQ1EsTUFBakIsSUFBMkIsQ0FBM0IsR0FBK0IsQ0FGakMsRUFHRSxHQUhGO0FBS0FYLE1BQUFBLE1BQU0sQ0FBQ2lCLFNBQVAsQ0FBaUJmLE1BQWpCO0FBRUFZLE1BQUFBLEdBQUcsQ0FBQ1YsSUFBSixDQUFTSixNQUFNLENBQUNrQixHQUFQLENBQVdoQixNQUFNLENBQUNpQixRQUFsQixFQUE0QkMsU0FBNUIsRUFBVDtBQUNBTCxNQUFBQSxRQUFRLEdBQUcsQ0FBQ2IsTUFBTSxDQUFDaUIsUUFBUCxDQUFnQlAsQ0FBakIsR0FBcUJFLEdBQUcsQ0FBQ0YsQ0FBcEM7QUFDQVosTUFBQUEsTUFBTSxDQUFDSSxJQUFQLENBQVlGLE1BQU0sQ0FBQ2lCLFFBQW5CO0FBQ0FuQixNQUFBQSxNQUFNLENBQUNxQixHQUFQLENBQVdQLEdBQUcsQ0FBQ1EsY0FBSixDQUFtQlAsUUFBbkIsQ0FBWDtBQUVBLGFBQU9mLE1BQVA7QUFDRCxLQWREO0FBZUQsR0FwQlc7QUFqQkMsQ0FBZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICcuLi9jb3JlL3RocmVlLyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdG9TY3JlZW5Qb3M6IChmdW5jdGlvbigpIHtcbiAgICB2YXIgdmVjdG9yID0gbmV3IFZlY3RvcjMoKTtcblxuICAgIHJldHVybiBmdW5jdGlvbihwb3MsIGNhbWVyYSwgY2FudmFzKSB7XG4gICAgICB2ZWN0b3IuY29weShwb3MpO1xuICAgICAgLy8gbWFwIHRvIG5vcm1hbGl6ZWQgZGV2aWNlIGNvb3JkaW5hdGUgKE5EQykgc3BhY2VcbiAgICAgIHZlY3Rvci5wcm9qZWN0KGNhbWVyYSk7XG4gICAgICAvLyBtYXAgdG8gMkQgc2NyZWVuIHNwYWNlXG4gICAgICB2ZWN0b3IueCA9IE1hdGgucm91bmQoKCh2ZWN0b3IueCArIDEpICogY2FudmFzLndpZHRoKSAvIDIpO1xuICAgICAgdmVjdG9yLnkgPSBNYXRoLnJvdW5kKCgoLXZlY3Rvci55ICsgMSkgKiBjYW52YXMuaGVpZ2h0KSAvIDIpO1xuICAgICAgdmVjdG9yLnogPSAwO1xuXG4gICAgICByZXR1cm4gdmVjdG9yO1xuICAgIH07XG4gIH0pKCksXG5cbiAgdG9TcGFjZVBvczogKGZ1bmN0aW9uKCkge1xuICAgIHZhciB2ZWN0b3IgPSBuZXcgVmVjdG9yMygpLFxuICAgICAgZGlyID0gbmV3IFZlY3RvcjMoKSxcbiAgICAgIGRpc3RhbmNlO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKHBvcywgY2FtZXJhLCBjYW52YXMpIHtcbiAgICAgIHZlY3Rvci5zZXQoXG4gICAgICAgIChwb3MueCAvIGNhbnZhcy53aWR0aCkgKiAyIC0gMSxcbiAgICAgICAgLShwb3MueSAvIGNhbnZhcy5oZWlnaHQpICogMiArIDEsXG4gICAgICAgIDAuNVxuICAgICAgKTtcbiAgICAgIHZlY3Rvci51bnByb2plY3QoY2FtZXJhKTtcblxuICAgICAgZGlyLmNvcHkodmVjdG9yLnN1YihjYW1lcmEucG9zaXRpb24pLm5vcm1hbGl6ZSgpKTtcbiAgICAgIGRpc3RhbmNlID0gLWNhbWVyYS5wb3NpdGlvbi56IC8gZGlyLno7XG4gICAgICB2ZWN0b3IuY29weShjYW1lcmEucG9zaXRpb24pO1xuICAgICAgdmVjdG9yLmFkZChkaXIubXVsdGlwbHlTY2FsYXIoZGlzdGFuY2UpKTtcblxuICAgICAgcmV0dXJuIHZlY3RvcjtcbiAgICB9O1xuICB9KSgpLFxufTtcbiJdfQ==