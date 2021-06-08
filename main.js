$('.sizebutton').click(function(){
    var selected_size = $(this).attr('id');
    var current_size = $('.sizeselected').attr('id');
    if(current_size == selected_size){
        $(this).removeClass('border-dark-grey');
        $(this).addClass('border-light-grey');
        $(this).removeClass('text-color2');
        $(this).addClass('text-color1');
        $('.sizeselected').attr('id','0');
        $('.sizeselected').text('');
    }
    else{
        $('.sizebutton').removeClass('border-dark-grey');
        $('.sizebutton').addClass('border-light-grey');
        $('.sizebutton').removeClass('text-color1');
        $('.sizebutton').addClass('text-color2');
        $(this).addClass('border-dark-grey');
        $(this).removeClass('border-light-grey');
        $(this).removeClass('text-color2');
        $(this).addClass('text-color1');
        $('.sizeselected').attr('id',selected_size);
        $('.sizeselected').text(selected_size);
    }
});
$('.cart').click(function(){
    if($(this).hasClass('cart-hover')){
        $(this).removeClass('cart-hover');
        $('.cartlist').hide();
    }
    else{
        $(this).addClass('cart-hover');
        $('.cartlist').show();
    }
});
$('.add-cart').click(function(){
    var current_size = $('.sizeselected').attr('id');
    var productname = "Current Tee";
    var totalproduct = 0;
    if(current_size != 0){
        var datacontent = $('.cartlist .main-body').children('.row');
        var exist = false;
        datacontent.each(function(){
            var product = $(this).attr('data-product');
            if(product == 'No product'){ //when there is not any product 
                var number = 1;
                exist = true;
                totalproduct = totalproduct + number;
                $(this).html(htmlformat(productname, number, current_size));
                $(this).attr('data-product',productname);
                $(this).attr('data-amount', number);
                $(this).attr('data-size',current_size);
            }
            else{
                var size = $(this).attr('data-size');
                if(size == current_size){
                    var currentnumber = parseInt($(this).attr('data-amount'));
                    var number = currentnumber + 1;
                    totalproduct = totalproduct + number;
                    $(this).html(htmlformat(productname, number, current_size));
                    $(this).attr('data-product',productname);
                    $(this).attr('data-amount', number);
                    $(this).attr('data-size',current_size);
                    exist = true;
                }
                else{
                    var number = parseInt($(this).attr('data-amount'));
                    totalproduct = totalproduct + number;
                }
            }
        });
        if(!exist){
            var number = 1;
            totalproduct = totalproduct + number;
            $('.cartlist .main-body').append(htmlformat1(productname, number, current_size)); 
        }
        $('.totalnumberofproduct').html(totalproduct);
        
    }
    else{
        $('#error').modal('show');
    }
});
function htmlformat1(productname, number, current_size){
    return '<div class="row" data-product="'+productname+'" data-size="'+current_size+'" data-amount="'+number+'"><div class="col-3"><div class="product-image"><img src="classic-tee.jpg" alt="Classic Tee"></div></div><div class="col-9" ><p class="title">'+productname+'</p><p class="amount"><span class="numberofproduct">'+number+'</span> * <span class="productamount">$75.00</span></p><p class="size">Size : <span class="productsize">'+current_size+'</span></p></div>   </div>'
}
function htmlformat(productname, number, current_size ){
    return '<div class="col-3"><div class="product-image"><img src="classic-tee.jpg" alt="Classic Tee"></div></div><div class="col-9" ><p class="title">'+productname+'</p><p class="amount"><span class="numberofproduct">'+number+'</span> * <span class="productamount">$75.00</span></p><p class="size">Size : <span class="productsize">'+current_size+'</span></p></div>';
}