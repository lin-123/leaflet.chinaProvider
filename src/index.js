/**
 * usage:
 *
 * normal:
 *  const map = L.map('map', {
 *    crs: L.CRS.Baidu, // if use baidu
 *    center: [31.59, 120.29],
 *    zoom: 12,
 *    maxZoom: 18,
 *    minZoom: 5
 *  })
 *  L.tileLayer.chinaProvider('TianDiTu.Normal.Map').addTo(map)
 *  L.tileLayer.chinaProvider('TianDiTu.Normal.Annotion').addTo(map)
 *
 */
/* eslint-disable */
import L from 'leaflet'
import 'proj4leaflet'

L.TileLayer.ChinaProvider = L.TileLayer.extend({
  initialize: function (type, options = {}) { // (type, Object)
    const { url, options: opt } = L.TileLayer.ChinaProvider.getProviderConf(type, options)
    L.TileLayer.prototype.initialize.call(this, url, opt);
  }
});

L.TileLayer.ChinaProvider.getProviderConf = function (type, options = {}) {
  const [providerName, mapName, mapType] = type.split('.');
  const { subdomains, [mapName]: mapConf } = L.TileLayer.ChinaProvider.providers[providerName]
  const url = mapConf[mapType];
  const {options: mapOptions = {}} = mapConf;
  if(providerName === 'Baidu') {
    const { styles } = mapOptions
    if(typeof styles === 'function') {
      mapOptions.styles = styles(options)
    }
    options = Object.assign(mapOptions, {
      name: options.name,
      tms: true
    }, options)
  }
  options.subdomains = mapOptions.subdomains || subdomains
  return { url, options }
}

L.TileLayer.ChinaProvider.providers = {
  TianDiTu: {
    Normal: {
      Map: "http://t{s}.tianditu.gov.cn/vec_w/wmts?T=vec_w&X={x}&Y={y}&L={z}",
      Annotion: "http://t{s}.tianditu.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}"
    },
    Satellite: {
      Map: "http://t{s}.tianditu.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}",
      Annotion: "http://t{s}.tianditu.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}"
    },
    Terrain: {
      Map: "http://t{s}.tianditu.cn/DataServer?T=ter_w&X={x}&Y={y}&L={z}",
      Annotion: "http://t{s}.tianditu.cn/DataServer?T=cta_w&X={x}&Y={y}&L={z}"
    },
    subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
  },
  Baidu: {
    Normal: {
      Map: 'http://online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles={styles}&scaler=1&p=1',
      options: {
        styles: ({bigfont}) => bigfont ? 'ph' : 'pl'
      }
    },
    Satellite: {
      Map: 'http://shangetu{s}.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46',
      Annotion: 'http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles={styles}&v=020',
      options: {
        styles: ({bigfont}) => bigfont ? 'sh' : 'sl'
      }
    },
    Custom: {
      Map: 'http://api{s}.map.bdimg.com/customimage/tile?&x={x}&y={y}&z={z}&scale=1&customid={customid}',
      options: {
        subdomains: '012'
      }
    },
    Time: {
      Map: 'http://its.map.baidu.com:8002/traffic/TrafficTileService?x={x}&y={y}&level={z}&time={time}&label=web2D&v=017',
      options: {
        time: Date.now()
      }
    },
    subdomains: '0123456789'
  },
  GaoDe: {
    Normal: {
      Map: 'http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
    },
    Satellite: {
      Map: 'http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
      Annotion: 'http://webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}'
    },
    subdomains: ["1", "2", "3", "4"]
  },

  Google: {
    Normal: {
      Map: "http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
    },
    Satellite: {
      Map: "http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
    },
    subdomains: []
  },

  Geoq: {
    Normal: {
      Map: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}",
      Color: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetColor/MapServer/tile/{z}/{y}/{x}",
      PurplishBlue: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
      Gray: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}",
      Warm: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}",
      Cold: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetCold/MapServer/tile/{z}/{y}/{x}"
    },
    subdomains: []
  }
};

L.tileLayer.chinaProvider = function (type, options) {
  return new L.TileLayer.ChinaProvider(type, options);
};

//请引入 proj4.js 和 proj4leaflet.js
L.CRS.Baidu = new L.Proj.CRS(
  'EPSG:900913',
  `+proj=merc
    +a=6378206
    +b=6356584.314245179
    +lat_ts=0.0
    +lon_0=0.0
    +x_0=0
    +y_0=0
    +k=1.0
    +units=m
    +nadgrids=@null
    +wktext
    +no_defs`, {
  resolutions: function () {
    var res = [],
      level = 19;
    res[0] = Math.pow(2, 18);
    for (var i = 1; i < level; i++) {
      res[i] = Math.pow(2, (18 - i))
    }
    return res;
  }(),
  origin: [0, 0],
  bounds: L.bounds([20037508.342789244, 0], [0, 20037508.342789244])
});
