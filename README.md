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
For every list item, each `input` will have `-X` appended to the `name` attribute, where `X` is the index of the item, starting at 0. Each label will have `-X` appended to the `for` attribute in order to match the `input`.

There will also be a hidden element after the Add Item button that counts how many list items there are. This is useful when using dyanmiclist in a form. The name of the field comes from the id of the parent container (the one with the `dynamiclist` class). Using the above example, the counter will have the name `some-id-count`.

We can build an array of the returned values easily using both of these.

If we use the following form...

```html
<form action="GET">
    <div class="dynamiclist" id="people">
        <div class="dynamiclist-template">
            <label for="name">Name: </label>
            <input type="text" name="name" />
            <br>
            <lavel for="age">Age: </label>
            <input type="number" name="age" />
        </div>
    </div>
</form>
```

...then using PHP we can get the entire list with the following: 

```PHP
$listItems = array()
$listCount = $_GET['people-count'];

for($i = 0; $i < $listCount; $i++) {
    $name = $_GET['name-' . $i];
    $age = $_GET ['age-' . $i];
    $listItems[] = array($name, $age);
}
```

To populate the dynamic list with this data, we can do the following:

```javascript
$(document).ready(function () {
    $("#people").dynamiclist({
        'data': <?php echo json_encode($listItems); ?>
    });
});
```

Note that even if there is only one input field, each list item must be wrapped in an array.

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