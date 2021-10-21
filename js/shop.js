var cart = {}; //моя корзина

$('document').ready(function(){
    loadGoods();
	checkCart();
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
		
		var outTotalPrice='';
		var totalPrice = 0;
		for (var w in cart){
			totalPrice += cart[w]*data[w].cost;
		}
		outTotalPrice+=totalPrice + ' ₽';
		$('#totalPrice').html(outTotalPrice);
		
        $('#services').html(out);
        $('button.plus').on('click', plusGoods);
        $('button.minus').on('click', minusGoods);
    });
}

function plusGoods() {
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
	loadGoods();
}

function minusGoods() {
		//добавляем товар в корзину
		var articul = $(this).attr('data-art');
		if(cart[articul]>1) cart[articul]--;
		else delete cart[articul];
		localStorage.setItem('cart', JSON.stringify(cart) );
		loadGoods();
}

function checkCart(){
    //проверяю наличие корзины в localStorage;
    if ( localStorage.getItem('cart') != null) {
        cart = JSON.parse (localStorage.getItem('cart'));
    }
}
