
//引入https模块
var https = require('https');

//引入cheerio
var cheerio = require('cheerio');

var request = require('request');

//目标url
var url = 'https://www.zhipin.com/c101280100/e_102/?query=%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91&ka=sel-exp-102';


//发送get请求
https.get(url,function(res){
   //程序发出http请求的时候，函数会立刻执行从res返回的已经被解析的http报文
    var html = '';
    //监听它
    res.on('data',function(chunk){
        //拼接传输过来的报文，分段传输的，并不是一次性全部传输过来
        html += chunk;
    });

    //所有信息传输完成后执行
    res.on('end',function(){
        //解析DOM字符串
        var $ = cheerio.load(html);
        //获取职位列表ul标签
        var joblist = $('.job-list ul');
        //console.log(joblist);

        //存放职位
        var alljob = [];

        //遍历职位列表信息
        joblist.find('li').each(function (item) {
            var job = $(this);
            //职位名
            var job_name = job.find('.info-primary .job-title').text();
            //薪资
            var job_money= job.find('.red').text();
            //公司名
            var company_name  = job.find('.info-company a').text();
            //类别
            var company_type = job.find('p').text();

            //存储信息
            alljob.push({
                job_name: job_name,
                job_money: job_money,
                company_name: company_name,
                company_type: company_type
            });
            console.log(alljob);
        });
    });

}).on('error',function(err){   //对程序意外进行处理
    console.log(err.message);
});


/*
//request方法
request(url,function(err,res,body){
    if(!err && res.statusCode == 200){
        //console.log(body);
        //解析DOM字符串
        var $ = cheerio.load(body);
        //获取职位列表ul标签
        var joblist = $('.job-list ul');
        //console.log(joblist);

        //存放职位
        var alljob = [];

        //遍历职位列表信息
        joblist.find('li').each(function (item) {
            var job = $(this);
            //职位名
            var job_name = job.find('.info-primary .job-title').text();
            //薪资
            var job_money= job.find('.red').text();
            //公司名
            var company_name  = job.find('.info-company a').text();
            //类别
            var company_type = job.find('p').text();

            //存储信息
            alljob.push({
                job_name: job_name,
                job_money: job_money,
                company_name: company_name,
                company_type: company_type
            });
            console.log(alljob);
        });
    }else{
        console.log(err);
    }
});
*/
