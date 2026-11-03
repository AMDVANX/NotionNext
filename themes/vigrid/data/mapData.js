/**
 * VIGRID 态势地图数据
 *
 * x / y：热点在底图上的百分比坐标（0-100），可自由微调。
 * zone：分区计划类别 A-E（null 表示未录入）。
 * threat：威胁等级 1-5。
 * status：STABLE / ALERT / CONTESTED —— 决定档案里的状态文字与配色。
 */

export const MAP_IMAGE = {
  wide: '/images/vigrid-map-1800.jpg',
  small: '/images/vigrid-map-900.jpg',
  alt: 'Vigrid topographic chart'
}

/** 分区计划：五类区域 */
export const ZONES = [
  {
    code: 'A',
    cn: '完全封锁区',
    en: 'TOTAL CLOSURE',
    brief: 'VMFO 原则上不进入，也不允许有人进去和出来。',
    detail:
      '以奥斯特兰德、约特兰和林德霍姆地区为主，一直划设到俄罗斯边境无人区。包括北部的化学武器污染区、圣杯教会的圣地奥勒松教堂以及圣树公司废墟。无人机会失联、巡逻犬会发疯、雪地上常出现血迹与人类残肢。圣杯教会残余抵抗势力聚集于此，也有不少为战争而来的投机者。'
  },
  {
    code: 'B',
    cn: '控制区',
    en: 'CONTROL ZONE',
    brief: '固定哨站与机动巡逻线，平民需身份核查与路线限制。',
    detail:
      '以河谷、韦克舍一直到瓦尔基利亚地区为主，还包括亚士兰与约特兰的交界。萨米牧民认为巡逻线切断了传统迁徙路线；商业公司认为检查站遏制经济；圣杯教会与森林兄弟认为这是外军控制通道；VMFO 则认为没有检查站，武器、走私药物与失踪人口都会重新流动起来。这里是冲突最频繁的区域，因为所有人都必须经过这里。'
  },
  {
    code: 'C',
    cn: '地方自治区',
    en: 'LOCAL AUTONOMY',
    brief: '由地方委员会、萨米代表、芬兰行政观察员与 VMFO 民事大队共管。',
    detail:
      '以亚士兰地区为主。VMFO 通常不驻扎在村内，而是在村外设置联络站。作为接壤 A 类地区的地方，C 类区域看起来最和平，也最复杂。每一个村庄都有自己的历史，每一条路都有新仇旧恨。'
  },
  {
    code: 'D',
    cn: '恢复定居区',
    en: 'RESETTLEMENT',
    brief: '“蒙特勒之后的新生活”——和平的橱窗，也是所有情报机构最喜欢的地方。',
    detail:
      '以国王港地区为主，被宣传为“蒙特勒之后的新生活”。这里有国际援助组织、疫苗、食品卡、重建工地、临时就业岗位，甚至游客集散中心，也有无处不在的身份登记与安全审查。'
  },
  {
    code: 'E',
    cn: '“小镇”',
    en: 'THE TOWNS',
    brief: '当地人的说法：那里不是给人去的。',
    detail:
      '夏立特堡及周边的附属小镇。VMFO 从不使用“E 类区域”这个词；芬兰政府不承认这些区域享有特殊地位；俄罗斯媒体长期称之为“美国的黑箱”；在 Reddit 和 X 上，这里是北欧土地上的关塔那摩。'
  }
]

/** VMFO 编制 */
export const VMFO_ROLE = {
  name: 'VMFO',
  note: '编制被刻意设计得模糊——既不是旅，也不是战斗群，而是“观察员大队”。'
}

