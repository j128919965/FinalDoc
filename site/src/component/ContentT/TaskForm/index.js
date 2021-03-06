import { inject, observer } from 'mobx-react';
import { Form, Input, Button, Checkbox, DatePicker, Space, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import BaseActions from '../../BaseActions';
import * as urls from '../../../constant/urls';
import style from './index.scss'

const { RangePicker } = DatePicker;

@inject('userStore')
@observer
export default class TaskForm extends BaseActions {

  onFinish = async val => {

    if(!val.schedule){
      message.error("您未添加进度安排！");
      return;
    }
    let x = await this.post(urls.API_TEACHER_SAVE_TASK,{data:val,pid:this.props.pid})
    if(x.code==200){
      message.success('提交成功')
      this.props.userStore.insertMessageToOne({from:this.usr.id,to:id,context:"教师已发布任务书，等待审核",type:1})
    }else{
      message.error('提交错误，请检查网络')
    }
    
    this.props.close();
    this.props.freshList();

    
  }

  onFinishFailed = async  val => {
    message.error("请确认信息填写完整！")
  }

  render = () => {
    return (
      <div data-component="taskform">
        <div className="m-task-outer">
          <Form
            layout="vertical"
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            className="taskform"
            autoComplete="off"
          >
            <div className="m-task-inner">

              <h3>1、总体目标及性能（参数）要求</h3>

              <Form.Item
                name="target"
                rules={[{ required: true, message: '请输入 总体目标及性能（参数）要求 ！' }]}
              >
                <Input.TextArea rows={5} />
              </Form.Item>

              <h3>2、研究内容及拟采用的技术路线</h3>
              <Form.Item
                label="研究内容"
                name="learn_content"
                rules={[{ required: true, message: '请输入研究内容 ！' }]}
              >
                <Input.TextArea rows={5} />
              </Form.Item>

              <Form.Item
                label="技术路线"
                name="technical_route"
                rules={[{ required: true, message: '请输入技术路线 ！' }]}
              >
                <Input.TextArea rows={5} />
              </Form.Item>

              <h3>3、参考文献（15篇以上，其中英文至少2篇）</h3>
              <Form.Item
                name="reference"
                rules={[{ required: true, message: '请输入参考文献 ！' }]}
              >
                <Input.TextArea rows={5} />
              </Form.Item>

              <h3>4、起止日期及进度安排（包括论文各阶段的内容和时间安排的要求）</h3>

              <Form.Item
                label="起止日期"
                name="ft"
                rules={[{ required: true, message: "请选择起止日期！" }]}
              >
                <RangePicker style={{ width: 250 }} />
              </Form.Item>


              <Form.List

                name="schedule"
              >
                {(fields, { add, remove }) => {
                  return (
                    <div>
                      {fields.map((field, index) => (
                        <Form.Item
                          label={index === 0 ? '进度安排' : ''}
                          required={true}
                          style={{ marginBottom: 0 }}
                          rules={[{ required: true, message: "请选择进度安排！", }]}
                        >
                          <div style={{ display: 'flex' }}>
                            <Form.Item
                              {...field}
                              name={[field.name, 'time']}
                              fieldKey={[field.fieldKey, 'time']}
                              rules={[{ required: true, message: "请选择起止时间！", }]}
                            >
                              <RangePicker style={{ width: 250 }} />
                            </Form.Item>

                            <Form.Item
                              {...field}
                              name={[field.name, 'content']}
                              fieldKey={[field.fieldKey, 'content']}
                              rules={[{ required: true, message: "请输入内容！", }]}

                            >
                              <Input.TextArea
                                style={{ width: 400 }}
                                autoSize={{ minRows: 1, maxRows: 7 }}
                                placeholder="请输入安排内容"
                              />
                            </Form.Item>

                            {
                              fields.length > 1 &&
                              <MinusCircleOutlined
                                style={{ margin: '0 0 0 8px', fontSize: "18px" }}

                                onClick={() => {
                                  remove(field.name);
                                }}
                              />
                            }

                          </div>

                        </Form.Item>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => { add(); }}
                          style={{ width: '80%' }}
                        >
                          <PlusOutlined /> 新增进度安排
                        </Button>
                      </Form.Item>
                    </div>
                  );
                }}
              </Form.List>

              <div className="m-task-footer" style="display:none">
                <Form.Item>

                  <Button type="primary" ref={x => this.okbtn = x} htmlType="submit">
                    发布
                  </Button>

                </Form.Item>
              </div>
            </div>
          </Form>
          <div className="m-task-footer">
            <Form.Item>

              <Button type="primary" onClick={() => { this.okbtn.click() }} style={{ marginRight: 20 }}>
                发布
              </Button>
              <Button type="dashed" onClick={this.props.close} >
                取消
              </Button>

            </Form.Item>
          </div>
        </div >
      </div>
    )
  }
}