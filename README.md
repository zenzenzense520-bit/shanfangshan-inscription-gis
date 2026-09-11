# 山河入卷：上方山碑刻 GIS

北京房山上方山碑刻、寺庵与数字化测绘资料的研究型展示项目。仓库将历史文献、空间记录、遥感影像和三维模型资料分层组织，强调来源可追溯与定位不确定性。

## 在线入口

- [GitHub Pages 专题页](https://zenzenzense520-bit.github.io/shanfangshan-inscription-gis/)
- [完整论文 PDF](docs/paper/北京上方山文物古迹数字化展示研究_2026年9月.pdf)
- [可编辑论文 DOCX](docs/paper/北京上方山文物古迹数字化展示研究_2026年9月.docx)

## 已整理成果

| 成果 | 内容 | 当前状态 |
|---|---|---|
| 碑文与思想提炼 | 17 篇碑文摘录及主题分析 | 已整理 |
| 文献对象主表 | 19 个建筑、道路、洞窟、塔及人物关联对象 | 未核实位置保留空几何 |
| 项目坐标记录 | 6 条手簿、推算或参考坐标 | 按来源分级展示 |
| DOM / DSM | 0.3 m 栅格参数与坐标参考核查 | 可作空间背景，不能替代点位精度 |
| 实景三维 | OSGB / OBJ 文件与生产记录核查 | 可作场景组织，不等同于历史复原 |

## 数据入口

- [`data/heritage_points.csv`](data/heritage_points.csv)：19 个文献与空间对象的属性主表。
- [`data/heritage_points.geojson`](data/heritage_points.geojson)：未定位对象保留 `null` 几何的交换图层。
- [`data/project_coordinate_records.geojson`](data/project_coordinate_records.geojson)：6 条项目坐标记录，区分项目所述实测、仿射推算和参考锚点。
- [`docs/03_碑塔位置考据清单.md`](docs/03_碑塔位置考据清单.md)：碑塔、寺庵与历史方位关系。
- [`docs/04_三维与GIS实施方案.md`](docs/04_三维与GIS实施方案.md)：GIS、三维建模和证据分级规则。

## 证据边界

1. 历史文献用于确认名称、沿革和相对方位，不直接生成精确坐标。
2. 项目坐标保留原始来源标签；缺少设备、解状态和独立检核时，不据小数位数宣称精度。
3. DOM、DSM 与实景三维支撑空间背景和模型组织，不直接证明毁损建筑的历史形制。
4. 展示页只绘制具有坐标记录的对象；其余对象保留在列表和空几何图层中。

## 目录结构

```text
├── index.html                    # GitHub Pages 入口
├── assets/css, assets/js         # 无框架静态页面资源
├── data/                         # 原始资料与交换数据
├── docs/                         # 正式研究文档与论文
├── discuss/                      # 证据审查记录
├── scripts/site.sh               # 站点检查与本地预览
└── .github/workflows/pages.yml   # Pages 自动部署
```

## 本地检查

```bash
scripts/site.sh check
scripts/site.sh serve 4173
```

访问 `http://127.0.0.1:4173/`。专题页不需要地图密钥；坐标图由仓库内 GeoJSON 直接生成。

## 进度

- [x] 碑文摘录、思想提炼与地方志补证
- [x] 文献对象主表、分级坐标记录与静态专题页
- [x] 论文 DOCX、PDF 和 LaTeX 源码整理
- [ ] 核对原始 GNSS 记录与点号对应关系
- [ ] 完成影像叠加检核、现场复核与可追溯三维展示
