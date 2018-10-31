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
