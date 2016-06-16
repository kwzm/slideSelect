/*
 * create : 2016-6-16
 * autor :  kwzm
 * email : 931745526@qq.com
 * introduce : 下滑展开单选/多选插件
*/

//-------zc.slideSelect-------

; (function ($, window) {
    "use strict";
    window["kwzm"] = window["kwzm"] || {};
    window.kwzm.slideSelect = function ($clickElement,$expendBox,config) {
        config = $.extend(true, {
            dataSource: [
            //数据源
            //{
            //    name: "选项1",
            //    value:"id1"
            //}
            ],
            isMultiple: true,//是否是多选
            isShowMultiple:false,//是否展示多个展开框（当页面中有多个插件时）
            buttonConfig: {
                //按钮配置
                text: "确定",//按钮显示文本
                onClick: function () {
                    //点击按钮执行的方法
                    $expendBox.data("savaData", choosedData);
                    $expendBox.slideUp();
                }
            },
        }, config);
       

        var _this = null;//实例化对象this
        var choosedData = [];//选择的数据
        var $slideSelectList = $();
        var $slideSelectSave = $();

        initSlideSelect();
        function initSlideSelect() {
            buildSlideSelectDOM();
            bind();
            _this = new slideSelectManager();
        }

        //创建搜索结构
        function buildSlideSelectDOM() {
            $expendBox.addClass("slideSelect_box");
            $slideSelectList = $("<ul>").addClass("slideSelect_list");
            $slideSelectSave = $("<button>").addClass("slideSelect_save").text(config.buttonConfig.text);

            //选项列表
            $.each(config.dataSource, function (i, item) {
                $slideSelectList.append(
                    $("<li>").addClass("slideSelect_item").text(item.name).attr("data_value",item.value)
                );
            });

            $expendBox.append($slideSelectList).append($slideSelectSave);
        }

        //所有绑定
        function bind() {
            //点击展开
            $clickElement.click(function () {
                if (!config.isShowMultiple) {
                    $(".slideSelect_box").hide();
                }
                $expendBox.slideDown();
            });
            //选择具体选项
            $expendBox.on("click", "li", function () {
                var item = $(this);
                if (config.isMultiple) {
                    //多选
                    if (!item.hasClass("choosed")) {
                        item.addClass("choosed");
                        var dataValue = item.attr("data_value");
                        _this.choosedData.push(dataValue);
                    } else {
                        item.removeClass("choosed");
                        var dataValue = item.attr("data_value");
                        _this.choosedData.splice($.inArray(dataValue, choosedData), 1);
                    }
                } else {
                    //单选
                    if (!item.hasClass("choosed")) {
                        $expendBox.find("li").removeClass("choosed");
                        item.addClass("choosed");
                        var dataValue = item.attr("data_value");
                        _this.choosedData = [];
                        _this.choosedData.push(dataValue);
                    } else {
                        item.removeClass("choosed");
                        _this.choosedData = [];
                    }
                }
               
            });
            //点击确定按钮
            $expendBox.find(".slideSelect_save").click(function () {
                config.buttonConfig.onClick();
                $expendBox.slideUp();
            });
        }

        //返回对外接口
        function slideSelectManager() {
            if (!(this instanceof slideSelectManager)) return null;
            this.$slideSelectList = $slideSelectList;
            this.$slideSelectSave = $slideSelectSave;
            this.choosedData = choosedData;
        }
        return _this;
    }
})(jQuery, window);