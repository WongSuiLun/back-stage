import request from '@/utils/request'

export function login(data){
  return request({
    url:'/auth/login',
    method:'post',
    data
  })
}

export function captchas(){
  return request({
    url:'/chpc/user/public/api/captchas',
    method:'post'
  })
}

export function authorizations(data){
  return request({
    url:'/chpc/user/public/api/authorizations',
    method:'post',
    data
  })
}

export function getCompany(){
  return request({
    url:'/api/auth/getCompany',
    method:'get'
  })
}