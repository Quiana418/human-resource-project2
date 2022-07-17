import request from '@/utils/request'

/**
 * 获取组织架构列表（部门）
 * @returns
 */
export const getDepartmentsList = () => {
  return request({
    url: '/company/department'
  })
}

/**
 * 根据部门id删除部门
 * @param {部门id} id
 * @returns
 */
export const delDepartment = (id) => {
  return request({
    method: 'DELETE',
    url: `/company/department/${id}`
  })
}
