import request from '@/utils/request.js'

const NAME = 'logistics'

export function toSave (data) {
  return request({
    url: `/${NAME}/save`,
    method: 'post',
    data
  })
}
export function getList (data) {
  return request({
    url: `/${NAME}/getList`,
    method: 'get',
    params: data
  })
}
export function toDelete (data) {
  return request({
    url: `/${NAME}/delete`,
    method: 'post',
    data
  })
}
export function toUpdate (data) {
  return request({
    url: `/${NAME}/update`,
    method: 'post',
    data
  })
}
