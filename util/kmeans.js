// source: https://raw.githubusercontent.com/xanderlewis/colour-palettes/
/**
 * Calculates the mean value of a one-dimensional dataset
 * @param {Array} data - data set
 * @return {Number} mean value of data set
 */
function mean(data) {
  return data.reduce((total,current) => total += current, 0) / data.length;
}

/**
 * Calculates the mean point of an n-dimensional dataset
 * @param {Array} data - data set
 * @return {Array} mean point of data set
 */
function meanPoint(data) {
  var theMeanPoint = [];
  if (data.length != 0) {
    for (let i = 0; i < data[0].length; i++) {
      theMeanPoint.push(mean(data.map(x => x[i])));
    }
  }
  return theMeanPoint;
}

/**
 * Calculates the range of a one-dimensional data set
 * @param {Array} data - data set
 * @return {Number} range - range of the data set
 */
function rangeOf(data) {
  return data.reduce(function(total,current) {
    if (current < total.min) { total.min = current; }
    if (current > total.max) { total.max = current; }
    return total;
  }, {min: data[0], max: data[0]});
}

/**
 * Calculates the ranges of each 'component' in an n-dimensional data set
 * @param {Array} data - data set
 * @return {Number} range - range of the data set
 */
function rangesOf(data) {
  var ranges = [];
  for (let i = 0; i < data[0].length; i++) {
    ranges.push(rangeOf(data.map(x => x[i])));
  }
  return ranges;
}

// Method for comparing arrays (because JavaScript doesn't provide this for some reason)
Array.prototype.equals = function (array) {
  // if the other array is a falsy value, return
  if (!array)
    return false;

  // compare lengths - can save a lot of time
  if (this.length != array.length)
    return false;

  for (var i = 0, l=this.length; i < l; i++) {
    // Check if we have nested arrays
    if (this[i] instanceof Array && array[i] instanceof Array) {
      // recurse into the nested arrays
      if (!this[i].equals(array[i]))
        return false;
    }
    else if (this[i] != array[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;
    }
  }
  return true;
};
// Hide method from for-in loops
Object.defineProperty(Array.prototype, 'equals', {enumerable: false});

/**
 * Generates a random integer in the closed interval specified by a and b
 * @param {Number} a - lower bound
 * @param {Number} b - upper bound
 * @return {Number} randomInt - random integer generated
 */
function randomIntBetween(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

/**
 * Calculates the Euclidean distance between two points.
 * @param {Array} a - first point
 * @param {Array} b - second point
 * @return {Number} distance - Euclidean distance between the points
 */
function euclideanDistance(a, b) {
  if (a.length != b.length) {
    //throw 'Error calculating Euclidean distance. Input vectors must have same number of dimensions!';
    return Math.infinity;
  }
  var sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += Math.pow(b[i] - a[i], 2);
  }
  return Math.sqrt(sum);
}

/**
 * Initialises the centroids for the k-means algorithm
 * @param {Array} data - data set
 * @param {Number} k - number of clusters/centroids
 * @return {Array} centroids - array of centroid vectors
 */
function initialiseCentroidsRandomly(data, k) {
  var ranges = rangesOf(data);
  var centroids = [];
  for (let i = 0; i < k; i++) {
    var centroid = [];
    for (var r in ranges) {
      centroid.push(randomIntBetween(ranges[r].min, ranges[r].max));
    }
    centroids.push(centroid);
  }
  return centroids;
}

/**
 * Attributes data points to the nearest centroid's cluster
 * @param {Array} data - data set
 * @param {Array} centroids - array of centroid vectors
 * @return {Array} clusters - array of clusters
 */
function clusterDataPoints(data, centroids) {
  var clusters = [];
  centroids.forEach(function () {
    clusters.push([]);
  });
  data.forEach(function (point) {
    var nearestCentroid = centroids[0];
    centroids.forEach(function (centroid) {
      if (euclideanDistance(point, centroid) < euclideanDistance(point, nearestCentroid)) {
        nearestCentroid = centroid;
      }
    });
    clusters[centroids.indexOf(nearestCentroid)].push(point);
  });
  return clusters;
}

/**
 * Calculates the new vectors of the centroids based on their respective clusters
 * @param {Array} clusters - array of clusters
 * @return {Array} centroids - new centroid vectors
 */
function getNewCentroids(clusters) {
  var centroids = [];
  clusters.forEach(function (cluster) {
    centroids.push(meanPoint(cluster));
  });
  return centroids;
}

/**
 * Performs k-means clustering on a data set
 * @param {Array} data - data set
 * @param {Array} k - number of clusters for data points to be partitioned into
 * @return {Array} clusters - array of clusters (each containing an array of vectors representing a data point)
 */
function kMeans(data, k) {
  var centroids;
  var clusters;
  var oldClusters;
  var converged = false;
  const iterationLimit = 500;
  var iterations = 0;

  // STEP ONE: Initialise centroids
  centroids = initialiseCentroidsRandomly(data, k);

  while (!converged) {
    console.log('iterated.');
    iterations += 1;
    // STEP TWO: Cluster data points according to nearest centroid (assignment step)
    oldClusters = clusters;
    clusters = clusterDataPoints(data, centroids);

    // Check for empty clusters. If so, just retry!
    if (clusters.some(x => x.length == 0)) {
      console.log('Empty clusters found. Restarting k-means.');
      return kMeans(data, k);
    }

    console.log(iterations, iterationLimit);
    if (clusters.equals(oldClusters) || iterations >= iterationLimit) {
      converged = true;
    }

    // STEP THREE: Set centroids to mean point of points belonging to their respective clusters (update step)
    centroids = getNewCentroids(clusters);
  }
  return clusters;
}


export function rgbToHex(rgb) {
  function th(i) {
    const h = parseInt(i).toString(16);
    return h.length == 1 ? '0'+h : h;
  }
  return '#' + th(rgb[0]) + th(rgb[1]) + th(rgb[2]);
}

export function process_image(ctx) {
  const points = [];
  const data = ctx.getImageData(0, 0, 200, 200).data;
  for (var i = 0, l = data.length; i < l;  i += 4) {
    var r = data[i]
      , g = data[i+1]
      , b = data[i+2]
      , a = data[i+3];
    points.push([r, g, b, a]);
  }

  return points;
}

export function extractColourPalette(canvas, k) {
  // Extract raw colours from image
  const allColours = process_image(canvas);
  // Cluster raw colours
  const clusters = kMeans(allColours, k);

  // Calculate palette (mean colour of each cluster)
  const colours = clusters.map(x => meanPoint(x));

  // return as an array of rgba values
  return colours.map(x => `rgba(${x[0]},${x[1]},${x[2]},${x[3]})`);
}
