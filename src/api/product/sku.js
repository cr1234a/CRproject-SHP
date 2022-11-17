import request from '@/utils/request'

// 获取sku列表数据
export const getSkuList = (page, limit) => {
    return request({
        method: "get",
        url: `/admin/product/list/${page}/${limit}`
    })
}

// 产品上架
export const onSale = (skuId) => {
    return request({
        method: "get",
        url: `/admin/product/onSale/${skuId}`
    })
}
// 产品下架
export const cancelSale = (skuId) => {
    return request({
        method: "get",
        url: `/admin/product/cancelSale/${skuId}`
    })
}

// 查看单个sku详情
export const detailSku = (skuId) => {
    return request({
        method: "get",
        url: `/admin/product/getSkuById/${skuId}`
    })
}

// 删除sku
export const deleteSku = (spuId) => {
    return request({
        method: "delete",
        url: '/admin/product/deleteSku/' + spuId
    })
}
