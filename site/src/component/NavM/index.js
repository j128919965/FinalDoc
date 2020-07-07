import { Component } from 'preact';
import { inject, observer } from 'mobx-react';
import { computed, toJS } from 'mobx';
import { route } from 'preact-router';
import { Modal } from 'antd';
import UploadImage from '../ImgUpload'
import './index.scss'
// import more from './more.svg'
import { MENU_MAIN_M } from '../../constant/data'

@inject('manageStore', 'userStore')
@observer
class NavM extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cur: 0,
      visible: false,
    }
  }

  @computed
  get usr() {
    return this.props.userStore.usr;
  }
  
  componentDidMount() {
    if (!this.usr.id) {
      route('/')
    }
    route('/m_distributeTopic')
  }

  doMenu = (path, i) => {
    this.setState({ cur: i }, () => {
      route(path)
    })
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div className="g-nav">
        <div className="g-info">
          <div>身份：系主任</div>
          <div>姓名：{this.usr.name}</div>
          <div>工号：{this.usr.uid}</div>
          <div>所在系：{this.usr.maj}</div>
          <div className="sign" 
            onClick={this.showModal} >
              查看电子签名
          </div>
          {/* <div>所在学院：杭州国际服务工程学院</div> */}
        </div>
        <div className="g-menu">
          {MENU_MAIN_M.map((item, i) =>
            <div className={(this.state.cur == i) ? 'm-menu-item active' : 'm-menu-item'} key={i} onClick={this.doMenu.bind(this, item.path, i)}>
              <img src={item.icon} /><span>{item.title}</span>
            </div>
          )}
        </div>
        <Modal
          title="查看电子签名"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={false}
        >
          <div>
            <UploadImage  />
          </div>
        </Modal>

      </div>
      
    )
  }
}

export default NavM