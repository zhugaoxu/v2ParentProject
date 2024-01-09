<template>
  <div>
    <div class="setFlexShow">
      <div class="setmain" @click="$_zoomOut">
        <div>
          <svg-icon style="font-size: 18px;" icon-class="缩小" />
        </div>
        <div>
          缩小
        </div>
      </div>
      <div class="setmain" @click="$_zoomIn">
        <div>
          <svg-icon style="font-size: 18px;" icon-class="放大" />
        </div>
        <div>
          放大
        </div>
      </div>
      <div class="setmain" @click="$_zoomReset">
        <div style="padding-left: 2px">
          <svg-icon style="font-size: 18px;" icon-class="自适应" />
        </div>
        <div>
          适应
        </div>

      </div>
      <div class="setmain" @click="$_undo" >
        <div style="padding-left: 4px;margin-bottom: 2px;">
          <svg-icon style="font-size: 20px;" icon-class="上一步" />
        </div>
        <div>
          上一步
        </div>

      </div>
      <div class="setmain" @click="$_redo">
        <div style="padding-left: 4px;margin-bottom: 2px;">
          <svg-icon style="font-size: 20px;" icon-class="下一步" />
        </div>
        <div>
          下一步
        </div>

      </div>
      <div class="setmain">
        <div style="padding-left: 2px">
          <svg-icon style="font-size: 18px;" icon-class="保存2" @click="()=>saveData()"/>
        </div>
        <div>保存</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Control',
  props: {
    lf: Object || String,
    catTurboData: Boolean
  },
  data () {
    return {
      undoDisable: false,
      redoDisable: true,
      graphData: null,
      dataVisible: false,
    }
  },
  mounted () {
    this.$props.lf.on('history:change', ({ data: { undoAble, redoAble } }) => {
      this.$data.undoDisable = !undoAble
      this.$data.redoDisable = !redoAble
    });
  },
  methods: {
    saveData(){
      this.$emit('saveData')

    },
    $_zoomIn(){
      this.$props.lf.zoom(true);
    },
    $_zoomOut(){
      this.$props.lf.zoom(false);
    },
    $_zoomReset(){
      this.$props.lf.resetZoom();
    },
    $_translateRest(){
      this.$props.lf.resetTranslate();
    },
    $_reset(){
      this.$props.lf.resetZoom();
      this.$props.lf.resetTranslate();
    },
    $_undo(){
      this.$props.lf.undo();
    },
    $_redo(){
      this.$props.lf.redo();
    },
    $_download(){
      this.$props.lf.getSnapshot();
    },
    $_catData(){
      this.$emit('catData');
    },
    $_catTurboData(){
      this.$emit('catTurboData');
    },
    $_showMiniMap() {
      const { lf } = this.$props;
      lf.extension.miniMap.show(lf.graphModel.width - 150, 40)
    }
  }
}
</script>
<style lang="less" scoped>
.setFlexShow{
  display: flex;
  width: 320px;
  height: 58px;
  background-color: white;
  box-shadow: 0 0 10px 1px rgb(228, 224, 219);
  border-radius: 6px;
  font-size: 12px;
  padding-left: 15px;
  .setmain{
    padding: 10px;
    cursor: pointer;
    &>div:first-child{
      margin-bottom:4px
    }
  }
}
</style>
