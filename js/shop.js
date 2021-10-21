var cart = {}; //моя корзина

$('document').ready(function(){
    loadGoods();
	checkCart();
	showMiniCart();
});

function loadGoods() {
    //загружаю товары на страницу
    $.getJSON('goods.json', function (data) {
        //console.log(data);
        var out = '<h2>Каталог товаров и услуг</h2>';
		out+='<ul class="oglavl">';
        for (var key in data){
            out+='<li><span class="text">'+data[key]['name']+'</span>';
            out+='<span class="page">'+data[key]['cost']+' ₽ ';
            out+='<button class="minus" data-art="'+key+'">-</button><button class="plus" data-art="'+key+'">+</button></span>';
            out+='</li>';
        }
        $('#services').html(out);
        $('button.plus').on('click', addToCart);
    });
}

function addToCart() {
    //добавляем товар в корзину
    var articul = $(this).attr('data-art');
    if (cart[articul]!=undefined) {
        cart[articul]++;
    }
    else {
        cart[articul] = 1;
    }
	localStorage.setItem('cart', JSON.stringify(cart) );
    console.log(cart);
	showMiniCart();
}

function checkCart(){
    //проверяю наличие корзины в localStorage;
    if ( localStorage.getItem('cart') != null) {
        cart = JSON.parse (localStorage.getItem('cart'));
    }
}

function showMiniCart(){
    //показываю содержимое корзины
    var out ='';
    for (var w in cart){
        out += w + ' --- '+cart[w]+'<br>';
    }
    $('#mini-cart').html(out);
}