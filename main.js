$(document).ready(function() {
    toDo.init();
})

var toDo = {
    url: 'http://tiny-tiny.herokuapp.com/collections/toDoListWingoA',

    listItems: [], //end listItems
    doneItems: [], //end doneItems

    init: function() {
        toDo.listRender();
        toDo.events();
    }, //end init

    listRender: function() {
        toDo.getListItems();
    }, //end listRender

    events: function() {

        //add to do item
        $('#newToDo').on('submit', function(event) {
                event.preventDefault();
                if ($('input #createTo').val() !== '') {
                    var newToDoItem = {
                        content: $('input #createTo').val(),
                    };
                    toDo.createListItem(newToDoItem);
                    newToDoItem._id = '12345678';
                    $('input').val('');
                    var htmlStr = toDo.htmlGenerator(toDoTemplates.toDoItemTemplate, newToDoItem)
                    $('.listItems').append(htmlStr);
                }

            }),

            //delete item
            $('.done').on('click', function(event) {
                event.preventDefault();
                if ($("div.listItems >.checkbox > input").is(":checked")) {
                    var itemId = $("div.listItems >.checkbox > input").parent().attr('data-id');
                    var text = $('.checkbox').text();
                    console.log(text);
                    console.log(itemId);
                    toDo.deleteListItem(itemId);
                }
            }), //end delete item

            //edit item
            $('.form-temp').on('submit',function(){
              event.preventDefault;
              var itemId = $("div.listItems >.checkbox > input").parent().attr('data-id');
              var newText = $(this).find('input').val();
              console.log(newText);
              toDo.editListItem(itemId,newText);
            })

    }, //end of events


    createListItem: function(item) {
        $.ajax({
            url: toDo.url,
            method: "POST",
            data: item,
            success: function(data) {
                console.log("WE CREATED SOMETHING", data);
                toDo.listItems.push(data);
                $('.listItems').html('');
                toDo.listItems.forEach(function(element, idx) {
                    var htmlStr = toDo.htmlGenerator(toDoTemplates.toDoItemTemplate, element);
                    $('.listItems').append(htmlStr)
                })
            },
            error: function(err) {
                console.error("Damn it!", err);
            }
        })
    }, //end of createListItem

    getListItems: function() {
        $.ajax({
            url: toDo.url,
            method: "GET",
            success: function(data) {
                console.log("WE GOT SOMETHING", data);
                $('.listItems').html("");
                data.forEach(function(element, idx) {
                    var htmlStr = toDo.htmlGenerator(toDoTemplates.toDoItemTemplate, element);
                    $('.listItems').append(htmlStr)
                });
                toDo.listItems = data;
            },
            error: function(err) {
                console.error("Damn it!", err);
            }
        });
    }, //end getListItems

    deleteListItem: function(itemId) {
        var deleteItem = toDo.url + '/' + itemId;
        $.ajax({
            url: deleteItem,
            method: "DELETE",
            success: function(data) {
                toDo.doneItems.push(data);
                console.log("Get that outta here!", data);
                toDo.getListItems();
            },
            error: function(err) {
                console.error('Damn it!', err);
            }
        });
    }, // end deleteListItems

    editListItem:function(itemId,data){
      var editItem = todo.url+ '/'+itemId;
      $ajax({
        url:editItem,
        data:data,
        method:'PUT',
        success: function(data){
          console.log('we changed something')
        }
      })
    },
    templification: function(template) {
        return _.template(template);
    },

    htmlGenerator: function(template, data) {
        var tmpl = toDo.templification(template);
        return tmpl(data);
    }
}; //var toDo ends here
