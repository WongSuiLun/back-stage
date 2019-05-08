import Mock from 'mockjs2'
import { builder, getBody } from '../util'

const username = ['admin', 'user', 'super']
const password = ['admin', '5797128'] 

const login = (options) => {
  const body = getBody(options)
  console.log('mock: body', body)
  if (!username.includes(body.username) || !password.includes(body.password)) {
    return builder({ isLogin: true }, '账户或密码错误', 401)
  }

  return builder({
    'id': Mock.mock('@guid'),
    'name': Mock.mock('@name'),
    'username': 'admin',
    'password': 'admin',
    'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
    'status': 1,
    'telephone': '',
    'lastLoginIp': '27.154.74.117',
    'lastLoginTime': 1534837621348,
    'creatorId': 'admin',
    'createTime': 1497160610259,
    'deleted': 0,
    'roleId': 'admin',
    'lang': 'zh-CN',
    'token': '4291d7da9005377ec9aec4a71ea837f'
  }, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const logout = () => {
  return builder({}, '[测试接口] 注销成功')
}

const getAccountCompany = (options)=>{
  const body = getBody(options)
  console.log('mock: body', body)
  let AllCompany = []
  const status = ['success','fail']
  for(let i = 0; i < 500 ; i++){
    AllCompany.push({
      'company_title':Mock.Random.cword(5,15),
      'main_info':Mock.Random.cword(10,25),
      'status':status[Math.floor(Math.random()*2)],
      'indate':Mock.mock('@datetime')
    })
  }
  return builder(AllCompany)
}

Mock.mock(/\/auth\/login/, 'post', login)
Mock.mock(/\/auth\/logout/, 'post', logout)
Mock.mock(/\/auth\/getCompany/, 'get', getAccountCompany)
