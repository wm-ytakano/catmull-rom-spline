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
  points (points, isClosedCurve = false) {
    const n = points.length;

    // Abort if there are not sufficient points to draw a curve
    if (n < 3) return points;

    let p0 = isClosedCurve ? points[n-1] : points[0];
    let p1 = points[0];
    let p2 = points[1];
    let p3 = points[2];
    let pts = [points[0]];

    for (let i = 1; i < n; i++) {
      pts.push([
        ((-p0[0] + 6 * p1[0] + p2[0]) / 6),
        ((-p0[1] + 6 * p1[1] + p2[1]) / 6),
        ((p1[0] + 6 * p2[0] - p3[0]) / 6),
        ((p1[1] + 6 * p2[1] - p3[1]) / 6),
        p2[0],
        p2[1]
      ]);

      p0 = p1;
      p1 = p2;
      p2 = p3;
      p3 = points[i + 2] || (isClosedCurve ? points[i + 2 - n] : p3);
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
  slice (points, start, end) {
    let pts = points.slice(start, end);

    // Remove control points for 'M'
    if (start) pts[0] = pts[0].slice(-2);

    return pts;
  },

  /**
   * Convert 'points' to svg path
   * @param {Array} points
   * @returns {String}
   */
  svgPath (points, digits=12) {
    let p = '';

    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      const n = point.length;

      if (!i) {
        p += 'M' + (point[n - 2]).toFixed(digits) + ' ' + (point[n - 1]).toFixed(digits);
      } else if (n > 4) {
        p += 'C' + (point[0]).toFixed(digits) + ', ' + (point[1]).toFixed(digits);
        p += ', ' + (point[2]).toFixed(digits) + ', ' + (point[3]).toFixed(digits);
        p += ', ' + (point[4]).toFixed(digits) + ', ' + (point[5]).toFixed(digits);
      } else {
        p += 'S' + (point[0]).toFixed(digits) + ', ' + (point[1]).toFixed(digits);
        p += ', ' + (point[2]).toFixed(digits) + ', ' + (point[3]).toFixed(digits);
      }
    }

    return p;
  }
};
