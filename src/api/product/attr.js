import request from '@/utils/request'

// 获取商品平台属性一级分类
export const getCategoryOne = () => {
    return request({
        method: 'get',
        url: '/admin/product/getCategory1'
    })
}

// 获取商品平台属性二级分类
export const getCategoryTwo = (category1Id) => {
    return request({
        method: 'get',
        url: `/admin/product/getCategory2/${category1Id}`
    })
}

// 获取商品平台属性三级分类
export const getCategoryThree = (category2Id) => {
    return request({
        method: 'get',
        url: `/admin/product/getCategory3/${category2Id}`
    })
}
// 获取商品基本属性
export const getListInfo = (category1Id, category2Id, category3Id) => {
    return request({
        method: 'get',
        url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`
    })
}

// 添加和修改属性
export const addListValue = (attrinfo) => {
    return request({
        method: 'post',
        url: '/admin/product/saveAttrInfo',
        data: attrinfo
    })
}