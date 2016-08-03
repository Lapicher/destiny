var $=require('jquery');
//var apiClient=require('api-client');

$('.cerrar').on("click",function(){
    $('.icon-cross').toggleClass('closeup');
    $('.plantilla-detalle').removeClass('mostrar-detalle');
    $('.list-article').removeClass('ocultar-detalle');
    $('body').removeClass('change-background-color');
    $(document).data("loadedComments","false");
    $('.sectionComments').html("");
    $('.segmentoArticle').html("");
    $('.indicador').text("0");
    //alert("clic");
});
$('form').on("submit",function(){
    var self=this;

    //terminada la validacion de los campos se prosigue a enviar el comentario.
    var id=$(".plantilla-detalle").data("id");
    var user=$("#nombre").val();
    var email=$("#email").val();
    var mensaje= $("#message").val();

    var datos={
        idArticle: id,
        userArticle: user,
        emailUser: email,
        fecha: new Date(),
        message: mensaje
    };
    // se guarda el comentario en el spaREST.
    /*
    apiClient.save(datos,function(){
        console.log("se inserto correctamente");
        alert("comentario agregado correctamente");
        self.reset();
    },
    function(err){
        console.error(e);
        alert("ocurrio un error, volver a intentar");
        self.reset();
    });
    */
    $.ajax({
        url: "/api/comments/",
        method: "post",
        data: datos,
        success: function(){
            ///console.log("se inserto correctamente");
            alert("comentario agregado correctamente");
            var item = '<div class="item-comment row">'+
                 '<div class="row user-comment">'+
                     '<label>'+datos.userArticle+'</label>'+
                  '</div>'+
                  '<div class="coment">'+
                      '<p>'+datos.message+'</p>'+
                  '</div>'+
                '</div>';
            $('.sectionComments').append(item);
            self.reset();
        },
        error: function(){
            console.error(e);
            alert("ocurrio un error, volver a intentar");
            self.reset();
        }
    });
    return false;
});

// evento que detecta las 150 palabras maximas escritas en el textarea de comentarios.
$("#message").on("keydown",function(evt){
    var palabras=150;
    var arrPalabras=this.value.toString().split(" ");
    if(arrPalabras.length>palabras && evt.keyCode!=8)
        return false;
    else{
        if(arrPalabras.length<=palabras){
            $('.indicador').css("color","red");
            $('.indicador').text(arrPalabras.length);
        }
    }
});

$(window).on("scroll",function(){
      var scroll = $(window).scrollTop();
      var plantillaVisible=$(".plantilla-detalle").css("display");

      var porcentScroll=((scroll + $(window).height())*100)/$(document).height();
      //console.log(porcentScroll);
      if( porcentScroll > 70 && $(document).data("loadedComments") != "true" && plantillaVisible == 'inline'){
           $(document).data("loadedComments","true");
           console.log("Async traera los comentarios");
            /*
            apiClient.list(function(comments){
                console.log(comments);
            },
            function(err){
                console.error(err);
            });
            */
            $.ajax({
                url: "/api/comments/?_order=fecha",
                method: "get",
                success: function(comments){
                    //console.log(comments);
                    for(var item in comments){
                        console.log(comments[item]);
                        //console.log("data: "+$('.plantilla-detalle').data("id"));
                        if($('.plantilla-detalle').data("id")==comments[item].idArticle){
                            var item = '<div class="item-comment row">'+
                                 '<div class="row user-comment">'+
                                     '<label>'+comments[item].userArticle+'</label>'+
                                  '</div>'+
                                  '<div class="coment">'+
                                      '<p>'+comments[item].message+'</p>'+
                                  '</div>'+
                                '</div>';
                            $('.sectionComments').append(item);
                        }
                    }
                },
                error: function(err){
                    console.error(err);
                }
            });
       }
/*
      if($(window).scrollTop() + $(window).height() == $(document).height()) {
        alert("bottom!");
        console.log($(document).height());
       // getData();
      }
*/

});
