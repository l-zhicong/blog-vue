import request from '@/utils/request'
const article = '/api/article'
const category = `${article}/category`
const music = `/api/music`
const letter = `/api/letter`

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

export function getMusicList(query) {
  return request({
    url: `${music}/list`,
    method: 'get',
    query: query
  })
}

export function sendOutLetter(data) {
  return request({
    url: `${letter}/sendOut`,
    method: 'post',
    data: data
  })
}
