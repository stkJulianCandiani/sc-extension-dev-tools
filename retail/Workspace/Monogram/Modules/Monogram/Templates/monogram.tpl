{{#if showMonogram}}
    {{#if showCustomizationOptions}}
        <div class="product-views-option-tile-container ironon-feature">
            <label class="product-views-option-tile-picker ironon-feature-buttom">
                <input class="product-views-option-tile-input-picker" type="radio" name="remove-customization" data-action="remove-customization" value="remove">
                {{translate 'Remove Monogramming'}}
            </label>
        </div>
        {{#if serviceFeeMessage}}
            <div class="ironon-feature-header-warning">
                <div class="iron-on-description">{{{serviceFeeMessage}}}</div>
            </div>
        {{/if}}
        <div class="ironon-feature">
            <div class="ironon-feature-header">
                <label class="product-views-option-tile-label">{{translate 'Add Monogram'}} :</label>
            </div>
            <div class="ironon-feature-numeral-selection">
                <div class="ironon-feature-minus"><span class="remove-troop-numerals" data-action="remove-monogram"><img class="ironon-feature-icon-img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABHNJREFUeNrsm1tIFUEYxz2VlpppBt0MoVK7QKQQJQURlV18CCKkJCM0K4mKnop6MgoqJLpSRFD2EEFE+RQYZD0EVgZGYXd7KNKkm9hFTdO+le/AMMzMzjm7eyr6/+EPx51v98yZ3+7O982uof7+/jjo79EgDAGAQAACIBCAAAgEIAACAQiAQAACAQiAQAACIBCAAAgEIAACAQgEIAACAQiAQAACIBCAAAgEIBCAAAgEIAACAQiAQLHREHlDKBTCqESuNHI+eTY5hzyc/IM8j9xEbiAfJ38Sd1L9f2dI3hhjIEP5x4wQnMoOCTGJ5Hj+oU5bCn922hLISeTBvF2nJI6V9Y3cG2X/nT5mkEdZxD5mYF1+AhnDX57AA6lSCg9sFjmTnM7xyYJH8v7D/rMraS+50gRkYKNoSQvIR8mN5G4nHPbkTnKFbuwHxl8DxDnLb2AAA/PG8N3JFsg+DFrgzlAB0aW9RUicAtdk2zrEyVymYLwCV5YtkNEYK0+6Q95ObnWJ67YqDEmTYtDpy5xxiMolz1TEXiWf0BxnGjmPfI/c7FPfdpOXSNvqyY/Imy3230+uJa8mj4v42xWTeqlhImqzmKyO8JXXomlv0FS67zTxsxTxc8n3hZibPsE4qOnDT/JDi9/eJBS0D1xi19pmWVs8ZA59fG8sNMSozrLqCOA5KeMvKe6V5YAnG9ryuGL3kjmtEY532yW2xBbIJg8dquPO1GnaP3PSIKrAcLxSKXaDJu6aC4iV5BfCWZyvWFZp8gjjiTQnuwEptwVS5KFTW12ujmpFRvfcAC9JiC00nMEFBhiqmqpRiqn0oa4okY7pG5A5HjqVTX5jaF8ndXqPIfawELeYV09VcdcNC39Vhnu9OH+1e4TxQbFw6QakwhZITpSdcs66ZYb2Xin3dtLrr4a5aCLHpbqso63QADlj2Oe0EHfAh6vjrOL73YBsswWSFWWnnHTvoqH9nNThk4bYGiGu3BDXqkndsxmqbr9cjhurSBCicbFfQFSFYWeUKeNd8lJDe71U65hy+mNC4brLEHdB8yzjkJB+yqrlFDaOl//9eGr61K8CTdWZaB7WvOflFt2Dmi9SJrRTc2aHH+Tc4s+LdEsMrPOKbfM5q9KpKoBCtz2KffpsK/WeKA7exrcWnZoZdBpXr2WG2LfkHfx5oSHuI3k5W1SxqQ7m29UM/jvdJyBlnBWKmuCyz3dlJqJ4YpjIGQ0UrIpo7K/Y3LK6eKkAClbttnOIc8k8w3gFrhZbIHHCpAoFI2c+fR0JkFOcn0PBqCZOeB3IbfldLMjwpon/dubn6aqxd+z2XpbzXtUqzu0zpTqjh1O3Lol2Osem4kJQlhTryZfCQGzSXr++fDx5Kp8N2VzgTeYqPf4fH9g+XocTs6UO3t7B28Ju48XHVk6WXop3J1cg0J8V3n4HEAhAAAQCEACBAARAIAABEAhAIAABEAhAAAQCEACBAARAIACBAARAIAABEAhAAAQCEACBAAQCEACBAARAIAABEChG+i3AALDRwS+bw8eKAAAAAElFTkSuQmCC"></span></div>
                <div class="ironon-feature-numerals-row" data-view="Monogram.Alphabet"></div>
                <div class="ironon-feature-plus"><span class="add-troop-numerals" data-action="add-monogram"><img class="ironon-feature-icon-img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAB39JREFUeNrsXX2IFVUUvy9ddV11/di1TaNMhET7UMwoBLM0oz/6sKIP+oQwMyMjIsyQ+qNSCyJMyMSQPqQMSzMrK8QoqcxstbC0rLS22kxtU3etdHc7P+Y8nIZ5986bd+fNndf5wY+ZnbnzZu75zdx77plzZ3OdnZ1K4A6OExOIIAIRRAQRiCAVAnhZhVgh6EucQHyCeAhVJm4lnuGi3XM6w+dyOVeN3J94IXEc8RziwJAyXbhczwK/cYB4A/GNtAQJtbnjguAC5hAvILbynT2IeD2xq4Xf/5l4okuCuN5k3cNNTJLsJ01W9KejiZ+IJFFP3OvKE+Kyl3VKGcQ4SvxD3N5oKEfb/jWx3aVKd3VYkP5FlMVdvp34C7u2NcST2LXtoTmu0bVKuyyIDruJrxHXETcTmwuUu5H4vOZ3vhVB7GA68e0I5YYZ9jsnSFZDJ79GLGcSZLsIYg9d2DXWYbhmXwdxhwhiBy/yyH1FCZ7aLuJf0ofYwUhe9jPUbaBm/04XK5b18Psmzb6BhmP3iiD28ZlvfTzxZeJN/PegLArSNeOCfMLLKdyf5G8wjD3qDMd2yhNi3/X9iVhNXOSrS35k3lcEsYu/DftX83JaoL9ojihIiwhSHA4b9r+nvLeGjwW2f5RlQbLchyAw+CGxKiDianlCyo/viFeFeFKv+AxtEuRPEcQe3iFODdn+tG/dJEi7ixXLapM1NdBUAVuIG4sQ5KA8IfZQFbJteeBv0zikQwRJFqt866OJYwzlD4ggyeEb9d93Gw9mtSKVIsjrvnVkMl4mgthHrxiCIGyyOMt3lsuC9IxYbh/xY15fSjxdBElXkLXsMSHf99qst70uC1Ifsdy7ysvherQSOkOXB4Z1EcthMDhTeYlxaQHnHqq8WBqi1Ig+DyE2EPsoL2sf0x5abAiCzI6HibdyuGEb8TnisoQ79KERyrVy5e+IcY7b2V3OJzp089kk71B0V977lnbfyB4R5pE+42KQGiUHGdmVlxM/0Bo7Qvb7fcT5gV1IUkZwD8lqxysvu6OBwxVgLZer4Quu4nXFFezu84p68LYaPq5O6dM/s4zflZfe2hx3wg7ulGafMQWl41PiRLL7oTid+mQRwzrO1vWPJkHGiP0SweG4gpwgtksER+MKIvPYk0F1Fsch5QbC8T/4/u6tcb13Edfwcj+7zHkjDybeazgXBrJNoXsMs3Ax1ih1litmNT3JXBuy/wCHPfao5Gfc6jgnYJqFmrLjNMYeFeFckwrZ3NQk2Zh0idDG3cywt3TrlZdBMiDlJ2Slb/0s5U0KKoTxmn1RXg03xO0jbEy8/JyXE4kXh+z/SnlTz9Lsr1r5OvLN+GLD9UzRNPc/KvPr4UFxBam3UNl8aHy2JhY1LuWn43ufEWHs0YbyYzUe6BFupmN5ryZBqkusaBs3Rxjxn1+gDGI7w1MWxH9HXxLxGN17l31xb3STIN1KrOgW9rlnqfDpZzt8Xop1nz6mGxo1MnFmCeerT8vt3czLaQX252fBIhJaG/Mc9xMfL/E6G/jmPK8IQdDx36K8uY4DuF8YzGGRUw3H9klLEPj1IzSxGzwZE7jNHRLzHHdauE4YqNhMxiuYVpG0IAi7P6LZP5lZCk7O4CD0SFqCzJcAQCj2SqzKLeyMK0ib2C4RbIgryKtiO+t9xwLim3EF2Sg2LBkIJiKeN4Nd45k6j87Uqa/nH8yJXYvutJH8jffnS5T3obRIiJJ1skgzsHMV7Txg0wHJG9t4UNrCS/SZh3yjf3/6TxC9Ajc08rEQSP0ySt9bymdicWIECE+LaRzM5cM7jz1818AIyIdqUuFTn9u4ongXMyrmOVfw+GSspgxutOmptWMF7B5lHII7BslhCElPUoUDjjgDAomYzI9Q9i5eboh5zbtLEATOyF2GMtUuPtpRB4Z4vC9lJ6APV6YjcIfDg2h1oE7IREQC36wsdj7FjtQ7uL1tcbhOK7mZNF1jlYsXX4kj9aW8NHk2NSJI8sCbv3W83mQo21MESR4L1bG3f6YvVleLIMmizddc5d1tHXqLIMnihUBHLoKkjKdCxjE2PUwRpAi8zxEAhEsW8CB1jeGYWidr4vA/dFmloqeBXsnHPFTEMQddtHslCNLEzQ8mwrT7tr8U4VjnBKmEJmsRN1XPBprgrZmsTcafEMTPMAv3mcB2hM+RerRfnpDy4i3lZQHeFtiO/y2Cl0S/Za1CWRcEY48HQrbP5WZM9zGBIyKIXSDU/w/xusB2fBmokTv4RoMg3UQQe0DiQFim+jzfuu5j/QguXi2C2AMSpG8ObPtCHfsevFLmiO9k1yqV5Umf54ZsWx342xSvwr90zSmHvgNfabNwEVDEh2HwrRS8j59hKI/pAxcpbzKqjEMshk5KId6bDHPF7pJs7X29aIl06m4BM6dGiCBuYYwIokf7/9EWLguC2VdHy3g+N/7JpMNeFjC7TJ7WXFfs7rogCBAuT1iMeS49CFGy311oVhEiuYY9IXx0s5igIAKQOzmMgpA8svDxpQVMxcbUgU1pCRJqc0eeBIG4vSKIQAQRQQQiSGXhXwEGAIryrF0MkXoNAAAAAElFTkSuQmCC"></span></div>
                <div class="ironon-feature-header-validation">
                    <input type="checkbox" data-action="monogram-confirmation" name="numeral-confirmation" id="numeral-confirmation" {{#if orderConfirmed}} checked {{/if}}>
                    <label class="numeral-confirmation-lable" for="numeral-confirmation"> {{confirmationText}}</label>
                </div>
            </div>
            <div data-view="Monogram.Error"></div>
            <div data-view="Monograms.BackOrderMessage"></div>
  
            <div data-view="Extra.ItemPrice"></div>    

             
        </div>
    {{else}}
        <div class="ironon-feature">
            <label class="product-views-option-tile-picker ironon-feature-buttom" >
                <input class="product-views-option-tile-input-picker" type="radio" name="show-customization" data-action="show-customization" value="show">
                {{translate 'Add Monogramming'}}
            </label>
        </div>
    {{/if}}
{{/if}}

