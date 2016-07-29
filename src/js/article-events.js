var $=require('jquery');

$('.article-click').on("click",function(){
    //alert("click");
    var id=$(this).parent().data().id;
    var userArticle=$(this).parent().children().data().user;
    console.log(userArticle);
});

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
