'use strict';

var expect, spline;

// Make it work in browser..
try {
  spline = require('src/index.js');
  expect = window.expect;
// .. or node
} catch (err) {
  spline = require('../src/index.js');
  expect = require('expect.js');
}

describe('catmullRomSpline', function () {
  describe('points()', function () {
    it('should generate points', function () {
      var points = spline.points([[0,0], [1,1], [2,1], [3,0], [4,0]]);
      var results = [
        [0,0],
        [0.16666666666666666,0.16666666666666666,0.6666666666666666,0.8333333333333334,1,1],
        [1.3333333333333333,1.1666666666666667,1.6666666666666667,1.1666666666666667,2,1],
        [2.3333333333333335,0.8333333333333334,2.6666666666666665,0.16666666666666666,3,0],
        [3.3333333333333335,-0.16666666666666666,3.8333333333333335,0,4,0]
      ];

      points.forEach(function (point, idx) {
        expect(point).to.eql(results[idx]);
      });
    });
  });

  describe('slice()', function () {
    it('should return a subset of points for start=0', function () {
      var points = spline.slice(spline.points([[0,0], [1,1], [2,1], [3,0], [4,0], [5,1], [6,0]]), 0, 4);
      var results = [
        [0,0],
        [0.16666666666666666,0.16666666666666666,0.6666666666666666,0.8333333333333334,1,1],
        [1.3333333333333333,1.1666666666666667,1.6666666666666667,1.1666666666666667,2,1],
        [2.3333333333333335,0.8333333333333334,2.6666666666666665,0.16666666666666666,3,0]
      ];

      points.forEach(function (point, idx) {
        expect(point).to.eql(results[idx]);
      });
    });
    it('should return a subset of points for start=1', function () {
      var points = spline.slice(spline.points([[0,0], [1,1], [2,1], [3,0], [4,0], [5,1], [6,0]]), 1, 5);
      var results = [
        [1,1],
        [1.3333333333333333,1.1666666666666667,1.6666666666666667,1.1666666666666667,2,1],
        [2.3333333333333335,0.8333333333333334,2.6666666666666665,0.16666666666666666,3,0],
        [3.3333333333333335,-0.16666666666666666,3.6666666666666665,-0.16666666666666666,4,0]
     ];

      points.forEach(function (point, idx) {
        expect(point).to.eql(results[idx]);
      });
    });
    it('should return a subset of points for start=2', function () {
      var points = spline.slice(spline.points([[0,0], [1,1], [2,1], [3,0], [4,0], [5,1], [6,0]]), 2, 6);
      var results = [
        [2,1],
        [2.3333333333333335,0.8333333333333334,2.6666666666666665,0.16666666666666666,3,0],
        [3.3333333333333335,-0.16666666666666666,3.6666666666666665,-0.16666666666666666,4,0],
        [4.333333333333333,0.16666666666666666,4.666666666666667,1,5,1]
     ];

      points.forEach(function (point, idx) {
        expect(point).to.eql(results[idx]);
      });
    });
  });

  describe('svgPath()', function () {
    it('should generate an svg path', function () {
      var points = spline.points([[0,0], [1,1], [2,1], [3,0], [4,0]]);

      expect(spline.svgPath(points)).to.equal('M0 0C0.16666666666666666, 0.16666666666666666, 0.6666666666666666, 0.8333333333333334, 1, 1C1.3333333333333333, 1.1666666666666667, 1.6666666666666667, 1.1666666666666667, 2, 1C2.3333333333333335, 0.8333333333333334, 2.6666666666666665, 0.16666666666666666, 3, 0C3.3333333333333335, -0.16666666666666666, 3.8333333333333335, 0, 4, 0');
    });
  });
});