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