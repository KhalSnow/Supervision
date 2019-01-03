import request from "@/utils/request.js"

export function getItem(params) {
    return request({
        url: '/users/get',
        method: 'get',
        headers: {
            'token': window.localStorage['token']
        },
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

export function logIn(data) {
    return request({
        url: '/login/login',
        method: 'post',
        data
    })
}