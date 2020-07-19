

const express = require('express');
const router = express.Router();
const callProc = require('../util').callProc

router.post('/getTopicList', async (req, res) => {
    let sql = `CALL PROC_CAL_GET_STU_SELECT_TOPIC(?)`;
    let params = req.body;
    console.log(params)
    callProc(sql, params, res, (r) => {
        res.status(200).json({ code: 200, data: r, msg: '取课题列表' })
    });
});

router.post('/getStuInfo', async (req, res) => {
    let sql = `CALL PROC_CAL_ONE_TOPIC(?)`;
    let params = req.body;
    console.log(params)
    callProc(sql, params, res, (r) => {
        res.status(200).json({ code: 200, data: r, msg: '取学生课题' })
    });
});

router.post('/addStuTopic', async (req, res) => {
    let sql = `CALL PROC_ADD_ONE_STU_TOPIC(?)`;
    let params = req.body;
    console.log(params)
    callProc(sql, params, res, (r) => {
        res.status(200).json({ code: 200, data: r, msg: '增加学生课题' })
    });
});

router.post('/delStuTopic', async (req, res) => {
    let sql = `CALL PROC_DEL_ONE_STU_TOPIC(?)`;
    let params = req.body;
    console.log(params)
    callProc(sql, params, res, (r) => {
        res.status(200).json({ code: 200, data: r, msg: '删除学生课题' })
    });
});
router.post('/calStuDoubleSlelctSucc', async (req, res) => {
    let sql = `CALL PROC_CAL_ONE_STU_DOUBLE_SELECT_SUCC(?)`;
    let params = req.body;
    console.log(params)
    callProc(sql, params, res, (r) => {
        if (r.length != 0) {
            res.status(200).json({ code: 200, data: r, msg: '获取成功 传学生id条件 状态码不为空 不为0 1 2 输出 topic里面的所有字段' })
        }
        else {
            res.status(200).json({ code: 200, data: null, msg: '数据为空 传学生id条件  状态码不为空 不为0 1 2 输出 topic里面的所有字段' })
        }

    });
});
router.post('/calStuTopicStateZero', async (req, res) => {
    let sql = `CALL PROC_CAL_ONE_STU_TOPIC_WITH_STATUS_ZERO(?)`;
    let params = req.body;
    console.log(params)
    callProc(sql, params, res, (r) => {
        if (r.length != 0) {
            res.status(200).json({ code: 200, data: r, msg: '获取成功 传学生id条件 状态码为0 输出 topic里面的所有字段' })
        }
        else {
            res.status(200).json({ code: 200, data: null, msg: '数据为空 传学生id条件 状态码为0 输出 topic里面的所有字段' })
        }

    });
});
router.post('/calStuTopicStateTwo', async (req, res) => {
    let sql = `CALL PROC_CAL_ONE_STU_TOPIC_WITH_STATUS_TWO(?)`;
    let params = req.body;
    console.log(params)
    callProc(sql, params, res, (r) => {
        if (r.length != 0) {
            res.status(200).json({ code: 200, data: r, msg: '获取成功 传学生id条件 状态码为2 输出 topic里面的所有字段' })
        }
        else {
            res.status(200).json({ code: 200, data: null, msg: '数据为空 传学生id条件 状态码为2 输出 topic里面的所有字段' })
        }

    });
});
router.post('/getStuTopicStatus', async (req, res) => {
    let sql = `CALL PROC_CAL_ONE_TOPIC_STATUS(?)`;
    let params = req.body;
    console.log(params)
    callProc(sql, params, res, (r) => {
        console.log(r)
        if (r.length != 0) {
            res.status(200).json({ code: 200, data: r, msg: '数据获取成功 取学生课题' })
        } else {
            res.status(200).json({ code: 200, data: null, msg: '数据获取为空 取学生课题 ┗|｀O′|┛ 嗷~~' })
        }

    });
});

router.post('/delFile', async (req, res) => {
    let sql = `CALL PROC_DEL_TOPIC_FILE(?)`;
    let params = req.body;
    console.log(params)
    callProc(sql, params, res, (r) => {
        console.log(r)

        res.status(200).json({ code: 200, data: r, msg: '删除字段成功' })

    });
});

