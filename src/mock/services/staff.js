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

const getAccountCompany = (options) => {
    const body = getBody(options)
    console.log('mock: body', body)
    let AllCompany = []
    const status = ['success', 'fail']
    for (let i = 0; i < 500; i++) {
        AllCompany.push({
            'company_title': Mock.Random.cword(5, 15),
            'main_info': Mock.Random.cword(10, 25),
            'status': status[Math.floor(Math.random() * 2)],
            'indate': Mock.mock('@datetime')
        })
    }
    return builder(AllCompany)
}

const getStaffList = (options) => {
    const body = getBody(options)
    console.log('mock: body', body)
    let staffList = []
    const status = ['male', 'female']
    for (let i = 0; i < 500; i++) {
        staffList.push({
            'name': Mock.Random.cword(5, 10),
            'sex': status[Math.floor(Math.random() * 2)],
            'shop': Mock.Random.cword(5, 10),
            'photo':'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1570781932&di=aff849f42587880c4eb8408a623cbed3&src=http://www.5jjc.net/tu5jaHR0cHM6Ly9pbWcuYWxpY2RuLmNvbS90ZnNjb20vaTIvVEIxZ3B5ZUhwJDZheWFwJDUkMw.jpg'
        })
    }
    return builder(staffList)
}

Mock.mock(/\/staff\/list/, 'get', getStaffList)
