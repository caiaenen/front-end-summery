# echarts常见需注意的问题🍒
echarts是常用的图表库，用于展示数据。echarts在使用时需要注意一些问题。如下：
### echart的resize（根据视图调整echarts大小）
echart有resize方法，使用如下：
``` 
    this.echartInstance = echarts.init(XXX) // XXX为chart初始化的图表dom
    this.echartInstance.resize() 
```

需要注意的是图表是不会主动根据当前dom的长短变化而变化，因此需要在document上监听是否拖动了浏览器窗口，改变视图宽度。等浏览器视图变化的时候调用resize方法即可。使用如下：
``` 
window.addEventListener('resize', function() { 
        that.echartInstance.resize() 
    } ) 
```

### echarts不是动态显示的
当绘制图表的数据发生变化，图不会发生变化。我们需要手动的清数据再填充数据才会发生变化。如下：
``` 
    this.echartInstance.clear()
    this.echartInstance.setOption(xxx) //xxx为echarts配置项 
```

### 使用多语言时
当图表显示多语言时，需要用模板参数才能被识别。如下：
```
     name:  `${this.$t('dashboard.power_generation')}: ` //name是option的一个配置项

```
动态显示多语言(不用刷新界面就可以切换多语言)，尤其是配置项(option)中的提示(tooltip)，可以通过提示中的formatter自定义提示。如下：
```
    option: {
        color:'xx',
        tooltip: {
            trigger: 'xxx',
            formatter: (params)=> {
            return  `${$t('dashboard.power_generation')}} //模板变量
        }
        ...
    }
     
```
### 自定义显示图表样式
往往当柱状图，折线图，饼图等不符合我们的要求时，需要自定义图表展示数据。series数组中增加一个type为custom的对象，在renderItem函数中会返回两个参数，一个params,主要的作用是提供当前数据信息（如 seriesIndex、dataIndex 等等）和坐标系的信息（如坐标系包围盒的位置和尺寸）;一个api提供一些开发者可调用的方法集合（如 api.value()、api.coord())。如：api.value(0)会返回当前要展示的data第一个维度的值。
#### api.value(0)的取值问题
```
    series: [
          {
            type: 'custom',
            tooltip: {
              show: false
            },
            renderItem:function (params, api) {
           
            return  {
             
            },
            data: [{'11','22'},{'33','44'}] //api.value(0)分别获取的是11和33,当data:['221','2']时，分别获取的是1，2是index值
          }
        ],

```
当data数组里不是对象时，第一个维度的值是每个值的index。
#### api.coord
该函数的作用是把提供的数值转化成图表的坐标点。需要提供要转换的x,y的值。如：
```
    const point = api.coord([
        api.value(0),  //x的值
        0 //y的值
    ])
```
官方一个很好的自定义例子<https://echarts.apache.org/examples/zh/editor.html?c=wind-barb>