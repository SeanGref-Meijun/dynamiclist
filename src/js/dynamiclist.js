/*
 * dynamiclist.js
 *
 * Version: 0.0.1
 * Author: Sean Gref
 *
 */


/*
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
 */

(function($) {
    $.fn.extend({
        dynamiclist: function(options) {
            options = $.extend( {}, $.DynamicList.defaults, options );

            this.each(function() {
                new $.DynamicList(this, options);
            });
            return this;
        }
    });
})(jQuery);

$.DynamicList = function(ctl, options) {
    var root = $(ctl);
    var name = root.attr('id');

    var template = root.find(".dynamiclist-template");
    if(template.length === 0) {
        throw "Cannot find template for dynamic list: " + name;
    }

    var counter = $('<input type="hidden" name="' + name + '-count" value="0" class="dynamiclist-counter"/>');
    var count = 0;

    var addListItem = function(data) {
        if(data === undefined) {
            data = [];
        }
        var clone = template.clone();
        clone.removeClass("dynamiclist-template");

        var c = 0;
        clone.find("input").each(function () {
            $(this).data('orig-name', $(this).attr('name'));
            $(this).data('orig-id', $(this).attr('id'));
            $(this).attr('name', $(this).attr('name') + '-' + count);
            $(this).attr('id', $(this).attr('id') + '-' + count);
            if(data[c] !== undefined) {
                $(this).val(data[c]);
            }
            c++;
        });
        clone.find("label").each(function () {
            $(this).data('orig-for', $(this).attr('for'));
            $(this).attr('for', $(this).attr('for') + '-' + count);
        });

        $('<div class="dynamiclist-item"></div>')
            .append(
            $('<div class="dynamiclist-item-content"></div>').addClass('pull-left')
                .append(clone)
        ).append(
            $('<button class="btn btn-danger dynamiclist-item-remove" type="button" tabindex="-1">x</button>')
                .click(function () {
                    $(this).parent().remove();
                    var c = 0;
                    root.find(".dynamiclist-item").each(function () {
                        $(this).find("input").each(function () {
                            $(this).attr('name', $(this).data('orig-name') + '-' + c);
                            $(this).attr('id', $(this).data('orig-id') + '-' + c);
                        });
                        $(this).find("label").each(function () {
                            $(this).attr('for', $(this).data('orig-for') + '-' + c);
                        });
                        c++; // haha
                    });

                    count = c;
                    root.find(".dynamiclist-counter").val(count);
                })
        )
            .insertBefore($(addButton));
        count++;
        root.find(".dynamiclist-counter").val(count);

        return clone;
    }

    var addButton = $('<button type="button" class="dynamiclist-addbutton btn btn-primary">' + options['add-item-text'] + '</button>');
    addButton.click(function () {
        var clone = addListItem();
        clone.find(':input:enabled:visible:first').focus();
    });

    root.append(counter);
    root.append(addButton);

    var data = options['data'];
    for(var i = 0; i < data.length; i++) {
        addListItem(data[i]);
    }
}

$.DynamicList.defaults = {
    'add-item-text': 'Add Item',
    'data': []
};