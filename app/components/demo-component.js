import Component from '@ember/component';
import SearchBar from '../configurations/ui-components';

export default Component.extend({
  didInsertElement: function () {
    let properties = {
      dataSource: [{
          label: "Infant Antony Shelton",
          value: "shelton"
        },
        {
          label: "Infant Antony Sheron",
          value: "sheron"
        },
        {
          label: "Faizul Nafees",
          value: "faizul"
        },
        {
          label: "Kathiravan Kumar",
          value: "kathiravanKumar"
        },
        {
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
