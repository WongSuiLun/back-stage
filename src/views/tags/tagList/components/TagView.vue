<template>
  <div>
    <a-list :grid="{ gutter: 16, column: 8}" :dataSource="data">
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a-card hoverable>
          <div
            class="tag-cover"
            :style="{background:item.color,height:'60px'}"
            slot="cover"
          >{{item.tagName}}</div>
          <template class="ant-card-actions" slot="actions">
            <a-icon type="setting" />
            <a-icon type="edit" @click="editTagList(index)" />
            <a-icon type="ellipsis" />
          </template>
        </a-card>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
export default {
    props:{
        data:Array
    },
    methods:{
        editTagList(index){
            console.log(index)
        }
    }
};
</script>
<style scoped>
.tag-cover{
  height:60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 800;
}
</style>