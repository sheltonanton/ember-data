//for deleting the view, generate event with the id or any other functions
export default {
  editable: {
    init: function (view) {
        view.click = function(){
            view.removeBehaviour('editable');
            let element = view.element;
            let value = view.get('value'); //can get value from function
            let onchange = function(event) {
                let value = event.target.value;
                view.set('value', value); //cannot set value from this function and could be set using view
                view.addBehaviour('editable');
            }

            var input = document.createElement('input');
            input.value = value;
            input.onkeydown = ()=>{
                if(event.key == "Enter"){
                    onchange(event);
                }
            };
            input.onblur = onchange;
            element.innerHTML = '';
            element.appendChild(input);
            input.focus();
        }
    },
    afterAdd: function(view){
        let element = view.element;
        element.innerHTML = view.get('value');
    },
    beforeRemove: function (view) {
        view.click = function(){};
    }
  },
  clickable: {
      init: function(view){

    },
      afterAdd: function(view){

      },
      beforeRemove: function(view){
          
      }
  },
  inline: {
      init: function(view){
        view.set('tagName', 'span');
      }
  },
  appendable: {
      init: function(){

      },
      afterAdd: function(view){

      },
      beforeRemove: function(view){

      }
  },
  draggable: {
    init: function(view){
        //learning drag and drop
    }
  }
}
