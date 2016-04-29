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
  points (points) {
    const n = points.length;
    let p0 = points[0];
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
      p3 = points[i + 2] || p3;
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
  svgPath (points) {
    let p = '';

    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      const n = point.length;

      if (!i) {
        p += 'M' + (point[n - 2]) + ' ' + (point[n - 1]);
      } else if (n > 4) {
        p += 'C' + (point[0]) + ', ' + (point[1]);
        p += ', ' + (point[2]) + ', ' + (point[3]);
        p += ', ' + (point[4]) + ', ' + (point[5]);
      } else {
        p += 'S' + (point[0]) + ', ' + (point[1]);
        p += ', ' + (point[2]) + ', ' + (point[3]);
      }
    }

    return p;
  }
};