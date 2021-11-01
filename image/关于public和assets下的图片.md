##图片放在public和assets文件夹下的区别🥑
图片调用时，不管是public下，还是asset下都可以显示。但是，其实还是有区别的。
###一个差异是webpack打包
assets下的是会被webpack编译，如果我们f12打开elements可以看到如果来源是public下的图片是没有hash值(一些随机字符)的，assets有hash值，这是被编译的一个标志。
#####webpack打包加hash值原因
webpack打包会给静态资源（图片，css和html等）加上hash值的原因是当我们多次打包部署线上后，难免有时改动不大，文件名称没什么变化，因为客户浏览器缓存了之前的文件，那么会出现个别样式不更新的状态，而加上hash值即告诉浏览器文件其实已经是新的(文件名字不一样了)，你应该用新的样式，这样客户就不用强制刷新才能看到修改后的样式。
###线上和本地的区别
要注意的是因为public下的文件是需要注意本地和线上路径的区别的，而assets则不用。可以通过process.env.NODE_ENV这个变量来判断是否是生产（线上）环境还是开发（本地）环境，通常写
`   process.env.NODE_ENV === 'production'? '/XXX/some.png': '/some.png' //线上环境前一个路径需要带上部署的线上url`
###动态加载图片路径
webpack4不支持动态加载assets下的图片，所以可以把图片放到public下以免找不到图片。