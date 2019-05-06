# javascript toolkit base project

## Usage
```
npm install -S leaflet.chinaProvider
```

### Example
- baidu tile layer
    ```javascript
    import L from 'leaflet';
    import 'leaflet.chinaProvider';
    const map = L.map('map', {
      crs: L.CRS.Baidu, // if use baidu
      center: [31.59, 120.29],
      zoom: 12,
      maxZoom: 18,
      minZoom: 5
    })
    L.tileLayer.chinaProvider('Baidu.Normal.Map', { customid }).addTo(map);
    ```
- google tile layer
    ```javascript
    import L from 'leaflet';
    import 'leaflet.chinaProvider';
    const map = L.map('map', {
      center: [31.59, 120.29],
      zoom: 12,
      maxZoom: 18,
      minZoom: 5
    })
    L.tileLayer.chinaProvider('Google.Normal.Map').addTo(map);
    ```

![alt text](public/example.jpg)

## Development
- `npm start`
  - web server will open http://localhost:3000
- `npm run build`

## Envirenment
- node `v10.8.0`

## feature list
### 0.1.0
- [ ] 拆分各个地图公司的配置，以统一出口对外输出
- [ ] proj2leaflet 需要引入 leaflet， 怎么解决