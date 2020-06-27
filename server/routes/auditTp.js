const express = require('express');
const router = express.Router();
const callProc = require('../util').callProc
router.post('/getTopicList', async (req, res) => {
    let sql = `CALL PROC_CAL_UNCHECKED_TASK(?)`;
    let params = req.body;
    console.log(params)
    callProc(sql, params, res, (r) => {
        res.status(200).json({ code: 200, data: r, msg: '取获取该教师可审核，且未审核的课题' })
    });
});
router.post('/getTopicTypes', async (req, res) => {
    let sql = `CALL PROC_CAL_TASK_TOPIC_TYPE(?)`;
    let params = req.body;
    console.log(params)
    callProc(sql, params, res, (r) => {
        res.status(200).json({ code: 200, data: r, msg: '所有选题类型' })
    });
});

router.post('/searchTopic', async (req, res) => {
    let sql = `CALL PROC_CAL_TOPIC_WITH_FACTOR(?)`;
    let params = req.body;
    console.log(params)
    callProc(sql, params, res, (r) => {
        res.status(200).json({ code: 200, data: r, msg: '获取满足条件的该教师可审核，且未审核的命题' })
    });
});
router.post('/checkUpdateYes', async(req, res) => {
    let sql = `CALL PROC_CHECK_UPDATE_YES_M(?)`;
    let params = req.body;
    callProc(sql, params, res, (r) => {
      res.status(200).json({code: 200, data: r, msg: '审核方通过该课题'})
    });
  });
  
  
  router.post('/checkUpdateNo', async(req, res) => {
    let sql = `CALL PROC_CHECK_UPDATE_NO_M(?)`;
    let params = req.body;
    callProc(sql, params, res, (r) => {
      res.status(200).json({code: 200, data: r, msg: '审核方打回该课题'})
    });
  });
  

module.exports = router