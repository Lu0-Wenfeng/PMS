1. 现在后端的response变为了：
{Object
allProducts: (4) [{…}, {…}, {…}, {…}]
userData: {userId: null, userType: 'regular'}
[[Prototype]]: Object}
使用response.data.allProducts来获取商品列表
使用response.data.userData.userType来判断用户身份

2. 后端的路由经历了一些修改 请仔细阅读router.js

3. Edit和add product按钮使用response.data.userData.userType来进行条件渲染即可

4. router.js里cart的路由我不知道这样应不应该这样设计 所有的id和productId都是一个意思 userId通过中间件获取即可