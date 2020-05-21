const express = require('express');
const mysql = require('mysql');
const router = new express.Router();

router.all('*',(req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");   // 跨域处理 
    next();
})

let data = {
    test: "i am test!"
}
let mysqlPool = mysql.createPool({
    host: '10.45.70.17', 
    user: 'dev', 
    port: 3306,
    password: 'iwhaleC@', 
    database: 'devcoper_330200'
});

router.get('/get', (req, res, next) => {
    res.json(data);
});

router.get('/getInter',function (req,res,next) {
    mysqlPool.getConnection(function (err, connection) {
        let sql='SELECT * FROM `adm_devcoper_bas_rdnet_inter_info`;'
        connection.query(sql, function (err, data) {
            console.log(data);
            let result={data:deCodeData(data)}
            res.json(result);
        })
    })
})

//过滤数据
function deCodeData(data) {
    let ary=[];
    for (let index = 0; index < data.length; index++) {
        const datai = data[index];
        ary.push({id:datai.addressid,name:datai.inter_name})
    }
    return ary;
}


module.exports = router;