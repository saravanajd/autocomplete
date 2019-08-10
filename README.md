# <a hre='https://saravanajd.github.io/autocomplete/index.html'>Autocomplete</a>
 A lightweight, flexible, fast jQuery autocomplete/typehead plugin which automatically suggests matching items while typing keywords(search items) in a text field. This plugin enables your users to quickly filter, find and select items from huge lists such as user list, country list, search results and more.you can find more details about autcomple plugin <a hre='https://saravanajd.github.io/autocomplete/index.html'>here</a>
 
 If you are interested in using this jQuery autocomplete/typehead plugin on your site, you can find out more details in

### Add the class autocomplete
```
<input type="text" class="autocomplete" value="">
```

### How do use autocomplete
```
const country = [{Id:1,Name:'India'},{Id:2,Name:'Japan'},{Id:3,Name:'US'}];
$('.autocomplete').autocomplete({
      dataSource: country,
      textProperty:'Name',
      valueProperty:'Id'      
    });
    
```

### All default options to customize the autocomplete
```
$('.yearpicker').yearpicker({

  // Text property of an array
  textProperty: 'name',
  // value propertu of an array
  valueProperty: 'value',
  // array
  dataSource: [],
  // default selected value
  defaultValue: '',
  // if text is not matched then default value
  notMatchedValue: '',
  // delay in mili seconds seach text while typing
  keyboardDelay: 500,
  // show no result text if result is not match
  showNoResults: false,
  // show matched charected in bold
  markAsBold: true,
  // close the dropdown on select
  closeOnSelect: true,
  // allow custom value
  allowCustomValue: true,
  // add class for selected item
  selectedClass: '',
  // autocomplete container class
  wrapClass: ''
  
});
```

