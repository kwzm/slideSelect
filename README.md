# slideSelect
下滑展开单选/多选插件
###效果图
![img](https://raw.githubusercontent.com/kwzm/slideSelect/master/img/effectPicture1.jpg)
##使用方法
- 1、引入文件
  - 引入jQuery
  - 引入slideSelect.js
  - 引入slideSelect.css
- 2、填写dom结构  
`<span id="slideSelect1">点击展开1</span>`  
`<div id="expend-box1"></div>`  
- 3、编写js初始化插件  
`var sourceData = [{
                name: "选项1",
                value: "id1"
            }, {
                name: "选项2",
                value: "id2"
            }, {
                name: "选项3",
                value: "id3"
            }, {
                name: "选项4",
                value: "id4"
            }, {
                name: "选项5",
                value: "id5"
            }];`  
`var config = {
                dataSource: sourceData,
                isMultiple: false,
                isShowMultiple:true,
                buttonConfig: {
                    text: "保存",
                    onClick: function () {
                        alert(slideSelect1.choosedData);
                    }
                }
            }
`  
`var slideSelect1 = new kwzm.slideSelect($("#slideSelect1"), $("#expend-box1"), config);`  
- 配置项
  - datasource：数据源
  - isMultiple




