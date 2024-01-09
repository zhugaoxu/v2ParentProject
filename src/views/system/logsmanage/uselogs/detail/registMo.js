import { CircleNode, CircleNodeModel, h, RectNodeModel, RectNode } from "@logicflow/core"

// 这是一个实线的元素节点 

class View extends RectNode {
    
    getShape() {
        const { model, graphModel } = this.props;
        const { x, y, width, height, radius } = model;
        const style = model.getNodeStyle();
        return h("g", {}, [
            h("rect", {
                ...style,
                x: x - width / 2,
                y: y - height / 2,
                rx: radius,
                ry: radius,
                width,
                height
            }),
 
        ]);
    }


}
class Model extends RectNodeModel {
    getTextStyle() {
        const style = super.getTextStyle();
        style.fontSize = 14;
        return style;
    }
    getNodeStyle() {
        const style = super.getNodeStyle();
        style.stroke = "rgba(0, 0, 0,0.1)";
        // style.strokeDasharray = "3 3";
        return style;
    }
    initNodeData(data) {
        super.initNodeData(data);
        this.width = 150;
        this.height =80;
        // this.radius = 50;
    }
}



// 出事看到效果
export default {
    type: "registDefault",
    view: View,
    model: Model,
}

