[![NPM Version](https://img.shields.io/npm/v/@yr/catmull-rom-spline.svg?style=flat)](https://npmjs.org/package/@yr/catmull-rom-spline)
[![Build Status](https://img.shields.io/travis/YR/catmull-rom-spline.svg?style=flat)](https://travis-ci.org/YR/catmull-rom-spline?branch=master)

Convert a series of points to a CatmullRom spline.

## Usage

```js
const spline = require('@yr/catmull-rom-spline');
const points = spline.points([[0,0], [1,1], [2,1], [3,0], [4,0]]);
const svgPath = spline.svgPath(points);

console.log(svgPath);
// => 'M0 0C0.16666666666666666, 0.16666666666666666, ...'
```

## API

**points(points)**: convert array of points (x,y) to array of bezier points (c1x,c1y,c2x,c2y,x,y)

**slice(points, start, end)**: slice a segment of converted points

**svgPath(points)**: convert array of bezier points to svg path (`d`) string