<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">捷成在线</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#">开发者</a>
                </li>
            </ul>
           <ul class="navbar-nav">
                <li class="nav-item"><a class="nav-link" href="/users/login">登录</a></li>
                <li class="nav-item ml-2"><a class="nav-link" href="/users/reg">注册</a></li>
           </ul>
        </div>
    </nav>
</template>
<script>
export default {
  name: "Navbar"
};
</script>
