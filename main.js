$(document).ready(function(){
  toDo.init();
})

var toDo = {
   url: 'http://tiny-tiny.herokuapp.com/collections/toDoListWingo',

   listItems: [],//end listItems
   doneItems: [],//end doneItems

   init: function(){
     toDo.listRender();
     toDo.events();
   },//end init

   listRender: function() {
     toDo.getListItems();
   },//end listRender

   events: function(){

     //add to do item
     $('.add').on('click', function(event){
         event.preventDefault();
         var newToDoItem = {
           content: $('textarea').val()
          };
          $('textarea').val('');
          toDo.createListItem(newToDoItem);
      }),

      //delete item
      $('.done').on('click',function(event){
         event.preventDefault();
         if ( $("div.listItems >.checkbox > input" ).is( ":checked" ) ) {
         var itemId = $("div.listItems >.checkbox > input" ).parent().attr('data-id');
         console.log(itemId);
         toDo.deleteListItem(itemId);
       }
      })//end delete item

    },//end of events


      createListItem: function(item) {
        $.ajax({
            url: toDo.url,
            method: "POST",
            data: item,
            success: function(data) {
              console.log("WE CREATED SOMETHING", data);
              var htmlStr = toDo.htmlGenerator(toDoTemplates.toDoItemTemplate,data)
              toDo.listItems.push(data);
              $('.listItems').append(htmlStr);

            },
            error: function(err) {
              console.error("Damn it!", err);
            }
          })
      },//end of createListItem

      getListItems: function() {
        $.ajax({
          url: toDo.url,
          method: "GET",
          success: function(data) {
            console.log("WE GOT SOMETHING", data);
            $('.listItems').html("");
            data.forEach(function(element,idx) {
              var htmlStr = toDo.htmlGenerator(toDoTemplates.toDoItemTemplate,element);
              $('.listItems').append(htmlStr)
              toDo.listItems.push(element);
            });
          },
          error: function(err) {
            console.error("Damn it!", err);
          }
        });
      },//end getListItems

      deleteListItem: function(itemId){
        var deleteItem = toDo.url + '/' + itemId;
        $.ajax({
          url: deleteItem,
          method: "DELETE",
          success: function(data){
            console.log("Get that outta here!", data);
            toDo.getListItems();
          },
          error: function(err){
            console.error('Damn it!',err);
          }
        });
      },// end deleteListItems


   templification: function(template) {
     return _.template(template);
   },

    htmlGenerator: function(template,data) {
      var tmpl = toDo.templification(template);
      return tmpl(data);
    }
};//var toDo ends here
