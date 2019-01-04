import request from "@/utils/request.js"

export function getContents(params) {
    return request({
        url: '/supervision/get',
        method: 'get',
        params
    })
}

export function switchChange(data) {
    return request({
        url: '/supervision/enable',
        method: 'post',
        data
    })
}
