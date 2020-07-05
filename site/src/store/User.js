import BaseActions from '../component/BaseActions'
import { observable, action } from 'mobx'
import axios from 'axios'
import * as urls from '../constant/urls'

class User extends BaseActions {
  @observable
  usr = {
    name: '张三',
    uid: '2018210207004',
    // uid: '2014214272',
    dep: '杭州国际服务工程学院',
    maj: '计算机科学与技术',
    cls: '计算机183',
    role: 1    // 0: teacher 1:student 2: manage
  }

  @action
  async getProjList() {
    return await this.get(urls.API_SYS_GET_PROJLIST, null)
  }

  @action
  async downloadFile(params) {
    return await axios({
      url: urls.API_SYS_DOWN_FILE,
      method: 'POST',
      responseType: 'blob',
      data: params
    }).then(r => {
      return r;
    }).catch(e => {
      console.log('网络错误')
    })
  }
}

export default new User()