export const VMFO_UNITS = [
  {
    code: 'HQ',
    cn: '观察员司令部',
    en: 'OBSERVER COMMAND',
    loc: '瓦尔基利亚 · 维兰市',
    note: '重新铺设了能够起降 A400M 的简易机场。'
  },
  {
    code: '1MOB',
    cn: '第一机动观察大队',
    en: '1ST MOBILE OBSERVER BN',
    loc: '法德军事人员主导',
    note: '沿主要道路、湖岸线、牧道和旧军事设施周边巡逻。装备以卡车、装甲车和小型无人机为主。'
  },
  {
    code: '2MOB',
    cn: '第二机动观察大队',
    en: '2ND MOBILE OBSERVER BN',
    loc: '同上',
    note: '编制与装备相同，仅责任区区别。'
  },
  {
    code: 'AIR',
    cn: '空中观察大队',
    en: 'AIR OBSERVER GROUP',
    loc: '法国与瑞典负责',
    note: '提供直升机运输与武装直升机，另有部分无人机。'
  },
  {
    code: 'SUS',
    cn: '综合保障大队',
    en: 'COMBINED SUPPORT BN',
    loc: '德国与挪威人员主导',
    note: '道路修复、桥梁维护、雷区标记、未爆弹处置以及前哨站建设。'
  },
  {
    code: 'CIV',
    cn: '民事大队',
    en: 'CIVIL AFFAIRS BN',
    loc: '—',
    note: '负责与萨米社区、地方议会、教会残余、难民组织和非政府组织沟通。'
  },
  {
    code: 'TEC',
    cn: '技术观察大队',
    en: 'TECHNICAL OBSERVATION BN',
    loc: '—',
    note: '不承认自己从事情报活动，只承认自己负责“风险研判”。'
  }
]

export const VMFO_CAPABILITY = {
  lacks: ['没有坦克', '没有远程火炮', '没有固定翼作战飞机'],
  has: '有装甲车、无人机、武装直升机和快速反应分队。对于一个被称作“观察员部队”的机构来说，这些东西已经显得“不那么中立”。'
}

export const VMFO_ROE = {
  rules: [
    '不得主动开火',
    '不得进入未登记村落',
    '不得搜查宗教场所',
    '不得干预地方自治事务'
  ],
  coda: '然而这是维格里德，一切原则都是例外。'
}

