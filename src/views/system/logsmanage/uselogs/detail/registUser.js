import { CircleNode, CircleNodeModel, h, RectNodeModel, RectNode } from "@logicflow/core"

// 这是一个实线的元素节点 

class View extends RectNode {
    getLabelShape() {
        const { model } = this.props;
        const { x, y, width, height } = model;
        const style = model.getNodeStyle();
        // return <div>你们好啊</div>
        return h(
            "svg",
            {
                x: x - width / 2 + 5,
                y: y - height / 2 + 5,
                width: 35,
                height: 42,
                viewBox: "0 0 1274 1024"
            },
            h("path", {
                fill: "rgb(78, 123, 250)",
                d:
                    "M677 223.42A236 236 0 0 0 511.41 156c-129.3 0-234.23 103.1-234.23 230.41 0 158.31 179.25 322 179.25 322 34.39 31.94 77.48 29.36 108.37-0.14 0 0 180.83-154.93 180.83-321.86A228.3 228.3 0 0 0 677 223.42zM511.33 481.75A104.67 104.67 0 1 1 616 377.08a104.67 104.67 0 0 1-104.67 104.67z"
            }),
            h("path", {
                fill: "rgb(78, 123, 250)",
                d:
                    "M321.89 651.13h-98.38a30.5 30.5 0 0 0-28.73 20.28l-48.42 136.3a30.48 30.48 0 0 0 28.72 40.69h672.65a30.49 30.49 0 0 0 28.73-40.69L828 671.41a30.5 30.5 0 0 0-28.73-20.28H700.1a29.31 29.31 0 0 0-21.91 9.87l-69.34 77.91c-51.93 58.35-143.08 58.46-195.15 0.24l-69.94-78.21a29.36 29.36 0 0 0-21.87-9.81z"
            })
        );
    }
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
            this.getLabelShape()
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
        this.height = 50;
        // this.radius = 50;
    }
}



// 出事看到效果
export default {
    type: "registUser",
    view: View,
    model: Model,
}

