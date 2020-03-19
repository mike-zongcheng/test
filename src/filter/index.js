export function transVipTitle (level) {
  switch (level) {
    case 0:
      return '全部不可用'
    case 1:
      return '单次普通查询'
    case 2:
      return '单次高级查询'
    case 3:
      return '永久高级查询'
    default:
      break
  }
}

export function transVipContent (level) {
  switch (level) {
    case 0:
      return ['免费三次']
    case 1:
      return ['查询一次', '搜索结果不做限制', '过滤低质量搜索结果']
    case 2:
      return ['查询一次', '搜索结果不做限制', '过滤低质量搜索结果', '可获取成人网站数据']
    case 3:
      return ['不限查询次数', '搜索结果不做限制', '过滤低质量搜索结果', '可获取成人网站数据', '可设置离线搜索', '平台新推功能', '可优先免费使用']
    default:
      break
  }
}
