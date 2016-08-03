var $=require('jquery');
var moment= require('moment');


//evento de click del articulo para rediccionar a la plantilla de detalle.
$('.article-click').on("click",function(){
    var self=this;
    var id=$(this).parent().data().id;
    var userArticle=$(this).parent().children().data().user;
    //console.log(userArticle);
    $.get('/articles/'+userArticle+"/"+id+"/article.html",function(data){

        $('.segmentoArticle').append(data);
        //colocar titulo principal en el titulo principal del detalle del articulo. FEcha de creacion.
        $('.segmentoArticle').find('.title-article').html($(self).find('.title-article').html());
        var fecha=moment(id,"YYMMDDHHmmss").format('LLL');
        $('.segmentoArticle').find('.fecha-creacion span').text(fecha);
        var imagen=$(self).find('.img-article').css("background-image");
        $('.segmentoArticle').find('.img-article-header').css("background-image",imagen);

        //colocar foto en la plantilla de detalle
        $('.plantilla-detalle').find('.picture-profile >img').attr("src","../../articles/"+userArticle+"/img-profile/profile.jpg");
        $('.plantilla-detalle').find('.name-user').text(userArticle);
        $('.plantilla-detalle').data("id",id);
        $('.plantilla-detalle').data("user",userArticle);

        //HACER VISIBLE LA PLANTILLA DE DETALLE.
        $('.plantilla-detalle').addClass('mostrar-detalle');
        $('.list-article').addClass('ocultar-detalle');
        $('body').addClass('change-background-color');
        $(window).scrollTop(0);
    });
});

//evento de click para el boton de agregar a favoritos.
$('.icon-heart').on("click",function(){
    if (typeof(Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
          var id=$(this).parent().parent().data().id;
          var favorito=localStorage.getItem(id);
          console.log(favorito);
          if(favorito!="1"){
              localStorage.setItem(id,"1");
              $(this).addClass("favup");
          }
          else {
              localStorage.removeItem(id);
              $(this).removeClass("favup");
          }
    } else {
      // Sorry! No Web Storage support..
      console.log("Sorry! No Web Storage support..");
    }
});

//evento cuando no carga imagen de perfil pone por defecto un placeholder.
$(".picture-profile >img").on("error",function(){
    $(this).attr("src","../../dist/img/profile-placeholder.png");
});
