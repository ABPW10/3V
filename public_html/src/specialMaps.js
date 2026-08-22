// L.tileLayer.quadKeyTiles, L.girdLayer.xtTopo

    /// <summary>
    /// Converts tile XY coordinates into a QuadKey at a specified level of detail.
    /// </summary>
    /// <param name="tileX">Tile X coordinate.</param>
    /// <param name="tileY">Tile Y coordinate.</param>
    /// <param name="levelOfDetail">Level of detail, from 1 (lowest detail)
    /// to 23 (highest detail).</param>
    /// <returns>A string containing the QuadKey.</returns>
    function TileXYToQuadKey(tileX, tileY, levelOfDetail)
    {
        let quadKey = '';
        for (let i = levelOfDetail; i > 0; i--)
        {
            digit = '0';
            mask = 1 << (i - 1);
            if ((tileX & mask) != 0)
            {
                digit=String.fromCharCode(digit.charCodeAt(0)+1);
            }
            if ((tileY & mask) != 0)
            {
                digit=String.fromCharCode(digit.charCodeAt(0)+1);
                digit=String.fromCharCode(digit.charCodeAt(0)+1);
            }
            quadKey+=digit;
        }
        return quadKey;
    }
    
L.TileLayer.QuadKeyTiles = L.TileLayer.extend({
    options:{subdomains: '01234567'},
    getTileUrl: function(coords) {
        const data={subdomain:this._getSubdomain(coords),quadkey:TileXYToQuadKey(coords.x,coords.y,coords.z)}
        return L.Util.template('http://ecn.t{subdomain}.tiles.virtualearth.net/tiles/a{quadkey}.jpeg?g=15364', data);
    },
    getAttribution: function() {
        return '&copy; <a href="https://learn.microsoft.com/en-us/bingmaps">Microsoft Bing</a>'
    }
});

L.tileLayer.quadKeyTiles = function() {
    return new L.TileLayer.QuadKeyTiles();
}

function h2C(h){
  const colourValues=[
        [-7500, 0,  0,  128],
        [-3000, 0,  0,  255],
        [-500,  0,  255,  255],
        [-0,  128,  255,  255],
        [0, 0,  159,  0],
        [200, 0,  223,  0],
        [700, 128,255,128],
        [1300,  239,239,79],
        [2400,  199,  143,  79],
        [3500,  140,  80, 20],
        [5000,  128,  31, 31],
        [6500,144,48,96],
        [8000,255,255,255]
      ]
      for (let i = 0; i < colourValues.length; i++ ) {
        if (i === 0 && h < colourValues[i][0]) {
          return colourValues[i].slice(1);
        } else if (i > 0 && h < colourValues[i][0] && h >= colourValues[i - 1][0]) {
          const coef = (h - colourValues[i - 1][0])/(colourValues[i][0] - colourValues[i - 1][0])
          const r = Math.round(colourValues[i - 1][1] + coef*(colourValues[i][1] - colourValues[i - 1][1]))
          const g = Math.round(colourValues[i - 1][2] + coef*(colourValues[i][2] - colourValues[i - 1][2]))
          const b = Math.round(colourValues[i - 1][3] + coef*(colourValues[i][3] - colourValues[i - 1][3]))
          return [r,g,b];
        } else if (i === colourValues.length - 1 && h >= colourValues[i][0]) {
          return colourValues[i].slice(1);
        }
      }
}

L.GridLayer.XTTopo = L.GridLayer.extend({
    options: {
			subdomains: '0123',
      maxNativeZoom: 13
		},
    _getSubdomain:L.TileLayer.prototype._getSubdomain,
    createTile: function (coords, done) {
        var tile = document.createElement('canvas');

        var tileSize = this.getTileSize();
        tile.setAttribute('width', tileSize.x);
        tile.setAttribute('height', tileSize.y);

        var ctx = tile.getContext('2d');

// 加载图片
const img = new Image();img.crossOrigin = "Anonymous";
coords.s=this._getSubdomain(coords)
img.src = L.Util.template('https://tiles{s}.geovisearth.com/base/v1/terrain-rgb/{z}/{x}/{y}?format=png&tmsIds=w&token=1e8e0f9248dc9587a8a4193b626f2f44a4d430850506219c0768218faa63f74a',coords)

img.onload = () => {
tile.width = img.width;
tile.height = img.height;
ctx.drawImage(img, 0, 0);
// 获取像素数据
const imageData = ctx.getImageData(0, 0, tile.width, tile.height);
const pixels = imageData.data; // 像素数据的Uint8ClampedArray
// 修改像素数据
for(var i = 0; i < pixels.length; i += 4) {
    var height = -10000 + ((pixels[i] * 256 * 256 + pixels[i + 1] * 256 + pixels[i + 2]) * 0.1)
    const c=h2C(height)
    pixels[i] = c[0];
    pixels[i + 1] = c[1];
    pixels[i + 2] = c[2];
}
// 将修改后的像素数据放回Canvas
ctx.putImageData(imageData, 0, 0);

done(null, tile);
};

        return tile;
    }
});

L.gridLayer.xtTopo = function(opts) {
    return new L.GridLayer.XTTopo(opts);
};