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

/**
 * 新增部门
 * @param code 编码
 * @returns
 */
export const addDepartment = ({ code, introduce, manager, name, pid }) => {
  return request({
    method: 'POST',
    url: '/company/department',
    data: { code, introduce, manager, name, pid }
  })
}

/**
 * 编辑部门 又有路径参数又有普通参数
 * @param {*} data
 * @returns
 */
export const editDepartment = data => {
  return request({
    method: 'PUT',
    url: `/company/department/${data.id}`,
    data
  })
}
