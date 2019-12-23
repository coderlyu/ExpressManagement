import request from '@/utils/request.js'

const NAME = 'user'

export function login (data) {
  return request({
    url: `/${NAME}/login`,
    method: 'post',
    data
  })
}
export function register (data) {
  return request({
    url: `/${NAME}/signIn`,
    method: 'post',
    data
  })
}
export function getInfo (data) {
  return request({
    url: `/${NAME}/getById/${data}`,
    method: 'get'
  })
}
export function getList (data) {
  return request({
    url: `/${NAME}/getList`,
    method: 'get',
    params: data
  })
}
