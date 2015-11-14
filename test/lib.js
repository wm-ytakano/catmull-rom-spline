/* generated by Buddy 3.1.0 */

(function(root) {
	/**
	 * Load or retrieve cached version of requested module with id 'path' or 'path/index'
	 * @param {String} path
	 * @returns {Object}
	 */
	function require (path) {
		// Find in cache
		var m = require.modules[path] || require.modules[path + '/index'];

		if (!m) {
			// Handle versioned modules when called without version number
			var p, idx;
			for (var p in require.modules) {
				if ((idx = p.indexOf('#')) != -1) {
					if (path == p.slice(0, idx)) {
						m = require.modules[p];
						break;
					}
				}
			}
			if (!m) throw new Error("Couldn't find module for: " + path);
		}

		// Instantiate the module if it's export object is not yet defined
		if (!m.exports) {
			// Convert 'lazy' evaluated string to Function
			if ('string' == typeof m) {
				// 'm' is key to raw source
				m = require.modules[path] = new Function('require', 'module', 'exports', require.modules[m]);
			}
			m.exports = {};
			m.filename = path;
			m.call(null, require, m, m.exports);
		}

		// Return the exports object
		return m.exports;
	}

	// Cache of module objects
	require.modules = {};

	/**
	 * Retrieve raw 'lazy' module source
	 * @param {String} path
	 * @returns {String}
	 */
	require.raw = function requireRaw (path) {
		return require.modules['raw:' + path] || '';
	};

	/**
	 * Register a module with id of 'path' and callback of 'fn'
	 * Alternatively accepts 'fn' string for lazy evaluation
	 * @param {String} path
	 * @param {Function|String} fn [signature should be of type (require, module, exports)]
	 */
	require.register = function requireRegister (path, fn) {
		if ('string' == typeof fn) {
			// Store raw source
			var key = 'raw:' + path;
			require.modules[key] = fn;
			require.modules[path] = key;
		} else {
			require.modules[path] = fn;
		}
	};

	// Expose
	root.require = require;

})((typeof window !== 'undefined') ? window : global);
require.register('src/index.js', function(require, module, exports) {
    'use strict';
    
    module.exports = {
      /**
       * Convert 'points' to catmull rom bezier spline
       * @param {Array} points
       * @returns {Array}
       */
    
      points: function points(_points) {
        var n = _points.length;
    
        var p0 = _points[0],
            p1 = _points[0],
            p2 = _points[1],
            p3 = _points[2],
            pts = [_points[0]];
    
        for (var i = 1; i < n; i++) {
          pts.push([(-p0[0] + 6 * p1[0] + p2[0]) / 6, (-p0[1] + 6 * p1[1] + p2[1]) / 6, (p1[0] + 6 * p2[0] - p3[0]) / 6, (p1[1] + 6 * p2[1] - p3[1]) / 6, p2[0], p2[1]]);
    
          p0 = p1;
          p1 = p2;
          p2 = p3;
          p3 = _points[i + 2] || p3;
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
          var point = points[i],
              n = point.length;
    
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
});
require('src/index.js');