export const REGIONS = [
  {
    id: 'I',
    sv: 'Valgrind',
    fi: '',
    cn: '瓦格林德',
    zone: 'A',
    x: 88.5,
    y: 26,
    terrain: 'MOUNTAIN / GLACIER',
    control: 'VMFO NO-ENTRY',
    threat: 5,
    status: 'CONTESTED',
    sites: ['Northern glacier', 'Chemical contamination belt', 'Russian frontier'],
    zoneNote: 'A 类区域延伸至此，划至俄罗斯边境无人区。',
    text: '山区，向北进入冰川和雪山，以及俄罗斯边境。'
  },
  {
    id: 'II',
    sv: 'Jotland',
    fi: '',
    cn: '约特兰',
    zone: 'A',
    x: 64,
    y: 20.5,
    terrain: 'INDUSTRIAL',
    control: 'VMFO NO-ENTRY',
    threat: 5,
    status: 'CONTESTED',
    sites: ['Industrial belt', 'Ashland frontier', 'Südland frontier'],
    text: '维格里德的工业重镇。与亚士兰和苏德兰的边境已经被 VMFO 封锁。'
  },
  {
    id: 'III',
    sv: 'Ashland',
    fi: '',
    cn: '亚士兰',
    zone: 'C',
    x: 78,
    y: 53,
    terrain: 'FREE CITY / ESTUARY',
    control: 'JOINT ADMINISTRATION',
    threat: 3,
    status: 'STABLE',
    sites: ['Gjöllflod estuary', 'King’s Lake mouth', 'High pastorate'],
    text: '一个巨大的自由市。为约尔河（Gjöllflod）汇入国王湖的河口。圣杯教在此设立了教区和总牧师之职位。'
  },
  {
    id: 'IV',
    sv: 'Südland',
    fi: 'Etelämaa',
    cn: '苏德兰 / 埃特拉玛',
    zone: 'E',
    x: 87,
    y: 68,
    terrain: 'PLAIN / AIRBASE',
    control: 'US EXCLUSIVE',
    threat: 5,
    status: 'CONTESTED',
    sites: ['Charitenberg (Armovuori)', 'Charitenberg Air Base'],
    zoneNote: 'VMFO 从不使用“E 类区域”这个词。',
    text: '首府夏立特堡（Charitenberg：慈善山，芬兰语为 Armovuori 阿尔默沃里），北约曾在此驻军。目前夏立特堡空军基地仍然为美国政府独家占有。'
  },
  {
    id: 'V',
    sv: 'Valkyria',
    fi: '',
    cn: '瓦尔基里亚',
    zone: 'B',
    x: 53.5,
    y: 70,
    terrain: 'ORE FIELD / GARRISON',
    control: 'VMFO CHECKPOINTS',
    threat: 4,
    status: 'ALERT',
    sites: ['Viilään', 'Observer Command', 'Iron & tungsten mines'],
    text: '首府维兰（Viilään：Viila-锉刀，Viileä-寒冷的）。铁矿以及钨矿储量丰富，自中世纪起便是芬兰乌戈尔人的冶铁重镇。如今该地区被 VMFO 选为指定区域，此处的武装密度不亚于朝韩戒备区。'
  },
  {
    id: 'VI',
    sv: 'Könighaven',
    fi: 'Kuningassatama',
    cn: '国王港',
    zone: 'D',
    x: 43,
    y: 46,
    terrain: 'LAKESIDE FREE CITY',
    control: 'VMFO + AID CORRIDOR',
    threat: 2,
    status: 'STABLE',
    sites: ['University', 'Library', 'Resettlement centre'],
    text: '一个位于国王湖畔的古老自由市，有著名的大学和图书馆。'
  },
  {
    id: 'VII',
    sv: 'Lindenhölm',
    fi: 'Lehmussaari',
    cn: '林德霍姆 / 勒姆萨里',
    zone: 'A',
    x: 47.5,
    y: 16.5,
    terrain: 'PLANTATION / RESEARCH',
    control: 'VMFO NO-ENTRY',
    threat: 5,
    status: 'CONTESTED',
    sites: ['Rindland (Nautamaa)', 'Sacred Tree Pharma ruins', 'Lily of the valley fields'],
    zoneNote: '圣树公司废墟位于此区内。',
    text: '首府林德兰（Rindland，芬兰语名为 Nautamaa 那乌塔玛），圣树制药公司的总部所在地，有大量的铃兰种植园坐落在此。'
  },
  {
    id: 'VIII',
    sv: 'Ostenrand',
    fi: 'Itäranta',
    cn: '奥斯特兰德 / 伊塔兰塔',
    zone: 'A',
    x: 10.5,
    y: 29.5,
    terrain: 'FJORD / COASTAL',
    control: 'VMFO NO-ENTRY',
    threat: 5,
    status: 'CONTESTED',
    sites: ['Ålesund', '15th-c. fjord cathedral', 'Norwegian frontier'],
    zoneNote: '圣地奥勒松教堂与教会残余抵抗势力聚集于此。',
    text: '首府奥勒松德（Ålesund），为圣杯教会大本营。峡湾中有巨大的、建于 15 世纪的教堂。西北与挪威边境接壤。'
  },
  {
    id: 'IX',
    sv: 'Dalmsberg',
    fi: '',
    cn: '达姆斯贝格',
    zone: null,
    x: 45.5,
    y: 68.5,
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
    zone: 'B',
    x: 17.5,
    y: 70,
    terrain: 'PASTURE / FISHERY',
    control: 'VMFO CHECKPOINTS',
    threat: 4,
    status: 'ALERT',
    sites: ['Seelund', 'Lakeside villages'],
    text: '畜牧业和渔业在这里极度发达，内陆地区有许多的牧场，沿湖则有大大小小的北欧渔村。'
  },
  {
    id: 'XI',
    sv: 'Floddalen',
    fi: '',
    cn: '河谷',
    zone: 'B',
    x: 10,
    y: 78.5,
    terrain: 'RIVER VALLEY',
    control: 'VMFO CHECKPOINTS',
    threat: 4,
    status: 'ALERT',
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
