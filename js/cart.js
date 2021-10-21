var cart = {}; //корзина


$.getJSON('goods.json', function (data) {
    var goods = data; //все товары в массиве
    // console.log(goods);
    checkCart();
    //console.log(cart);
    showCart(); //вывожу товары на страницу

    function showCart() {
        var out = '<h2>Корзина товаров и услуг</h2>';
		out+='<ul class="oglavl">';
        for (var key in cart) {
			out+='<li><span class="text"><button class="delete" data-art="'+key+'">x</button>'+' '+goods[key].name+'</span>';
            out += '<span class="page">'+cart[key]*goods[key].cost+'<button class="minus" data-art="'+key+'">-</button>'+' ';
            out += cart[key];
            out += ' '+'<button class="plus" data-art="'+key+'">+</button>';
			out += '</span></li>';
        }
		
		var outTotalPrice='';
		var totalPrice = 0;
		for (var w in cart){
			totalPrice += cart[w]*data[w].cost;
		}
		outTotalPrice+=totalPrice + ' ₽';
		$('#totalPrice').html(outTotalPrice);
		
        $('#my-cart').html(out);
		$('button.plus').on('click', plusGoods);
		$('button.minus').on('click', minusGoods);
		$('button.delete').on('click', deleteGoods);
    }
	
	function plusGoods() {
		//добавляем товар в корзину
		var articul = $(this).attr('data-art');
		cart[articul]++;
		localStorage.setItem('cart', JSON.stringify(cart) );
		showCart();
	}
	
	function minusGoods() {
		//добавляем товар в корзину
		var articul = $(this).attr('data-art');
		if(cart[articul]>1) cart[articul]--;
		else delete cart[articul];
		localStorage.setItem('cart', JSON.stringify(cart) );
		showCart();
	}
	
	function deleteGoods() {
		//добавляем товар в корзину
		var articul = $(this).attr('data-art');
		delete cart[articul];
		localStorage.setItem('cart', JSON.stringify(cart) );
		showCart();
	}
});



function checkCart() {
    //проверяю наличие корзины в localStorage;
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}
