import request from '@/utils/request'
// 权限管理相关API
const api_name = '/admin/acl/permission'
export default {
  // 获取权限(菜单/功能)列表
  getPermission() {
    return request({
      url: `${api_name}`,
      method: 'GET'
    })
  },
  // 删除权限项
  removePermission(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'DELETE'
    })
  },
  // 保存权限与更新权限
  addOrUpdatePermission(permission) {
    if (permission.id) {
      return request({
        url: `${api_name}/update`,
        method: "put",
        data: permission
      })
    } else {
      return request({
        url: `${api_name}/save`,
        method: 'POST',
        data: permission
      })
    }

  },
  // 查看某个角色的权限列表
  toAssign(roleId) {
    return request({
      url: `${api_name}/toAssign/${roleId}`,
      method: 'get'
    })
  },
  // 给某个角色授权
  doAssign(roleId, permissionId) {
    return request({
      url: `${api_name}/doAssign`,
      method: "post",
      params: {
        roleId,
        permissionId
      }
    })
  }

}
