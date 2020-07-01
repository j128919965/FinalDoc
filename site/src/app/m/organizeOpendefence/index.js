import { Component } from 'preact';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';
import { Tabs } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { message,Select } from 'antd'
import Defense from './defense.js'
import "./style.css";

const { TabPane } = Tabs;

@inject('manageStore')
@observer
export default class Home extends Component {
  state = {
    value: 1,
  }

  @computed
  get distributeTopic() {
    return this.props.manageStore.distributeTopic;
  }

  async componentDidMount() {
    await this.props.manageStore.getTopicList();
  }

  // 切换自动手动单选框
  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    return (
      <div className="main">
        <Tabs defaultActiveKey="1" >
          <TabPane tab="分配小组" key="1">
            <Defense/>
          </TabPane>
          <TabPane tab="数据详情" key="2">
            {/* Content of Tab Pane 2 */}
            234
          </TabPane>

        </Tabs>



      </div>
    );
  }
}

 