import request from '@/utils/request'
const article = '/api/article'
const category = `${article}/category`

export function getArticleList(query) {
  return request({
    url: `${article}/list`,
    method: 'get',
    params:query
  })
}

export function getArticleInfo(id) {
  return request({
    url: `${article}/info/${id}`,
    method: 'get'
  })
}

export function getCategoryList(query) {
  return request({
    url: `${category}/list`,
    method: 'get',
    query: query
  })
}
