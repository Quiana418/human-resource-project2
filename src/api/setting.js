import request from '@/utils/request'

/**
 * 获取角色列表
 * @param {当前页,每页数量} param0
 * @returns
 */
export const getRoleList = ({ page, pagesize }) => {
  return request({
    url: '/sys/role',
    params: { page, pagesize }
  })
}

/**
 * 删除角色
 * @param {角色id} param0
 * @returns
 */
export const delRole = (id) => {
  return request({
    method: 'DELETE',
    url: `/sys/role/${id}`
  })
}

/**
 * 添加角色
 * @param {*} param0
 * @returns
 */
export const addRole = ({ name, description }) => {
  return request({
    method: 'POST',
    url: '/sys/role',
    data: {
      name,
      description
    }
  })
}

/**
 * 编辑角色
 * @param {*} data
 * @returns
 */
export const editRole = data => {
  return request({
    method: 'PUT',
    url: `/sys/role/${data.id}`,
    data
  })
}

/**
 * 根据企业id查询企业信息
 * @param {*} data
 * @returns
 */
export const getCompanyInfo = id => {
  return request({
    url: `/company/${id}`
  })
}
