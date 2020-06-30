import { Input, Select, Button, Switch, InputNumber, message } from 'antd';
const { Option } = Select;
const { TextArea } = Input;
import './index.css'
import BaseActions from '../../BaseActions';
import * as urls from '../../../constant/urls'
const { Search } = Input;

let me = {
  uid: '20100119'
}
var users = [];

class Publish extends BaseActions {
  state = {
    stuData: users,
    selectStu: false,
    type:'工程设计',
    selected_stu_data:null,
    area:[],
    areaList:[]
  }

  constructor(props) {
    super(props)
  } 

  setBlocks= async ()=>{
    if(!!this.props.tid){
      let data = await this.post(urls.API_SYS_GET_FUUL_TOPIC_BY_ID,{pid:this.props.tid});
      data = data.data[0];
      this.name.value = data.topic;
      this.setState({type:data.type,area:data.area})
      this.note.setState({value:data.note})
      if(data.sid!==null){
        if(!this.state.selectStu){
          this.switch.click();
        }
        this.setState({stuData:[{uid:data.sid,name:data.name}],selected_stu_data:data.sid})
      }
    }else{
      this.clear();
    }
  }

  async componentDidMount(){  
    let areaData = await this.post(urls.API_SYS_GET_TEACHER_AREA_LIST,{tid:me.uid});
    this.setState({areaList:areaData.data,area:areaData.data.map((x)=>{return x.id})})
  }

  clear = e => {
    this.name.value = "";
    this.note.setState({ value: "" })
    this.setState({
      selected_stu_data:null,
      type:'工程设计',
      area:[]
    })
  }

  handleSearchStu = async (e) => {
    this.setState({
      selected_stu_data:e
    },async ()=>{
      let id = this.state.selected_stu_data;
      if(!/^\d+$/.test(id)){
        message.error("请输入纯数字！");
        return;
      }
      let data = await this.post(urls.API_SYS_GET_STU_BY_LIKEID,{num :id});
      this.setState({stuData:data.data})
    }
    );
  }

  handleSwitchChange = () => {
    let s = !(this.state.selectStu);
    this.setState({ selectStu: s })
  }

  handleStuChange = (e)=>{
    this.setState({
      selected_stu_data:e
    })
  }

  handleTypeChange=(e)=>{
    this.setState({
      type:e
    })
  }

  handleAreaChange=(e)=>{
    this.setState({
      area:e
    },()=>{console.log(this.state.area)})
  }

  postInfo = async () => {
    let data;
    if(this.state.selectStu){
      let addr = this.state.selected_stu_data;
      if(addr<13){
        message.error("请选择学生！")
        return;
      }else{
        data = {
          //TODO
          tea_id:me.uid,
          name:this.name.value,
          type:this.type.base.textContent,
          note:this.note.state.value,
          stuId:this.state.selected_stu_data,
          topic_id:this.props.tid==null?"":this.props.tid,
          area:this.state.area
        };
      }
    }else{
      data={
        tea_id:me.uid,
        name:this.name.value,
        type:this.state.type,
        note:this.note.state.value,
        stuId:null,
        topic_id:this.props.tid==null?"":this.props.tid,
        area:this.state.area
      }
    }
    console.log(data)
    let s = await this.post(urls.API_SYS_POST_TOPIC_INFO,data);
    console.log(s);
    this.props.close();
  }

  render() {
    return (
      <div className="publish-block">
        
          <div className="input-line">
            <div className="input-left"><span>课</span><span>题</span><span>名</span><span>称</span></div>
            <div className="input-right">
              <input
                style={{ width: 400 }}
                ref={name => this.name = name}
                className="have-placehoder" type="text" placeholder="请输入课题名" />
            </div>
          </div>
          <div className="input-line">
            <div className="input-left"><span>项</span><span>目</span><span>类</span><span>别</span></div>
            <div className="input-right">
              <Select
                ref={type => this.type = type}
                className="have-placehoder"
                value={this.state.type}
                showSearch
                onChange={this.handleTypeChange}
                defaultValue={"工程设计"}
                style={{ width: 400 }}
                placeholder="选择项目类别"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="工程设计">工程设计</Option>
                <Option value="命题设计">命题设计</Option>
                <Option value="软件设计">软件设计</Option>
                <Option value="毕业设计">毕业设计</Option>
              </Select>
            </div>
          </div>
          <div className="input-line">
            <div className="input-left"><span>研</span><span>究</span><span>方</span><span>向</span></div>
            <div className="input-right">
              <Select
                ref={area => this.area = area}
                className="have-placehoder"
                value={this.state.area}
                showSearch
                mode="multiple"
                onChange={this.handleAreaChange}
                style={{ width: 400 }}
                placeholder="选择研究方向"
                optionFilterProp="children"
                filterOption={(input, option) =>  
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {this.state.areaList.map((x)=><Option value={x.id}>{x.name}</Option>
                )}
              </Select>
            </div>
          </div>
          <div className="input-line">
            <div className="input-left"><span>简</span>介</div>
            <div className="input-right">
              <TextArea
                ref={note => this.note = note}
                style={{ width: 400 }} rows={10} placeholder="输入您的简介" className="have-placehoder" />
            </div>
          </div>

          <div className="input-line">
            <div className="input-left"><span>手</span><span>动</span><span>选</span><span>择</span><span>学</span><span>生</span></div>
            <div className="input-right">
              <Switch 
              ref={e=>this.switch=e}
              checkedChildren="开启" 
              unCheckedChildren="关闭" 
              onChange={this.handleSwitchChange} />
            </div>
          </div>

          {this.state.selectStu &&
            <>
            <div className="input-line">
              <div className="input-left"><span>选</span><span>择</span><span>学</span><span>生</span></div>
              <div className="input-right">

                <Select
                  ref={stu => this.stuId = stu}
                  value={this.state.selected_stu_data}
                  className="have-placehoder"
                  style={{ width: 400 }}
                  placeholder="按学号搜索学生"
                  optionFilterProp="children"
                  onChange={this.handleStuChange}
                  showSearch
                  onSearch={this.handleSearchStu}
                >
                  {
                    this.state.stuData.map((x) => <Option value={x.uid}>{x.name} {x.uid}</Option>)
                  }
                </Select>
              </div>
            </div>
            </>
          }

          <div className="input-line">
            <div className="input-left"></div>
            <div className="input-left">
              <Button type="primary" onClick={this.postInfo}>提交</Button>
            </div>
            <div className="input-left">
              <Button onClick={this.clear}>清空</Button>
            </div>
          </div>

      </div>
    )
  }
}



export default Publish;