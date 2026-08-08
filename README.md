# 上方山碑刻 GIS 实习报告

上方山（北京房山）碑刻文化资源地理信息系统实习项目。

## 项目目标

- 将《重修上方兜率寺天梯记铭》所涉及的约 16 处碑 / 塔 / 殿 / 庵进行空间定位
- 结合碑文原文与思想提炼，构建「碑刻 GIS」交互式网页报告
- 使用 DEM（ASTGTM_N39E115C）与 20m 等高线图制作地形底图

## 数据现状

| 数据 | 内容 | 坐标系 | 状态 |
|------|------|--------|------|
| `data/194f95fb...jpg` | 上方山 20m 等高线图 | CGCS2000 / 3° GK Zone 39 | 待配准 / 刺点 |
| `data/ASTGTM_N39E115C.img` | ASTER GDEM 高程数据 | WGS84 (EPSG:4326) | 可直接做地形底图 |
| `data/重修上方兜率寺天梯记铭.docx` | 碑文原文 | - | 待解析 |

## 技术栈（规划）

- GIS 软件：QGIS（刺点 / 配准）、ArcMap、ArcGIS Pro、HGO
- 网页：Leaflet / MapLibre GL JS 纯前端静态页面
- 部署：GitHub Pages

## 目录结构

```
shangfangshan-report/
├── data/       # 原始数据（等高线图 / DEM / 碑文）
├── assets/     # 网页静态资源
├── docs/       # 正式文档（报告）
├── discuss/    # 方案与讨论
└── index.html  # 交互式地图网页
```

## 状态

- [ ] 坐标刺点（QGIS）
- [ ] 碑文解析
- [ ] 思想提炼
- [ ] 网页搭建
- [ ] DEM / 等高线叠加
