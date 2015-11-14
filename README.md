Convert a series of points to a CatmullRom spline

## Usage

```js
const spline = require('@yr/catmull-rom-spline')
  , points = spline.points([[0,0], [1,1], [2,1], [3,0], [4,0]]
  , svgPath = spline.svgPath(points);

console.log(svgPath);
// => 'M0 0C0.16666666666666666, 0.16666666666666666, 0.6666666666666666, 0.8333333333333334, 1, 1
C1.3333333333333333, 1.1666666666666667, 1.6666666666666667, 1.1666666666666667, 2, 1
C2.3333333333333335, 0.8333333333333334, 2.6666666666666665, 0.16666666666666666, 3, 0
C3.3333333333333335, -0.16666666666666666, 3.8333333333333335, 0, 4, 0'
```

## API

**points(points)**: convert array of points (x,y) to array of bezier points (c1x,c1y,c2x,c2y,x,y)

**slice(points, start, end)**: slice a segment of converted points

**svgPath(points)**: convert array of bezier points to svg path (`d`) string