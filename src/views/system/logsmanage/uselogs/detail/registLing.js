import { PolygonNode, h, PolygonNodeModel } from "@logicflow/core"

// 这是一个实线的元素节点 
const NODE_COLOR = '#9932CC'
class View extends PolygonNode {

    getShape() {
        const { model } = this.props
        const { width, height, x, y, points } = model
        const {
            fill,
            fillOpacity,
            strokeWidth,
            stroke,
            strokeOpacity,
        } = model.getNodeStyle()
        const transform = `matrix(1 0 0 1 ${x - width / 2} ${y - height / 2})`
        const pointsPath = points.map(point => point.join(',')).join(' ')
        return h(
            'g',
            {
                transform
            },
            [
                h(
                    'polygon',
                    {
                        points: pointsPath,
                        fill,
                        stroke,
                        strokeWidth,
                        strokeOpacity,
                        fillOpacity
                    }
                ),

            ]
        )
    }
}
class Model extends PolygonNodeModel {
    constructor(data, graphModel) {
        data.text = {
            value: (data.text && data.text.value) || '',
            x: data.x,
            y: data.y - 0
        }
        super(data, graphModel)
        const lenght = 45
        this.points = [
            [lenght, 0],
            [lenght * 2, lenght],
            [lenght, lenght * 2],
            [0, lenght]
        ]
    }
    getNodeStyle() {
        const style = super.getNodeStyle()
        // style.stroke = NODE_COLOR
        return style
    }
}


export default {
    type: "registLing",
    view: View,
    model: Model,
}