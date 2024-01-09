<template>
    <div class="logic-flow-view">


        <div class="getData">
            <div>
                <Control class="demo-control" v-if="lf" :lf="lf" @saveData="getData"></Control>
                <!-- <el-button @click="() => getData()">
                    保存
                </el-button> -->
            </div>
        </div>

        <!-- 节点面板 -->
        <NodePanel v-if="lf" :lf="lf" :nodeList="nodeList"></NodePanel>
        <!-- 画布 -->
        <div id="LF-view" ref="container"></div>

        <!-- 属性面板 -->
        <el-drawer title="" append-to-body :visible.sync="dialogVisible" direction="rtl" size="500px"
            :before-close="closeDialog" @close="closeDialog">
            <PropertyDialog v-if="dialogVisible" :nodeData="clickNode" :lf="lf" ref="updateB"
                @setPropertiesFinish="closeDialog">
            </PropertyDialog>
        </el-drawer>

    </div>
</template>
<script>
import LogicFlow from '@logicflow/core'
import { Menu, Snapshot, MiniMap } from '@logicflow/extension'
import '@logicflow/core/dist/style/index.css'
import '@logicflow/extension/lib/style/index.css'
import Control from './components/Control'
import NodePanel from './components/NodePanel'

import PropertyDialog from './components/PropertyDialog'

// 注册自定义节点
import registUser from './registUser';
import registLing from './registLing';
import registDefault from './registMo';




const nodeList = [

    {
        type: 'registLing',
        text: '判断',
        class: 'node-download'
    },

    {
        type: 'registUser',
        text: '菜单',
        class: 'node-rect'
    },
    {
        text: '文本',
        type: 'registDefault',
        class: 'node-rect'
    },
];


export default {
    name: 'LF',
    components: { NodePanel, PropertyDialog, Control },
    props: {
        seleData: {
            type: Object,
            default: () => {
                return {}
            }
        }

    },
    data() {
        return {
            lf: null,//流程图
            clickNode: null,//点击节点的属性
            dialogVisible: false, //节点是否打开
            graphData: null,//当前流程的json数据
            dataVisible: false,//是否展示json数据弹框
            config: {   //默认的配置
                background: {
                    backgroundColor: '#f7f9ff',
                },
                grid: {
                    size: 10,
                    visible: true
                },
                keyboard: {
                    enabled: true
                },
                edgeTextDraggable: true,
                hoverOutline: false,

            },
            nodeList, // 流程设计初始节点
        }
    },
    mounted() {
        this.$_initLf()

        console.log(this.seleData);
        console.log(33)
    },
    methods: {
        getData() {
            console.log();
            let params = {
                ...this.seleData,
                configContent: JSON.stringify(this.$data.lf.getGraphData())
            }
            console.log(params)

        },



        $_initLf() {
            // 画布配置
            const lf = new LogicFlow({
                ...this.config,
                plugins: [
                    Menu,
                    MiniMap,
                    Snapshot
                ],
                container: this.$refs.container,
            })
            this.lf = lf
            this.$_registerNode()
        },
        // 自定义
        $_registerNode() {
            this.$_render()
        },
        $_render() {
            this.lf.register(registUser);//常用测试节点
            this.lf.register(registLing);//常用菱形节点
            this.lf.register(registDefault);//默认的

            let demoData = this.seleData.configContent ? JSON.parse(this.seleData.configContent) : {
                'edges': [],
                'nodes': []
            }

            demoData.nodes = demoData.nodes.map(item => {
                item.type = item.type == 'registLing' ? 'registLing' : item.type == 'registDefault' ? 'registDefault' : 'registUser'
                return item
            })
            this.lf.render(demoData)
            this.$_LfEvent()
        },

        $_LfEvent() {
            this.lf.on('node:click', ({ data }) => {
                console.log(data);
                console.log(1000)
                // if(data.type=='registDefault'){
                //     this.$data.clickNode = data
                //     return
                // }
                this.$data.clickNode = data
                this.$data.dialogVisible = true
            })
        },
        closeDialog() {
            this.$refs.updateB.onSubmit()
            this.$data.dialogVisible = false
        },
        $_catData() {
            this.$data.graphData = this.$data.lf.getGraphData();
            this.$data.dataVisible = true;
        },
    }
}
</script>
<style lang="less" >
.lf-menu {
    &>li:nth-child(2) {
        display: none !important;
    }
}
</style>

<style scoped>
body {
    margin: 0;
}

.logic-flow-view {
    height: calc(90vh - 120px);
    position: relative;
}

.getData {
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 100;
}

.demo-title {
    text-align: center;
    margin: 20px;
}

.demo-control {
    position: absolute;
    top: 50px;
    right: 50px;
    z-index: 2;
}

#LF-view {
    width: calc(100%);
    height: 100%;
    outline: none;
    /* margin-left: 50px; */
}

.time-plus {
    cursor: pointer;
}

.add-panel {
    position: absolute;
    z-index: 11;
    background-color: white;
    padding: 10px 5px;
}

.el-drawer__body {
    height: 80%;
    overflow: auto;
    margin-top: -30px;
    z-index: 3;
}
</style>
  
<style lang="less" scoped>
/deep/ .el-drawer__header {
    z-index: 2000;
}
</style>