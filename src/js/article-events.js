var $=require('jquery');


//evento de click del articulo para rediccionar a la plantilla de detalle.
$('.article-click').on("click",function(){
    //alert("click");
    var id=$(this).parent().data().id;
    var userArticle=$(this).parent().children().data().user;
    console.log(userArticle);
    $('.plantilla-detalle').addClass('mostrar-detalle');
    $('.list-article').addClass('ocultar-detalle');
    $('body').addClass('change-background-color');

    //colocar foto en la plantilla de detalle
    $('.plantilla-detalle').find('.picture-profile >img').attr("src","../../articles/"+userArticle+"/img-profile/profile.jpg");
    $('.plantilla-detalle').find('.name-user').text(userArticle);
    $('.plantilla-detalle').data("id",id);
    //console.log($('.plantilla-detalle').data("id"));
    $('.comentarios >p').text(id);
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
    $(this).attr("src","../../src/img/profile-placeholder.png");
});


$('.cerrar').on("click",function(){
    $('.icon-cross').toggleClass('closeup');
    $('.plantilla-detalle').removeClass('mostrar-detalle');
    $('.list-article').removeClass('ocultar-detalle');
    $('body').removeClass('change-background-color');
    //alert("clic");
});
