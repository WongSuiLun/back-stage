<template>
  <div class="card-item">
    <a-divider class="divider"/>
    <div class="card-item-msg">
        {{itemData.title}}
        <img :src="itemData.thumb_url" class="card-item-img">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemData: null
  }
};
</script>
<style lang="less">
.card-item{
    .divider{
        margin: 10px;
    }
}
</style>

<style lang="less" scoped>
.card-item-msg{
    padding:0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .card-item-img{
        width: 50px;
        height: 50px;
    }
}
</style>

