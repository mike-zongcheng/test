import fly from './fly'

export function fetchList (params) {
  return fly.get('/account/show_method.html', params)
}
