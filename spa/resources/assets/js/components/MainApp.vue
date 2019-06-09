<template>
    <div id="main">
        <Header/>
        <div class="content">
            <Test/>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import Header from './Header';
    import Test from './TestApp';

    export default {
     name:'main-app',
     components:{Header,Test}
    }
</script>
