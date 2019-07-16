import $ from 'jquery';
export default (function () {
  var dataSource = null;
  var properties = null;
  var input = null;
  var menu = null;
  var container = null;
  var token = null;
  var returnObject = {
    createTokenField: function (element, prop) {
      container = document.createElement('div');
      container.style.position = "relative"; //setting position as relative for absolute menu to appear inside it
      element.innerHTML = '';
      element.appendChild(container);
      let {
        dataSource: data,
        ...options
      } = prop;
      if (typeof data == "object") {
        if (Array.isArray(data)) {
          dataSource = data;
        }
      } else {
        throw "Specify dataSource as an Object or an Array"
      }
      if (typeof options == "object") {
        let val = options.values;
        properties = prop;
        val && (Array.isArray(val) || function () {
          throw "Specify 'values' as an Array"
        }());
        if (val) {
          val = dataSource && dataSource.filter(d => {
            return val.includes(d.value);
          })
          //populating with values
          val.forEach((v, index) => {
            let token = this.createToken(v.label, v.value, v.category, index, options.tokens);
            container.appendChild(token); //appending the token
            container.setAttribute('data-lastTokenId', index);
          })
        }
        input = this.createInput();
        container.appendChild(input); //appending the input

        menu = this.createMenu();
        container.appendChild(menu); //appending the menu
      } else {
        throw "Specify options as an Object"
      }
    },
    createToken: function (label, data, category, index, property) {
      let element = token || document.createElement('div');
      element.innerHTML = '';
      element.setAttribute('id', `search_token_${index}`);
      element.classList.add('custom-search-bar--token');
      if (property && property.class) {
        element.classList.add(property.class);
      }
      element.setAttribute('data-id', index);
      element.setAttribute('data-value', data);
      element.setAttribute('data-category', category);
      if(category){
        let cat = document.createElement('span');
        cat.setAttribute('class', 'custom-search-bar--token__category');
        cat.innerHTML = category;
        element.appendChild(cat);
      }

      let input = document.createElement('span');
      input.setAttribute('class', 'custom-search-bar--token__input');
      input.setAttribute('contenteditable', true);
      input.addEventListener("input", (event)=>{
        // token = element;
        // this.triggerSearch(event.target.innerHTML, category);
      })
      input.innerHTML = label;
      element.appendChild(input);

      let close = document.createElement('span');
      close.setAttribute('class', 'custom-search-bar--token__close');
      element.appendChild(close);

      element.addEventListener("click",(event) => {
        if (event.target == close) {
          setTimeout(()=>{
            this.removeToken(element);
          },0);
        }
      });
      return element;
    },
    createInput: function () {
      let element = document.createElement('input');
      element.setAttribute('class', 'custom-search-bar--input');
      element.onkeydown = (event) => {
        if (event.key == "Backspace" && input.value == "") {
          this.popToken(container);
        }
      }
      element.oninput = element.onfocus = (event)  => {
        setTimeout(() => {
          input.value = (event && event.target.value) || "";
          this.triggerSearch(input.value);
        }, 0);
      }
      return element;
    },
    createMenu: function () {
      menu = document.createElement('div');
      menu.setAttribute('class', 'custom-search-bar--menu hide');
      return menu;
    },
    openMenu: function (filteredDataSource) {
      let list = null;
      menu.style.position = "absolute";
      menu.style.width = container.offsetWidth;
      menu.setAttribute('class', 'custom-search-bar--menu');
      if (filteredDataSource.length) {
        list = document.createElement("ul");
        list.setAttribute('class', 'custom-search-bar--menu-items');
        filteredDataSource.forEach(data => {
          let item = this.createMenuItem(data);
          list.appendChild(item);
        })
      } else {
        list = this.showEmptyMessage();
      }
      //TODO find another best method for rerendering with new list
      menu.innerHTML = '';
      menu.appendChild(list);
    },
    closeMenu: function(){
      menu.setAttribute('class', 'custom-search-bar--menu hide');
    },
    createMenuItem: function (menuItem) {
      let element = document.createElement('li');
      element.setAttribute('class', 'custom-search-bar--menu-item');
      element.setAttribute('data-label', menuItem.label);
      element.setAttribute('data-value', menuItem.value);
      element.setAttribute('data-category', menuItem.category);
      element.innerHTML = menuItem.label;
      element.id = menuItem.value;
      //TODO on select update the add Token method with the selected one
      element.addEventListener("click",(event) => {
        if(token!= null){
          //TODO
          // token = this.createToken(menuItem.label, menuItem.value, menuItem.category, token.dataset.id, properties.tokens);
          // token = null;
        }else{
          this.addToken(menuItem.label, menuItem.value, menuItem.category);
          event.stopPropagation();
        }
      });
      return element;
    },
    showEmptyMessage: function () {
      let emptyContent = document.createElement('p');
      emptyContent.innerHTML = "No results found";
      return emptyContent;
    },
    addToken: function (label, value, category) {
      let index = container.dataset.lastTokenId;
      let token = this.createToken(label, value, category, index + 1, properties.tokens);
      container.insertBefore(token, input);
      container.setAttribute('data-lastTokenId', index + 1);
      //clear and focus input
      input.value = "";
      input.focus();
    },
    popToken: function () {
      let childs = container.querySelectorAll(`[id*='search_token_']`);
      childs.length && childs[childs.length - 1].remove();
      this.triggerSearch("");
    },
    removeToken: function (token) {
      token.remove();
      input.focus();
    },
    startSearch: function(){

    },
    triggerSearch: function (searchString, category) {
      //TODO
      //TODO also filter the data with same category and input already present in dom
      if (Array.isArray(dataSource)) {
        let filteredDataSource = dataSource.filter(data => {
          return (data.label && data.label.includes(searchString))
        })
        if(category!=null && category != ""){
          filteredDataSource = filteredDataSource.filter(data => {
            return (data.category == category);
          })
        }
        //check for duplicate entries
        let tokens = Array.from(container.children).map(child => {
          return child.dataset.value
        });
        filteredDataSource = filteredDataSource.filter(data => {
          return !(tokens.includes(data.value));
        })
        //menu open with filteredDataSource
        this.openMenu(filteredDataSource);
      } else {
        //a callback function for forming query is given in dataSource
        let query = dataSource.query(searchString);
        //TODO validate query string
        if (url == '') throw "Specify a valid url";
        if (typeof query != "object") throw "Specify query as an object";
        let {
          url,
          method = "GET",
        } = dataSource;
        query = Object.keys(query).reduce((a, c) => {
          a = a + `${c}=${query[c]}`;
        }, '');
        $.ajax({
          url: url + (query) ? `?${query}` : '',
          method,
          success: (data) => {

          },
          error: (error) => {

          }
        });
      }
    }
  }
  document.addEventListener("click", function (event) {
    if(event.path.includes(menu) || event.path.includes(container)){
      event.preventDefault();
    }else{
      returnObject.closeMenu();
    }
  });
  return returnObject;
}())
