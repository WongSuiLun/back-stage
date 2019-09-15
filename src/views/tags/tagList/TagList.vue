<template>
  <div class="content-warp">
      
      <tag-control></tag-control>
      <a-divider style="margin:15px 0" />
      <tag-view :data="tagData"></tag-view>
  </div>
</template>
<script>
import TagControl from './components/TagControl'
import TagView from './components/TagView'
import { mapState } from "vuex";
export default {
    components:{
        TagControl,
        TagView
    },
    data(){
        return {

        }
    },
    computed:{
        ...mapState({
            tagData:state=>state.tags.tagData
        })
    },
    created(){
        
    }
}
</script>

<style>

</style>