class ToolBar {
    constructor(container) {
        this.element = container;
    }
    addMenus(infos) {
        for (var i = 0; i < infos.length; i++) {
            var info = infos[i];
            switch (info.menuType) {
                case ToolBar.MenuType.TEXT: {
                    this.addText(info);
                    break;
                }
                case ToolBar.MenuType.ENUM: {
                    this.addEnum(info);
                    break;
                }
                case ToolBar.MenuType.CHECKBOX: {
                    this.addCheckBox(info);
                    break;
                }
                case ToolBar.MenuType.RANGE: {
                    this.addRange(info);
                    break;
                }
                case ToolBar.MenuType.SELECT: {
                    this.addSelect(info);
                    break;
                }
            }

        }
    }
    /**
     * 复选框
     * @param {id:"",name:"",menuType:ToolBar.MenuType.CHECKBOX,defaultValue:true,onchange:function} info 
     * @returns {} 
     */
    addCheckBox(info) {
        var item = document.createElement("div");
        this.element.appendChild(item);

        var name = document.createElement("span");
        name.innerHTML = info.name;
        item.appendChild(name);

        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = info.defaultValue;
        checkbox.onchange = info.onchange;
        item.appendChild(checkbox);
    }

    /**
     * 枚举对象
     * @param {id:"",name:"",menuType:ToolBar.MenuType.ENUM,defaultValue:null,onchange:function} info 
     * @returns {} 
     */
    addEnum(info) {
        var item = document.createElement("div");
        this.element.appendChild(item);

        var name = document.createElement("span");
        name.innerHTML = info.name;
        item.appendChild(name);

        var select = document.createElement("select");
        select.onchange = info.onchange;
        item.appendChild(select);

        var optionNULL = document.createElement("option");
        optionNULL.innerHTML = "Null";
        optionNULL.value = null;
        select.appendChild(optionNULL);

        for (var value in info.values) {
            var option = document.createElement("option");
            option.innerHTML = value;
            option.value = value;
            if (info.defaultValue) {

                if (info.values[value].toString() == info.defaultValue._value.toString()) {
                    option.selected = true;
                }
            }

            select.appendChild(option);
        }
    }

    /**
     * 文本
     * @param {id:"",name:"",menuType:ToolBar.MenuType.TEXT,defaultValue:null,onchange:function} info 
     * @returns {} 
     */
    addText(info) {
        var item = document.createElement("div");
        this.element.appendChild(item);

        var name = document.createElement("span");
        name.innerHTML = info.name;
        item.appendChild(name);

        var text = document.createElement("input");
        text.type = "text";
        text.value = info.defaultValue;
        text.onchange = info.onchange;
        this.element.appendChild(text);
    }
    /**
     * 范围
     * @param {id:"",name:"",menuType:ToolBar.MenuType.RANGE,defaultValue:null,minValue:int,maxValue:int,setp:int,onchange:function} info 
     * @returns {} 
     */
    addRange(info) {
        var item = document.createElement("div");
        this.element.appendChild(item);

        var name = document.createElement("span");
        name.innerHTML = info.name;
        item.appendChild(name);

        var range = document.createElement("input");
        range.type = "range";
        range.min = info.minValue;
        range.max = info.maxValue;
        range.step = info.step;
        range.value = info.defaultValue;
        range.onchange = function (event) {
            text.value = event.currentTarget.value;
            if (info.onchange instanceof Function) {
                info.onchange(event);
            }

        }
        range.setAttribute("data-bind", "valueUpdate: 'input',value:" + info.name);
        item.appendChild(range);

        var text = document.createElement("input");
        text.type = "text";
        text.value = info.defaultValue;
        text.style.width = "50px";
        text.onchange = function (event) {
            range.value = event.currentTarget.value;
            if (info.onchange instanceof Function) {
                info.onchange(event);
            }

        }
        text.setAttribute("data-bind", "value:" + info.name);;
        item.appendChild(text);
    }

    /**
     * select对象
     * @param {id:"",name:"",menuType:ToolBar.MenuType.SELECT,values:[],defaultValue:null,onchange:function} info 
     * @returns {} 
     */
    addSelect(info) {
        var item = document.createElement("div");
        this.element.appendChild(item);

        var name = document.createElement("span");
        name.innerHTML = info.name;
        item.appendChild(name);

        var select = document.createElement("select");
        select.onchange = info.onchange;
        item.appendChild(select);

        var optionNULL = document.createElement("option");
        optionNULL.innerHTML = "Null";
        optionNULL.value = null;
        select.appendChild(optionNULL);

        for (var i in info.values) {
            var value = info.values[i];
            var option = document.createElement("option");
            option.innerHTML = value;
            option.value = value;
            if (info.defaultValue) {
                if (value.toString() == info.defaultValue.toString()) {
                    option.selected = true;
                }
            }
            select.appendChild(option);
        }
    }
}



ToolBar.MenuType = {
    TEXT: 1,
    ENUM: 2,
    CHECKBOX: 3,
    RANGE: 4,
    SELECT: 5
};

export default ToolBar;