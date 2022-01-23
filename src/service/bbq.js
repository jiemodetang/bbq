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
export const getCollectionItemList = (payload)=>{
    return  request({
        url: apiConfig.v1Api +'/getMyCollections',
        ...payload
    })
}
export const save = (payload)=>{
    return  request({
        url: apiConfig.v1Api +'/save',
        ...payload
    })
}
export const update = (payload)=>{
    return  request({
        url: apiConfig.v1Api +'/update',
        ...payload
    })
}
export const deleteC = (payload)=>{
    return  request({
        url: apiConfig.v1Api +'/delete',
        ...payload
    })
}


export const getAllColType = (payload)=>{
    return  request({
        url: apiConfig.protal +'/getAllColType',
        ...payload
    })
}

export const uploadImg = (payload)=>{
    return  request({
        url: apiConfig.v3Api +'/fileUpload',
        ...payload
    })
}



// item

export const saveItem = (payload)=>{
    return  request({
        url: apiConfig.v5Api +'/save',
        ...payload
    })
}
export const getMineItem = (payload)=>{
    return  request({
        url: apiConfig.v5Api +'/getMine',
        ...payload
    })
}
export const getAllItem = (payload)=>{
    return  request({
        url: apiConfig.v5Api +'/getAll',
        ...payload
    })
}

export const deleteItem = (payload)=>{
    return  request({
        url: apiConfig.v5Api +'/delete',
        ...payload
    })
}
export const detailItem = (payload)=>{
    return  request({
        url: apiConfig.v5Api +'/detail',
        ...payload
    })
}

export const getI = (payload)=>{
    return  request({
        url: apiConfig.v5Api +'/getAll',
        ...payload
    })
}






