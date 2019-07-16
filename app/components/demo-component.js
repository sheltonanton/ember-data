import Component from '@ember/component';
import SearchBar from '../configurations/ui-components';

export default Component.extend({
  init: function(){
    this._super(...arguments);
    document.addEventListener('click',() => {
      this.set('toggleOpenClass', '');
    });
  },
  click: function(){
    this.set('toggleOpenClass', 'search-bar--open');
    return false;
  },
  didInsertElement: function () {
    let properties = {
      dataSource: [{
          category: "names",
          label: "Infant Antony Shelton",
          value: "shelton"
        },
        {
          category: "names",
          label: "Infant Antony Sheron",
          value: "sheron"
        },
        {
          category: "names",
          label: "Faizul Nafees",
          value: "faizul"
        },
        {
          category: "names",
          label: "Kathiravan Kumar",
          value: "kathiravanKumar"
        },
        {
          category: "names",
          label: "Arun Kumar",
          value: "arunKumar"
        },
        {
          label: "Keerthi Kumar",
          value: "keerthiKumar"
        },
        {
          label: "Stephen Suresh",
          value: "suresh"
        },
        {
          label: "Thenmalar Arochy",
          value: "thenmalarArochy"
        },
        {
          label: "Dinesh Eswin",
          value: "dinesh"
        },
        {
          label: "Vairamuthu",
          value: "vairam"
        },
      ],
      values: ['shelton', 'sheron']
    }
    SearchBar.createTokenField(this.element.querySelector('#search-bar'), properties)
  }
});
