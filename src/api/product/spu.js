import request from '@/utils/request'

// 获取spu属性列表
export const getSpuValueList = (page, limit, category3Id) => {
    return request({
        method: 'get',
        url: `/admin/product/${page}/${limit}`,
        params: {
            category3Id: category3Id
        }
    })
}

// 获取spu信息
export const getSpuInfo = (spuId) => {
    return request({
        method: 'get',
        url: `/admin/product/getSpuById/${spuId}`
    })
}
// 获取品牌信息
export const getSpuBrandInfo = () => {
    return request({
        method: 'get',
        url: `/admin/product/baseTrademark/getTrademarkList`
    })
}
// 获取spu图标
export const getSpuImgInfo = (spuId) => {
    return request({
        method: 'get',
        url: `/admin/product/spuImageList/${spuId}`
    })
}
// 获取平台全部销售属性
export const getSpuSaleInfo = () => {
    return request({
        method: 'get',
        url: `/admin/product/baseSaleAttrList/`
    })
}

// 保存和修改spuForm信息
export const saveAndRevise = (data) => {
    if (data.id) {
        return request({
            method: 'post',
            url: '/admin/product/updateSpuInfo',
            data
        })
    } else {
        return request({
            method: 'post',
            url: '/admin/product/saveSpuInfo',
            data
        })
    }
}

// 删除spu
export const deleteSpu = (spuId) => {
    return request({
        method: "delete",
        url: '/admin/product/deleteSpu/' + spuId
    })
}

// 获取图片数据
export const imgValue = (spuId) => {
    return request({
        metgpd: 'get',
        url: `/admin/product/spuImageList/${spuId}`
    })
}
// 获取销售属性数据
export const saleValue = (spuId) => {
    return request({
        metgpd: 'get',
        url: `/admin/product/spuSaleAttrList/${spuId}`
    })
}
// 获取平台属性数据
export const platformValue = (category1Id, category2Id, category3Id) => {
    return request({
        method: 'get',
        url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`
    })
}


// 2的保存数据
export const saveValueList = (spuInfo) => {
    return request({
        method: "post",
        url: "/admin/product/saveSkuInfo",
        data: spuInfo
    })
}

// 查看sku列表
export const viewSkuList = (spuId) => {
    return request({
        method: 'get',
        url: `/admin/product/findBySpuId/${spuId}`
    })
}