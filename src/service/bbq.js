import request from "../utils/axios"
import {apiConfig} from './mmp'

export const login = (payload)=>{
    return  request({
        url: apiConfig.v2Api +'/login',
        ...payload
    })
}

export const getHomeList = (payload)=>{
    return  request({
        url: apiConfig.v1Api +'/getAllCollections',
        ...payload
    })
}
export const postDetail = (payload)=>{
    return  request({
        url: apiConfig.v1Api +'/detail',
        ...payload
    })
}


export const getMyList = (payload)=>{
    return  request({
        url: apiConfig.v1Api +'/getMyCollections',
        ...payload
    })
}


///=---------------------------------------------------------------------------------------




