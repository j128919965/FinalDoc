import { Component } from 'preact'
import { inject } from 'mobx-react'
import { Form, Input, Button, Checkbox, Modal,Space} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { message,Select } from 'antd'
const { Option } = Select;
import "./style.css"
const { confirm } = Modal;
function onChange(value) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(val) {
  console.log('search:', val);
}

// const children = [];
// for (let i = 10; i < 36; i++) {
//   children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
// }

 
function formReset() {
  document.getElementById("basic").reset()
   
}

function showConfirm() {
  confirm({
    title: 'Do you Want to delete these items?',
    icon: <ExclamationCircleOutlined />,
    content: 'Some descriptions',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}showConfirm
  
 

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

 
  const onFinish = values => {
    console.log('Success:', values);
     
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
    
  };


 

@inject('manageStore')
export default class Home extends Component {
  state = {
    tea_name_2: [],
    // id,tid,topic
    topic_name: [],
    select_leader:" ",
    select_member: [],
    new_arr:[]
  }

 

  async componentDidMount() {
    let tea = await this.props.manageStore.getTeaList()
    console.log(this.state)
    
    let teaName = []
    tea.data.map((item) =>
      teaName.push({ tid: item.uid, value: item.uid + " " + item.name })
    )
    // console.log(topic)
    this.setState({ tea_name_2: teaName}, () => { message.info("ok") });

  }
  

 

  

  addSelectTeacher = (value) => {
    console.log(`selected ${value}`);
    this.setState({
      select_leader: value
    }, () => { console.log(this.state.select_leader) })
  
  }

  handleChange=(value) =>{
    //console.log(`selected ${value}`);
    this.setState({
      select_member:value
    }, () => { console.log(this.state.select_member,888) })
    

  }
  
  


	render(_,{new_arr}) {
    new_arr = [];
    for (let i of this.state.tea_name_2) {
      if (this.state.select_member.indexOf(i.value) == -1) {
        new_arr.push(i.value);

      }
    }
    
		return (
			<div className="orig">
        <div className="orig-title">组织开题答辩</div>
        
        <div className="orig-form"> 
        <Form
        
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues=""
          
        >
          <Form.Item
            label="组长"
            name="leader"
            rules={[{ required: true, message: '请选择组长' }]}
          >
            <Select
              showSearch
              style={{ width: 600 }}
              placeholder="请选择教师"
              optionFilterProp="children"
              onChange={this.addSelectTeacher}
              onFocus={onFocus}
              onBlur={onBlur}
              onSearch={onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0


              }
            >
              {
               // console.log(c,"shuju9999"),
                new_arr.map((item, i) =>
               
                
                 <Select.Option key={item}>{item}</Select.Option>
              
              )}
             
               


            </Select>
          </Form.Item>

          <Form.Item
            label="组员"
              colon="false"
            name="member"
            rules={[{ required: true, message: '请选择组员' }]}
          >
           
              <Select
                mode="multiple"
                style={{ width: 600 }}
                placeholder="请选择教师"
                
                onChange={this.handleChange}
              >
                {this.state.tea_name_2.map((item, i) =>
                  // <Select.Option key={item.id + " " + item.topic}>{item.topic}</Select.Option>
                  (item.value !== this.state.select_leader) && <Select.Option key={item.value}>{item.value}</Select.Option>
                
                )}
              </Select>
            
          
          </Form.Item>



          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit"
                onClick={showConfirm}>
              提交
        </Button>
        
          </Form.Item>
        </Form>
        </div>
			</div>
		);
	}
}
