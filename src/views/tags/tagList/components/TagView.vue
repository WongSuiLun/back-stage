<template>
  <div>
    <a-list :grid="{ gutter: 16, column: 8}" :dataSource="data">
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a-card hoverable>
          <div
            class="tag-cover"
            :style="{height:'60px'}"
            slot="cover"
          >{{item.title}}</div>
          <template class="ant-card-actions" slot="actions">
            <a-icon type="setting" />
            <a-icon type="delete" @click="handleDeleteTag(item,index)" />
            <a-icon type="ellipsis" />
          </template>
        </a-card>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { deleteTag,getTags,addTagGoods, } from "@/api/tag";
export default {
  data(){
    return {
      data:[]
    }
  },
  created(){
    this.initData()
  },
  methods: {
    initData(){
      getTags().then(res=>{
        this.data= res.data
        this.$store.commit('INIT_TAG_DATA',this.data)
      })
    },
    handleDeleteTag(tag) {
       this.$confirm({
        title: 'Are you sure delete this tag?',
        content: 'delete this tag',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          deleteTag(tag.id).then(res=>{
            this.$store.commit('DELETE_TAG',tag)
            this.$message.success('删除成功')
          })
        },
        onCancel() {
          console.log('Cancel');
        },
      });
      
    }
  }
};
</script>
<style scoped>
.tag-cover {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 800;
}
</style>