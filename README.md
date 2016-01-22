# ReactProject

安装 $ npm install

1：开发
执行 $ gulp


2：生产
执行 $ gulp build


关于项目：

    1.main.js配置路由

    2.App.jsx是路由中的写法

    3.scss
        1) reset.scss在App.jsx中引入且仅此一次。
        2) common.scss在App.jsx中引入且仅此一次。
        3) Tool.scss在每一个component中都可以作为“工具集公共项”来引入,不引入不会添加到css文件中，是以变量形式存在

    4.js和jsx
        1) 通用的js放在app/components/common/js目录下
        2) mixin放需要mix到component中的公共组件，详情参考AlertMixin

	5.html
		index_production.html是在执行gulp build命令时用的
		
	6.dist目录
		是最终gulp build的结果
	
	