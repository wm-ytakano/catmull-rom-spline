'use strict';

/**
 * Convert a series of points to a CatmullRom spline
 * https://github.com/yr/catmull-rom-spline
 * @copyright Yr
 * @license MIT
 */

module.exports = {
  /**
   * Convert 'points' to catmull rom bezier spline
   * @param {Array} points
   * @returns {Array}
   */
  points: function points(_points) {
    var isClosedCurve = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    var n = _points.length;

    // Abort if there are not sufficient points to draw a curve
    if (n < 3) return _points;

    var p0 = isClosedCurve ? _points[n - 1] : _points[0];
    var p1 = _points[0];
    var p2 = _points[1];
    var p3 = _points[2];
    var pts = [_points[0]];

    for (var i = 1; i < n; i++) {
      pts.push([(-p0[0] + 6 * p1[0] + p2[0]) / 6, (-p0[1] + 6 * p1[1] + p2[1]) / 6, (p1[0] + 6 * p2[0] - p3[0]) / 6, (p1[1] + 6 * p2[1] - p3[1]) / 6, p2[0], p2[1]]);

      p0 = p1;
      p1 = p2;
      p2 = p3;
      p3 = _points[i + 2] || (isClosedCurve ? _points[i + 2 - n] : p3);
    }

    return pts;
  },


  /**
   * Slice out a segment of 'points'
   * @param {Array} points
   * @param {Number} start
   * @param {Number} end
   * @returns {Array}
   */
  slice: function slice(points, start, end) {
    var pts = points.slice(start, end);

    // Remove control points for 'M'
    if (start) pts[0] = pts[0].slice(-2);

    return pts;
  },


  /**
   * Convert 'points' to svg path
   * @param {Array} points
   * @returns {String}
   */
  svgPath: function svgPath(points) {
    var p = '';

    for (var i = 0; i < points.length; i++) {
      var point = points[i];
      var n = point.length;

      if (!i) {
        p += 'M' + point[n - 2] + ' ' + point[n - 1];
      } else if (n > 4) {
        p += 'C' + point[0] + ', ' + point[1];
        p += ', ' + point[2] + ', ' + point[3];
        p += ', ' + point[4] + ', ' + point[5];
      } else {
        p += 'S' + point[0] + ', ' + point[1];
        p += ', ' + point[2] + ', ' + point[3];
      }
    }

    return p;
  }
};