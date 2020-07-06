import { API_SERVER } from './apis'


// 用户接口声明
export const API_USR_XXXXXX = API_SERVER + '/userXXXXXX'

// 系统接口声明
export const API_SYS_XXXXXX = API_SERVER + '/sysXXXXXX'


export const API_SYS_GET_PROJLIST = API_SERVER + '/getProjectList'

// 专业负责人接口声明
export const API_MAN_GET_TEALIST = API_SERVER + '/manage/teacherList'
export const API_MAN_GET_TOPICLIST = API_SERVER + '/manage/topicList'

// 分配审核课题模块
export const API_MAN_POST_ALLOCATETOPIC = API_SERVER + '/manage/checkAllocate'
export const API_MAN_POST_AUTOALLOCATETOPIC = API_SERVER + '/manage/randAllocate'
export const API_MAN_POST_CHECKLIST = API_SERVER + '/manage/checkList'
export const API_MAN_POST_AUDITCOUNT = API_SERVER + '/manage/auditCount'
export const API_MAN_POST_AREALIST = API_SERVER + '/manage/areaList'
export const API_MAN_POST_RELEASE = API_SERVER + '/manage/releaseTopic'
export const API_MAN_POST_JUDGETOPIC = API_SERVER + '/manage/judgeTopic'


// 组织开题答辩模块
export const API_MAN_POST_OGP_TOPICLIST = API_SERVER + '/openGp/topicList'

export const API_MAN_POST_OGP_TEACHERLIST = API_SERVER + '/openGp/teacherList'

export const API_MAN_POST_OGP_AUTOALLOCATETOPIC = API_SERVER + '/openGp/randGroup'
export const API_MAN_POST_OGP_MANUALALLOCATETOPIC = API_SERVER + '/openGp/handleGroup'

export const API_MAN_POST_OGP_GROUPLIST = API_SERVER + '/openGp/groupList'
export const API_MAN_POST_OGP_TDETAILLIST = API_SERVER + '/openGp/topicDetailList'
export const API_MAN_POST_OGP_DELETEGROUP = API_SERVER + '/openGp/deleteGroup'
