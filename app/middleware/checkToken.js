const routes = require('../uitls/publicRoute');

module.exports = options => {
    return async function checkToken(ctx, next) {
        let rr = routes.indexOf(ctx.path)
        if(routes.indexOf(ctx.path) > -1) {
            await next()
        }
        else {
            let au = ctx.header.authorization.length
            if(ctx.header.authorization.length != 0) {
                await next()
            }
            else {
                ctx.status = 403;
                ctx.body = {
                    code: 3,
                    msg: 'token验证错误，请重新登录！'
                };
                return;
            }
        }

    }
}