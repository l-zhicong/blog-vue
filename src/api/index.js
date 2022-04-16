import request from '@/utils/request'
const prefix = '/api/article'

export function getAticleList() {
  return request({
    url: `${prefix}/list`,
    method: 'get'
  })
}
