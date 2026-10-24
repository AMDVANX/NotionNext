/**
 * VIGRID 态势地图数据
 *
 * x / y 为热点在底图上的百分比坐标（0-100），可自由微调。
 * threat 1-5：威胁等级，用于渲染分段条。
 * status: STABLE / ALERT / CONTESTED —— 决定强调色。
 *
 * 注：IX. Dalmsberg 在原设定里暂无描述，标记为档案缺失。
 */

export const MAP_IMAGE = {
  wide: '/images/vigrid-map-1800.jpg',
  small: '/images/vigrid-map-900.jpg',
  alt: 'Vigrid topographic chart'
}

export const REGIONS = [
  {
    id: 'I',
    sv: 'Valgrind',
    fi: '',
    cn: '瓦格林德',
    x: 88.5,
    y: 26.0,
    terrain: 'MOUNTAIN / GLACIER',
    control: 'BORDER ZONE',
    threat: 3,
    status: 'ALERT',
    sites: ['Northern glacier', 'Russian frontier'],
    text: '山区，向北进入冰川和雪山，以及俄罗斯边境。'
  },
  {
    id: 'II',
    sv: 'Jotland',
    fi: '',
    cn: '约特兰',
    x: 64.0,
    y: 20.5,
    terrain: 'INDUSTRIAL',
    control: 'VMFO BLOCKADE',
    threat: 4,
    status: 'CONTESTED',
    sites: ['Industrial belt', 'Ashland frontier', 'Südland frontier'],
    text: '维格里德的工业重镇。与亚士兰和苏德兰的边境已经被 VMFO 封锁。'
  },
  {
    id: 'III',
    sv: 'Ashland',
    fi: '',
    cn: '亚士兰',
    x: 78.0,
    y: 53.0,
    terrain: 'FREE CITY / ESTUARY',
    control: 'GRAIL CHURCH DIOCESE',
    threat: 2,
    status: 'STABLE',
    sites: ['Gjöllflod estuary', 'King’s Lake mouth', 'High pastorate'],
    text: '一个巨大的自由市。为约尔河（Gjöllflod）汇入国王湖的河口。圣杯教在此设立了教区和总牧师之职位。'
  },
  {
    id: 'IV',
    sv: 'Südland',
    fi: 'Etelämaa',
    cn: '苏德兰 / 埃特拉玛',
    x: 87.0,
    y: 68.0,
    terrain: 'PLAIN / AIRBASE',
    control: 'US EXCLUSIVE',
    threat: 3,
    status: 'ALERT',
    sites: ['Charitenberg (Armovuori)', 'Charitenberg Air Base'],
    text: '首府夏立特堡（Charitenberg：慈善山，芬兰语为 Armovuori 阿尔默沃里），北约曾在此驻军。目前夏立特堡空军基地仍然为美国政府独家占有。'
  },
  {
    id: 'V',
    sv: 'Valkyria',
    fi: '',
    cn: '瓦尔基里亚',
    x: 51.5,
    y: 74.5,
    terrain: 'ORE FIELD / GARRISON',
    control: 'VMFO DESIGNATED',
    threat: 5,
    status: 'CONTESTED',
    sites: ['Viilään', 'Iron & tungsten mines', 'Designated zone'],
    text: '首府维兰（Viilään：Viila-锉刀，Viileä-寒冷的）。铁矿以及钨矿储量丰富，自中世纪起便是芬兰乌戈尔人的冶铁重镇。如今该地区被 VMFO 选为指定区域，此处的武装密度不亚于朝韩戒备区。'
  },
  {
    id: 'VI',
    sv: 'Könighaven',
    fi: 'Kuningassatama',
    cn: '国王港',
    x: 43.0,
    y: 46.0,
    terrain: 'LAKESIDE FREE CITY',
    control: 'MUNICIPAL',
    threat: 1,
    status: 'STABLE',
    sites: ['University', 'Library'],
    text: '一个位于国王湖畔的古老自由市，有著名的大学和图书馆。'
  },
  {
    id: 'VII',
    sv: 'Lindenhölm',
    fi: 'Lehmussaari',
    cn: '林德霍姆 / 勒姆萨里',
    x: 47.5,
    y: 16.5,
    terrain: 'PLANTATION / RESEARCH',
    control: 'CORPORATE',
    threat: 2,
    status: 'STABLE',
    sites: ['Rindland (Nautamaa)', 'Sacred Tree Pharma HQ', 'Lily of the valley fields'],
    text: '首府林德兰（Rindland，芬兰语名为 Nautamaa 那乌塔玛），圣树制药公司的总部所在地，有大量的铃兰种植园坐落在此。'
  },
  {
    id: 'VIII',
    sv: 'Ostenrand',
    fi: 'Itäranta',
    cn: '奥斯特兰德 / 伊塔兰塔',
    x: 10.5,
    y: 29.5,
    terrain: 'FJORD / COASTAL',
    control: 'GRAIL CHURCH HQ',
    threat: 2,
    status: 'STABLE',
    sites: ['Ålesund', '15th-c. fjord cathedral', 'Norwegian frontier'],
    text: '首府奥勒松德（Ålesund），为圣杯教会大本营。峡湾中有巨大的、建于 15 世纪的教堂。西北与挪威边境接壤。'
  },
  {
    id: 'IX',
    sv: 'Dalmsberg',
    fi: '',
    cn: '达姆斯贝格',
    x: 43.5,
    y: 72.5,
    terrain: 'UNLOGGED',
    control: 'UNLOGGED',
    threat: 0,
    status: 'STABLE',
    sites: [],
    text: null
  },
  {
    id: 'X',
    sv: 'Växjö',
    fi: 'Lahdenjärvi',
    cn: '韦克舍 / 拉赫登耶尔维',
    x: 17.5,
    y: 70.0,
    terrain: 'PASTURE / FISHERY',
    control: 'MUNICIPAL',
    threat: 1,
    status: 'STABLE',
    sites: ['Seelund', 'Lakeside villages'],
    text: '畜牧业和渔业在这里极度发达，内陆地区有许多的牧场，沿湖则有大大小小的北欧渔村。'
  },
  {
    id: 'XI',
    sv: 'Floddalen',
    fi: '',
    cn: '河谷',
    x: 10.0,
    y: 78.5,
    terrain: 'RIVER VALLEY',
    control: 'MUNICIPAL',
    threat: 1,
    status: 'STABLE',
    sites: ['Flodstadt'],
    text: '首府大河城（Flodstadt），被河流滋润的谷地，是极北地区为数不多牧草丰美的地方。这里是畜牧业的心脏。'
  }
]

/** 城市点位（仅标注，不可选） */
export const CITIES = [
  { name: 'Ålesund', x: 22, y: 43 },
  { name: 'Göttingen', x: 36, y: 55 },
  { name: 'Rindland', x: 45, y: 41 },
  { name: 'Bronnen', x: 70, y: 38 },
  { name: 'Viilään', x: 64, y: 55 },
  { name: 'Seelund', x: 25, y: 84 },
  { name: 'Flodstadt', x: 11, y: 88 },
  { name: 'Charitenberg', x: 91, y: 79 }
]

export const STATUS_LABEL = {
  STABLE: 'STABLE',
  ALERT: 'ALERT',
  CONTESTED: 'CONTESTED'
}
