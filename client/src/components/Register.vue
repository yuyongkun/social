<template>
    <form class="form-signin" action="/users/reg" method="post" autocomplete="off">
    <h3 class="text-center">用户注册</h3>
    <div class="input-group">
        <span class="input-group-addon">用户名</span>
        <input type="text" value="<%=username%>" name="username" class="form-control" placeholder="请输入用户名" autofocus="">
    </div>
    <div class="input-group">
        <span class="input-group-addon">邮箱</span>
        <input type="email" value="<%=email%>" name="email" class="form-control" placeholder="请输入邮箱">
    </div>
    <div class="input-group">
        <span class="input-group-addon">密码</span>
        <input type="password" value="<%=password%>" name="password" class="form-control" placeholder="请输入密码">
    </div>
    <div class="input-group">
        <span class="input-group-addon">确认密码</span>
        <input type="password" value="<%=repassword%>" name="repassword" class="form-control" placeholder="请再次输入密码">
    </div>
    <button class="btn btn-lg btn-primary btn-block" type="submit">注册</button>
</form>
</template>
