<template>
    <div class="body_height" :style="{'height': height}">欢迎登录诗词鉴赏后台管理系统</div>
</template>
<script>
export default {
    data() {
        return {
            height: window.innerHeight - 200 + 'px',
        }
    }
}
</script>
<style scoped>
.body_height {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
}
</style>