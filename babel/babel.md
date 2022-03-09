# babel
babel就是把一些浏览器不能理解的es6语法的js转成旧版本的js。
babel插件就是在转换步骤接收 AST 并对其进行遍历，在此过程中对节点进行添加、更新及移除等操作。 这是 Babel 或是其他编译器中最复杂的过程。用babel-core函数,需要返回一个带visitor的对象，visitor需要对ast进行增删改操作。