import request from '@/utils/request'
import { GOOD_BASE_URL,USER_BASE_URL } from '../constant'

export function login(data){
  return request({
    url:'/auth/login',
    method:'post',
    data
  })
}

export function captchas(){
  return request({
    url:`${USER_BASE_URL}/user/public/api/captchas`,
    method:'post'
  })
}

export function authorizations(data){
  return request({
    url:`${USER_BASE_URL}/user/public/api/authorizations`,
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

export function getContactCompany(){
  return request({
    url:`${USER_BASE_URL}/user/public/api/users/contact-companies`,
    method:'get'
  })
}

export function getUserInfo(){
  return  request({
    url:`${USER_BASE_URL}/user/public/api/users/current?include=roles,permissions,client.statistics,credit,authorization.contact`,
    method:'get'
  })
}

export function updateToken(){
  return request({
    url:`${USER_BASE_URL}/user/public/api/users/current`,
    method:'post'
  })
}