import request from '@/utils/request'
// 获取品牌列表
export const getTradeMarkList = (page, limit) => {
    return request({
        method: 'get',
        url: `/admin/product/baseTrademark/${page}/${limit}`
    })
}
// 修改或添加品牌
export const changeOrAddBrand = (trademark) => {
    if (trademark.id) {
        return request({
            method: 'put',
            url: '/admin/product/baseTrademark/update',
            data: trademark
        })
    } else {
        return request({
            method: 'post',
            url: '/admin/product/baseTrademark/save',
            data: trademark
        })
    }
}

// 删除品牌接口
export const deleteBrand = (id) => {
    return request({
        method: 'delete',
        url: `/admin/product/baseTrademark/remove/${id}`
    })
}