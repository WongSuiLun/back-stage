<template>
    <div>
        <content-warp>
            <div>
                 <wechat-content-tab></wechat-content-tab>
            </div>
        </content-warp>
    </div>
</template>

<script>
import ContentWarp from './ContentWarp'
import { WechatContentTab } from "@/components";
export default {
    components:{
        ContentWarp,
        WechatContentTab
    }

}
</script>

<style>

</style>
