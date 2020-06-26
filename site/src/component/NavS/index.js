import { Component } from 'preact';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';
import { route } from 'preact-router';
import { PushpinOutlined } from '@ant-design/icons';
import './index.scss'

@inject('userStore', 'studentStore')
@observer
class NavS extends Component {

  @computed
  get topInfo() {
    return this.props.studentStore.topInfo;
  }

  @computed
  get usr() {
    return this.props.userStore.usr;
  }

  componentDidMount() {
    this.props.studentStore.getTopInfo(this.usr.id)
      .then(r => {
        if (!this.topInfo.teaName) {
          route('/s_selectTL');
        } else {
          route('/s_topicPG');
        }
      })
  }

  render() {
    return (
      <div className="g-nav">
        <div className="g-menu">
          <div className="m-info">
            {this.usr.name && <p>姓名：{this.usr.name}</p>}
            {this.usr.uid && <p>学号：{this.usr.uid}</p>}
            {this.usr.cls && <p>班级：{this.usr.cls}</p>}
            {this.usr.maj && <p>专业：{this.usr.maj}</p>}
            {this.usr.dep && <p>学院：{this.usr.dep}</p>}
            {this.topInfo.teaName && <p>指导老师：{this.topInfo.teaName}</p>}
          </div>
          {!this.topInfo.teaName &&
            <div className='m-menuItem active'>
              <PushpinOutlined />
              <span>选择课题</span>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default NavS