/**
 * @description: 查看指导意见
 * @param {sid: str} 
 * @return: 
 */
router.post('/getGuidance', async(req, res) => {
    let sql = `CALL PROC_GET_GUIDANCE(?)`;
    let params = req.body;
    console.log(params);
    callProc(sql, params, res, (r) => {
        console.log(r);
        res.status(200).json({ code: 200, data: r, msg: '查看指导意见成功' });
    })
})

/**
 * @description: 获取学生允许查看的公告
 * @param { sid: str } 
 * @return: 
 */
router.post('/getStudentNotice', async(req, res) => {
    let sql = `CALL PROC_GET_STUDENT_NOTICE(?)`;
    let params = req.body;
    console.log(params);
    callProc(sql, params, res, (r) => {
        console.log(r);
        var read = [];
        var unread = [];
        r.forEach(element => {
            if (element['check_flag'] == 1) {
                read.push(element);
            } else {
                unread.push(element);
            }
        });
        var reads = [read, unread];
        res.status(200).json({ code: 200, data: reads, msg: '成功获取已读与未读公告' });
    })
})

/**
 * @description: 获取当前所在阶段及截止时间
 * @param {} 
 * @return: { state: int, time: str, title: str }
 */
router.get('/getCurrentState', async(req, res) => {
    let sql = `CALL PROC_GET_CURRENT_STATE`;
    let params = {};
    callProc(sql, params, res, (r) => {
        switch (r[0]['state']) {
            case 1:
                r[0].title = '任务书';
                break;
            case 2:
                r[0].title = '开题中期';
                break;
            case 3:
                r[0].title = '论文审核';
                break;
            case 4:
                r[0].title = '论文答辩';
                break;
            case 5:
                r[0].title = '成绩审定';
                break;
            default:
                break;
        }
        console.log(r);
        res.status(200).json({ code: 200, data: r, msg: '成功获取当前阶段与截止时间'});
    })
})

/**
 * @description: 标记公告为已读
 * @param { uid: str, ann_id: str } 
 * @return: 
 */
router.post('/UpdateStudentNotice', async(req, res) => {
    let sql = `CALL PROC_UPDATE_STUDENT_NOTICE(?)`;
    let params = req.body;
    console.log(params);
    callProc(sql, params, res, (r) => {
        res.status(200).json({ code: 200, data: r, msg: '成功将公告标记为已读' });
    })
})

/**
 * @description: 所有阶段及其截止时间
 * @param {} 
 * @return: { state: int, time: str, title: str }
 */
router.post('/getAllStates', async(req, res) => {
    let sql = `CALL PROC_GET_ALL_STATES`;
    let params = {};
    callProc(sql, params, res, (r) => {
        r.forEach(element => {
            switch (element['state']) {
                case 1:
                    element.title = '任务书';
                    break;
                case 2:
                    element.title = '开题中期';
                    break;
                case 3:
                    element.title = '论文审核';
                    break;
                case 4:
                    element.title = '论文答辩';
                    break;
                case 5:
                    element.title = '成绩审定';
                    break;
                default:
                    break;
            }
        });
        console.log(r);
        res.status(200).json({ code: 200, data: r, msg: '成功返回所有阶段及其截止时间' });
    })
})

// 获取所有站内信，未读 + 已读
// params: { uid: str }
router.post('/getStudentMessages', async(req, res) => {
    let sql = `CALL PROC_GET_ALL_MESSAGES(?)`;
    let params = req.body;
    console.log(params);
    callProc(sql,params, res, (r) => {
        console.log(r);
        res.status(200).json({ code: 200, data: r, msg: '成功获取所有站内信' });
    })
})

// 将未读的站内信置为已读
// params: { uid: str }
router.post('/updateStudentMessageRead', async(req, res) => {
    let sql = `CALL PROC_UPDATE_STUDENT_MESSAGE_READ(?)`;
    let params = req.body;
    console.log(params);
    callProc(sql, params, res, (r) => {
        res.status(200).json({ code: 200, data: r, msg: '成功获取将未读站内信置为已读' });
    })
})

module.exports = router;