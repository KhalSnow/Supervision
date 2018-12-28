import request from "@/utils/request.js"

export function getItem(params) {
    return request({
        url: '/users/get',
        method: 'get',
        params
    })
}

export function addItem(data) {
    return request({
        url: '/users/add',
        method: 'post',
        data
    })
}

export function deleteItem(data) {
    return request({
        url: '/users/delete',
        method: 'post',
        data
    })
}

export function editItem(data) {
    return request({
        url: '/users/edit',
        method: 'post',
        data
    })
}