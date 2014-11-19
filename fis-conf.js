//Step 1. 取消下面的注释开启simple插件，注意需要先进行插件安装 npm install -g fis-postpackager-simple
fis.config.set('modules.postpackager', 'simple');

//通过pack设置干预自动合并结果，将公用资源合并成一个文件，更加利于页面间的共用

//Step 2. 取消下面的注释开启pack人工干预
fis.config.set('pack', {
    'pkg/lib.js': [
        '/js/**.js'
    ],
    'pkg/all.css': [
    	'css/*.css'
    ]
});

//Step 3. 取消下面的注释可以开启simple对零散资源的自动合并
// fis.config.set('settings.postpackager.simple.autoCombine', true);


//Step 4. 取消下面的注释开启图片合并功能
// fis.config.set('roadmap.path', [{
//     reg: '**.css',
//     useSprite: true
// }]);
// fis.config.set('settings.spriter.csssprites.margin', 20);

fis.config.set('static','/static1');
fis.config.set('roadmap.path',[
    {
        reg: /^\/css\/(.*)/i,
        id : '$1',
        // release: '/static/$1'
        release: '${static}/$1'
        // query: '?t=20140620',
        // url: '/$1'
    }
]);


fis.config.merge({
    roadmap : {
        //所有静态资源文件都使用 http://s1.example.com 或者 http://s2.example.com 作为域名
        domain : 'http://s1.example.com/aaa'
    }
});


//fis-conf.js
fis.config.merge({
    deploy : {
        //使用fis release --dest remote来使用这个配置
        remote : {
            //如果配置了receiver，fis会把文件逐个post到接收端上
            receiver : 'http://web.com/fis-receiver.php',
            //从产出的结果的static目录下找文件
            from : '/static',
            //保存到远端机器的/home/fis/www/static目录下
            //这个参数会跟随post请求一起发送
            to : '/home/fis/www/',
            //通配或正则过滤文件，表示只上传所有的js文件
            include : '**.js',
            //widget目录下的那些文件就不要发布了
            exclude : /\/widget\//i,
            //支持对文件进行字符串替换
            replace : {
                from : 'http://www.online.com',
                to : 'http://www.offline.com'
            }
        },
        //名字随便取的，没有特殊含义
        local : {
            //from参数省略，表示从发布后的根目录开始上传
            //发布到当前项目的上一级的output目录中
            to : '../output'
        },
        //也可以是一个数组
        remote2 : [
            {
                //将static目录上传到/home/fis/www/webroot下
                //上传文件路径为/home/fis/www/webroot/static/xxxx
                receiver : 'http://www.example.com/path/to/receiver.php',
                from : '/static',
                to : '/home/fis/www/webroot'
            },
            {
                //将template目录内的文件（不包括template一级）
                //上传到/home/fis/www/tpl下
                //上传文件路径为/home/fis/www/tpl/xxxx
                receiver : 'http://www.example.com/path/to/receiver.php',
                from : '/template',
                to : '/home/fis/www/tpl',
                subOnly : true
            }
        ]
    }
});