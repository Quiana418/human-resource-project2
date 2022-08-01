import request from '@/utils/request'

/**
 * 获取所有权限列表
 * @returns
 */
export const getPermissions = () => {
  return request({
    url: '/sys/permission'
  })
}

/**
 * 通过角色id获取角色对应的权限
 * @param {角色id} id
 * @returns
 */
export const getPermissionsById = (id) => {
  return request({
    url: `/sys/role/${id}`
  })
}

/**
 * 给角色分配权限
 * @param {角色id,上个请求获取到的权限数组} id
 * @returns
 */
export const assignPermission = (id, permIds) => {
  return request({
    method: 'PUT',
    url: '/sys/role/assignPrem',
    data: { id, permIds }
  })
}

// 添加权限点
export const addPermission = data => {
  return request({
    method: 'POST',
    url: '/sys/permission',
    data
  })
}

// 编辑权限点
export const editPermission = data => {
  return request({
    method: 'PUT',
    url: `/sys/permission/${data.id}`,
    data
  })
}
