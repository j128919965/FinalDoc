import { Component } from 'preact';
import { inject, observer } from 'mobx-react';
import { computed ,toJS} from 'mobx';
import { Radio, Form, Button, message, Select, InputNumber } from 'antd';
import "./defense.css"
import ManualAllocate from "./manualAllocate.js"
import AutoAllocate from './autoAllocate.js';


@inject('manageStore')
@observer
export default class Defense extends Component {
    state = {

        // id,tid,topic

        select_leader: undefined,
        select_member: [],
        new_arr: [],
        teacher_info: [],
        value: 1,
        childrenMsg: []
    }
    @computed
    get distributeTopic() {
        return this.props.manageStore.distributeTopic;
    }


    async componentDidMount() {
        await this.props.manageStore.getTeaList();
        let tea = this.distributeTopic.teacher_info;
        console.log(this.state.tea)

        let teaName = []
        tea.map((item) =>
            teaName.push({ tid: item.uid + " " + item.maj + "-" + item.Tname + "-" + item.areas, name: item.Tname, value: item.maj + "-" + item.Tname + "-" + item.areas })
        )
        // console.log(topic)
        this.setState({ teacher_info: teaName }, () => { message.info("ok") });

    }

    addSelectTeacher = (value) => {
        console.log(`selected ${value}`);
        this.setState({
            select_leader: value
        }, () => { console.log(this.state.select_leader) })

    }

    handleChange = (value) => {
        //console.log(`selected ${value}`);
        this.setState({
            select_member: value
        }, () => { console.log(this.state.select_member) })
    }

    onChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    getChildrenMsg = (result, msg) => {//获取子组件
        // console.log(result, msg)
        // 很奇怪这里的result就是子组件那bind的第一个参数this，msg是第二个参数
        this.setState({
            childrenMsg: msg
        })
    }

    clear = () => {
        this.setState({
            select_leader: undefined,
            select_member: [],
        })
    }

    render() {
        this.state.new_arr = [];
        for (let i of this.state.teacher_info) {
            if (this.state.select_member.indexOf(i.tid) == -1) {
                this.state.new_arr.push(i);

            }
        }
         
        return (
            <div>


                <div class="defs-select">
                    <div class="select-group">
                        <div class="lable">组长</div>
                        <div class="choose">
                            <Select
                                value={this.state.select_leader}
                                showSearch
                                style={{ width: 500 }}
                                placeholder="请选择教师"
                                optionFilterProp="children"
                                onChange={this.addSelectTeacher}
                                allowClear
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                optionLabelProp="label"
                            >
                                {
                                    this.state.new_arr.map((item, i) =>
                                        <Select.Option
                                            label={item.name} key={item.tid}>{item.value}</Select.Option>

                                    )}

                            </Select>
                        </div>
                    </div>

                    <div class="select-group">
                        <div class="lable">组员</div>
                        <div class="choose">
                            <Select
                                mode="multiple"
                                style={{ width: 500 }}
                                placeholder="请选择教师"
                                value={this.state.select_member}
                                onChange={this.handleChange}
                                optionLabelProp="label"
                                allowClear
                            >
                                {this.state.teacher_info.map((item, i) =>

                                    (item.tid !== this.state.select_leader) && <Select.Option label={item.name}
                                        key={item.tid}>{item.value}</Select.Option>

                                )}
                            </Select>

                        </div>
                    </div>
                    <div class="select-group">
                        <div class="lable">分配方式</div>
                        <div class="choose">

                            <Radio.Group onChange={this.onChange} value={this.state.value}>
                                <Radio value={1}>自动分配</Radio>
                                <Radio value={2}>手动分配</Radio>
                            </Radio.Group>
                        </div>
                    </div>

                    {(this.state.value === 1) &&
                        <div>

                            <AutoAllocate 
                                select_leader={this.state.select_leader}
                                select_member={this.state.select_member} 
                                clear={this.clear}
                            />

                        </div>
                    }
                    {(this.state.value === 2) &&
                        <div>


                            <ManualAllocate 
                                select_leader={this.state.select_leader}
                                select_member={this.state.select_member} 
                                clear={this.clear}
                            />
                        </div>

                    }


                </div>
            </div>
        );
    }
}
