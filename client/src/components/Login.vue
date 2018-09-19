<template>
    <form class="form-signin" method="post" action="/users/login" autocomplete="off">
    <h3 class="text-center">用户登录</h3>
    <div class="input-group">
        <span class="input-group-addon">用户名</span>
        <input type="text" name="username" class="form-control" placeholder="请输入用户名" autofocus="">
    </div>
    <div class="input-group">
        <span class="input-group-addon">密码</span>
        <input type="password" name="password" class="form-control" placeholder="请输入密码">
    </div>
    <div class="checkbox">
        <label>
            <input type="checkbox" value="remember-me"> 记住
        </label>
    </div>
    <button class="btn btn-lg btn-primary btn-block" type="submit">登录</button>
</form>
</template>
