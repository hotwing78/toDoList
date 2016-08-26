var toDoTemplates = {

        toDoItemTemplate:
                  `<form class = 'form-temp'>
                      <div data-id='<%= _id %>' class="checkbox">
                        <div class="check-circle"></div>
                        <input type="text" class='input-area' value="<%= content %>" readonly="true" onclick="this.readOnly=false">
                      </div>
                    </form>`

}
