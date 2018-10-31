import request from '@/utils/request'

export function addUser(username, password) {
  return request({
    url: '/user',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function list() {
  return request({
    url: 'user',
    method: 'get'
  })
}

export function changeEnable(username, enable) {
  return request({
    url: 'user',
    method: 'put',
    data: {
      username,
      enable
    }
  })
}
