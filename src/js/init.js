var $=require('jquery');
// recorremos todos los articulos para activarles el icono de favorito en caso
// de haber sido marcados.

$(".article").each(function() {
    var id=localStorage.getItem($(this).data().id.toString());
    var iconFavorito=$(this).find(".icon-heart");
    //console.log(id);
    if(id!=null){
        iconFavorito.addClass("favup");
    }
    else {
        iconFavorito.removeClass("favup");
    }
});
