import request from '@/utils/request'
const api_name = '/admin/acl/user'

export default {
  // 登录
  login({
    username,
    password
  }) {
    return request({
      url: '/admin/acl/index/login',
      method: 'post',
      data: {
        username,
        password
      }
    })
  },
  // 根据token获取用户信息
  logout() {
    return request({
      url: '/admin/acl/index/logout',
      method: 'post'
    })
  },
  // 获取当前用户的菜单权限列表
  getMenu() {
    return request('/admin/acl/index/menu')
  },
  // 获取后台用户分页列表(带搜索)
  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  /* 
  根据ID获取某个后台用户
  */
  getById(id) {
    return request({
      url: `${api_name}/get/${id}`,
      method: 'get'
    })
  },
  //  添加或更新一个后台用户
  addOrUpdateUser(user) {
    if (user.id) {
      return request({
        url: `${api_name}/update`,
        method: 'put',
        data: user
      })
    } else {
      return request({
        url: `${api_name}/save`,
        method: 'post',
        data: user
      })
    }
  },
  /* 
获取某个用户的所有角色
*/
  getRoles(userId) {
    return request({
      url: `${api_name}/toAssign/${userId}`,
      method: 'get'
    })
  },
  /* 
给某个用户分配角色
roleId的结构: 字符串, 'rId1,rId2,rId3'
*/
  assignRoles(userId, roleId) {
    return request({
      url: `${api_name}/doAssign`,
      method: 'post',
      params: {
        userId,
        roleId
      }
    })
  },
  /* 
删除某个用户
*/
  removeById(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'delete'
    })
  },
  /* 
批量删除多个用户
ids的结构: ids是包含n个id的数组
*/
  removeUsers(ids) {
    return request({
      url: `${api_name}/batchRemove`,
      method: 'delete',
      data: ids
    })
  }
}
