import { Component } from 'preact';
import { inject, observer } from 'mobx-react';
import { computed, toJS } from 'mobx';
import { Table, Space, Popconfirm, Modal, Button, Tooltip, Input, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './dividedetailfd.scss';

const paginationProps = {
    showTotal: ((total) => {
        return `共 ${total} 条`;
    }),
}

const topic_paginationProps = {
    showTotal: ((total) => {
        return `共 ${total} 条`;
    }),
    showSizeChanger: false,
    pageSize: 15,
}

@inject('manageStore', 'userStore')
@observer
export default class DivideDetail extends Component {
    state = {
        // 点击某个小组详情，模态框中的表格数据
        topic_data: [],
        // 控制模态框的开关
        visible: false,
        // 表格中搜索功能
        searchText: '',
        searchedColumn: '',
    }

    // 模态框
    showModal = async (record) => {
        console.log(record.gid)
        let param = { "group_id": record.gid }
        let group_info = await this.props.manageStore.topicDetailList_fgp(param);
        // console.log(group_info)
        this.setState({
            visible: true,
            topic_data: group_info,
        });
    };

    // 表格中的搜索功能
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`请输入关键字查询`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        搜索
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        重置
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text => text
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    @computed
    get finalDefenseGroup() {
        return this.props.manageStore.finalDefenseGroup;
    }

    @computed
    get usr() {
        return this.props.userStore.usr;
    }

    async componentDidMount() {
        await this.props.manageStore.getGroupList_fgp({ "ide": this.usr.uid });
    }

    // 表格中的删除 
    handleDelete = async (key) => {
        let res = await this.props.manageStore.deleteGroup_fgp({ "gid": key });
        if (res && res.code === 200) {
            message.info("删除成功！")
            // 刷新分组列表
            await this.props.manageStore.getGroupList_fgp({ "ide": this.usr.uid });
            await this.props.manageStore.getTeacherList_fgp({ "ide": this.usr.uid });
            // await this.props.manageStore.getTopicListDe_fgp({ "ide": this.usr.uid, "status": 2 });
            await this.props.manageStore.getTopicList_fgp({ "ide": this.usr.uid, "status": 1 });
        } else {
            message.info("删除失败！")
        }
    };

    render() {
        const columns = [
            {
                title: '序号',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '组长',
                dataIndex: 'leader',
                key: 'leader',
                ...this.getColumnSearchProps('leader'),
            },
            {
                title: '组员',
                dataIndex: 'members',
                key: 'members',
                ...this.getColumnSearchProps('members'),
            },
            {
                title: '时间',
                dataIndex: 'time',
                key: 'time',
                ...this.getColumnSearchProps('time'),
            },
            {
                title: '地点',
                dataIndex: 'address',
                key: 'address',
                ...this.getColumnSearchProps('address'),
            },
            {
                title: '答辩课题',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <a onClick={() => this.showModal(record)}>查看</a>
                    </Space>
                ),
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) =>
                    this.finalDefenseGroup.group_list.length >= 1 ? (
                        <Popconfirm title="是否删除该小组？" onConfirm={() => this.handleDelete(record.gid)}>
                            <a>删除</a>
                        </Popconfirm>
                    ) : null,
            },
        ];

        const topic_columns = [
            {
                title: '答辩课题',
                dataIndex: 'topic',
                key: 'topic',
                ellipsis: {
                    showTitle: false,
                },
                render: topic => (
                    <Tooltip placement="topLeft" title={topic}>
                        {topic}
                    </Tooltip>
                ),
                // ...this.getColumnSearchProps('topic'),
            },
            {
                title: '学生姓名',
                dataIndex: 'sName',
                key: 'sName',
                ...this.getColumnSearchProps('sName'),
            },
            {
                title: '班级',
                dataIndex: 'class',
                key: 'class',
                ...this.getColumnSearchProps('class'),
            },
            {
                title: '指导老师',
                dataIndex: 'tName',
                key: 'tName',
                ...this.getColumnSearchProps('tName'),
            },
        ];

        return (
            <div class="g-div-dtl">
                <div className="m-table">
                    <Table pagination={paginationProps} dataSource={this.finalDefenseGroup.group_list} columns={columns} />
                </div>


                <Modal
                    title="答辩课题详情"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={false}
                    width={800}
                    className="m-div-dtl-modal"
                >
                    <div className="table">
                        <Table pagination={topic_paginationProps} dataSource={this.state.topic_data} columns={topic_columns} size="small" />
                    </div>
                </Modal>

            </div>
        );
    }
}