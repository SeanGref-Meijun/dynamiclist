# dynamiclistjs

## Simple setup

1. Place the dynamiclist.js file in your javascript directory and include it in your html after you include jQuery.
 
2. Place the dynamiclist.css file in your css directory and include it in your html.

## Simple usage

Create an element (probably a div) with the class `dynamiclist` and an id:

```html
<div class="dynamiclist" id="some-id">
    <div class="dynamiclist-template">
        <label for="name">Name: </label>
        <input type="text" name="name" />
    </div>
</div>
```

__The element MUST have a an id!__

In javascript, instantiate dynamiclist on the element:

```javascript
$(document).ready(function () {
    $("#some-id").dynamiclist();
});
```

## Options

dynamiclistjs has the following options:

| Name | Description |
| ---- | ----------- |
| add-item-text | Text for the "Add Item" button. |
| data | Data to pre-fill list with. |

### add-item-text

```javascript
$(document).ready(function () {
    $("#some-id").dynamiclist({
        'add-item-text': 'Create somthing'
    });
});
```

### data

Data must be an array of arrays.

Each array within data must have an element for each input field in the template.

```javascript
$(document).ready(function () {
    $("#some-id").dynamiclist({
        'data': [["John"], ["Bob"], ["Thomas"]]
    });
});
```

## License

 Copyright 2015 Meijun, LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.