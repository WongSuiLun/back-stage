import request from '@/utils/request'

export function getInstitutions() {
    return request(
        {
            url: '/chpc/user/public/api/institutions',
            method: 'get',
            headers: {
                company: 1
            }
        }
    )
}
