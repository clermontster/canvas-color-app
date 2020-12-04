//  source https://gist.github.com/loretoparisi/c147ca437ab9d5e163b7
export function euclidean(p1, p2) {
  let s = 0;
  for (let i = 0, l = p1.length; i < l; i++) {
    s += Math.pow(p1[i] - p2[i], 2)
  }
  return Math.sqrt(s);
}

export function calculateCenter(points, n) {
  var vals = []
    , plen = 0;
  for (let i = 0; i < n; i++) { vals.push(0); }
  for (let i = 0, l = points.length; i < l; i++) {
    plen++;
    for (var j = 0; j < n; j++) {
      vals[j] += points[i][j];
    }
  }
  for (var i = 0; i < n; i++) {
    vals[i] = vals[i] / plen;
  }
  return vals;
}

export function kmeans(points, k, min_diff) {
  const plen = points.length;
  const clusters = [];
  const seen = [];
  while (clusters.length < k) {
    const idx = parseInt(Math.random() * plen);
    let found = false;
    for (var i = 0; i < seen.length; i++ ) {
      if (idx === seen[i]) {
        found = true;
        break;
      }
    }
    if (!found) {
      seen.push(idx);
      clusters.push([points[idx], [points[idx]]]);
    }
  }

  while (true) {
    const plists = [];
    for (let i = 0; i < k; i++) {
      plists.push([]);
    }

    for (let j = 0; j < plen; j++) {
      let p = points[j]
      let smallest_distance = 10000000
      let idx = 0;
      for (let i = 0; i < k; i++) {
        const distance = euclidean(p, clusters[i][0]);
        if (distance < smallest_distance) {
          smallest_distance = distance;
          idx = i;
        }
      }
      plists[idx].push(p);
    }

    let diff = 0;
    for (let i = 0; i < k; i++) {
      let old = clusters[i]
      let list = plists[i]
      let center = calculateCenter(plists[i], 3)
      let new_cluster = [center, (plists[i])]
      let dist = euclidean(old[0], center);
      clusters[i] = new_cluster
      diff = diff > dist ? diff : dist;
    }
    if (diff < min_diff) {
      break;
    }
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

export function process_image(img, ctx) {
  console.log('keys',Object.keys(ctx))
  const points = [];
  ctx.drawImage(img, 0, 0);
  const data = ctx.getImageData(0, 0, 200, 200).data;
  for (var i = 0, l = data.length; i < l;  i += 4) {
    var r = data[i]
      , g = data[i+1]
      , b = data[i+2];
    points.push([r, g, b]);
  }

  const results = kmeans(points, 3, 1);
  const hex = [];
  console.log({results})
  for (var i = 0; i < results.length; i++) {
    hex.push(rgbToHex(results[i][0]));
  }
  return hex;
}

export function analyze(ctx, img) {
  // const ctx = document.getElementById(id).getContext('2d')
  // const img = new Image();
  // img.crossOrigin = 'anonymous';
  // img.src = '/pizza-hut-logo.jpg';

  img.onload = function() {
    // var results = document.getElementById('results');
    // results.innerHTML = 'Waiting...';
    const colors = process_image(img, ctx)
    // const p1 = document.getElementById('c1')
    // const p2 = document.getElementById('c2')
    // const p3 = document.getElementById('c3');
      console.log({colors})
    // p1.style.backgroundColor = colors[0];
    // p2.style.backgroundColor = colors[1];
    // p3.style.backgroundColor = colors[2];
    // results.innerHTML = 'Done';
  }
  // img.src = img_elem.src;
}
