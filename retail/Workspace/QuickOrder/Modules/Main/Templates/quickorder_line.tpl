{{!
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
}}

<div class="quick-order-line" data-lineid="{{referenceline}}">

    <div class="quick-order-item">
        {{#if addedToCart}}
        <div class="quick-order-item-addedtocart-message">
            {{translate 'Added to Cart'}} <br>
        </div>
        {{else}}
        <div>

            <input class="quick-order-item-input" data-type="itemid" data-index="{{index}}" type="text" placeholder="SKU/UPC"  data-field="itemid" name="itemid" value="{{query}}" data-lastquery="{{query}}">

            <button class="quick-order-item-button" type="button" data-action="queryAgain" data-index="{{index}}" ><span class="sr-only">{{translate 'Search'}}</span> <i class="quick-order-search gs-icon-search" data-index="{{index}}"></i></button>

        </div>
        {{/if}}
    </div>

    <div class="column-details-desktop {{#if addedToCart}}quick-order-item-addtocart-success{{/if}}">

        {{#if noResults}}
            <div class="quick-order-lookup-noresults">
                <i class="quick-order-status-no-results"></i>
                <span>{{translate 'No Items Found Matching $(0)' query}}</span>
            </div>
        {{/if}}

        {{#if resultsFound}}
            <div class="quick-order-lookup-results">
                <label class="quick-order-lookup-results-group-label sr-only" for="results-{{index}}">{{translate 'Items Found'}}</label>
                <i class="quick-order-status-results"></i>
                <div class="quick-order-dropdown-form-controls">
                    <select name="results-{{index}}" id="results-{{index}}" class="quick-order-dropdown-select" data-action="select" data-field="results" data-query="{{query}}" data-index="{{index}}">
                        <option value="">{{translate '-- Select --'}}</option>
                        {{#each results}}
                            <option value="{{internalid}}" {{#if selected}}selected{{/if}}>{{name}}, {{sku}}</option>
                        {{/each}}
                    </select>
                </div>
            </div>
        {{/if}}

        {{#if newline}}
            <div class="quick-order-item-details-placeholder">
                <div class="quick-order-item-image-placeholder">
                    <div class="quick-order-item-image-shape"></div>
                </div>

                <div class="quick-order-item-name-placeholder">
                    <div class="quick-order-item-name-shape"></div>
                    <div class="quick-order-item-name-shape"></div>
                </div>
            </div>
        {{/if}}

        {{#if itemSelected}}

            <div class="quick-order-item-details">

                {{#if isNavigable}}
                    <div class="quick-order-item-image">
                        <a {{linkAttributes}} class="quick-order-image-link" target="_blank">
                            <img src="{{resizeImage thumbnailURL 'thumbnail'}}" alt="{{thumbnailAltImageText}}" />
                        </a>
                    </div>
                    <div class="quick-order-item-name">
                        <a {{linkAttributes}} class="quick-order-name-link" target="_blank">
                            {{name}}
                            <div class="quick-order-item-sku">{{translate 'SKU/UPC:'}} {{sku}}</div>
                        </a>
                    </div>
                {{else}}
                    <div class="quick-order-item-image-viewonly">
                        <img src="{{resizeImage thumbnailURL 'thumbnail'}}" alt="{{thumbnailAltImageText}}" target="_blank" />
                    </div>
                    <div class="quick-order-item-name-viewonly">
                        {{name}}
                        <div class="quick-order-item-sku">{{translate 'SKU/UPC:'}} {{sku}}</div>
                    </div>
                {{/if}}
            </div>
        {{/if}}

    </div>

    <div {{#if addedToCart}}class="quick-order-item-addtocart-success"{{/if}} >
        <div class="quick-order-qty">
            <input type="number" class="quick-order-qty-input {{#if minQtyAlert}}quick-order-item-minqty-warning{{/if}}" min="{{minquantityvalue}}" name="qty" data-index="{{index}}" data-field="itemqty" value="{{quantity}}" required>
            {{#if itemSelected}}
                <div class="quick-order-status">
                    {{#if isinstock}}
                        {{translate 'In Stock'}}
                        <br>
                        {{#if quantityAvailable}}
                            {{translate 'Available: $(0)' quantityAvailable}}
                        {{/if}}
                    {{else}}
                        {{translate 'Out of Stock'}}
                    {{/if}}

                    {{#if minquantity}}
                        <br>
                        {{translate 'Min Qty:'}} {{minquantityvalue}}
                    {{/if}}
                </div>
                <div class="out-of-stock-notification-container" data-view="QuickOrder.OutOfStockNotification"></div>
            {{/if}}
        </div>
    </div>

    <div {{#if addedToCart}}class="quick-order-item-addtocart-success"{{/if}} >

        <div class="quick-order-remove quick-order-remove-mobile">
            <a class="gs-icon-close" data-action="removeLine" data-index="{{index}}"><span class="sr-only"> {{translate 'Remove'}}</span></a>
        </div>

        {{#unless itemSelected}}
            <div class="quick-order-item-price-placeholder quick-order-item-price-placeholder-mobile">
                <div class="quick-order-item-price-shape"></div>
            </div>
        {{/unless}}

        {{#if itemSelected}}
            <div class="quick-order-item-price quick-order-item-price-mobile" data-view="Item.Price"></div>
        {{/if}}

        {{#if itemSelected}}

            <div class="quick-order-item-price" data-view="Item.Price"></div>

            <div class="quick-order-item-amount">{{amount}}</div>

        {{/if}}

        {{#if newline}}
            <div class="quick-order-item-price-placeholder">
                <div class="quick-order-item-price-shape"></div>
            </div>

            <div class="quick-order-item-amount-placeholder">
                <div class="quick-order-item-price-shape"></div>
            </div>
        {{/if}}



    </div>

    <div class="quick-order-remove {{#if addedToCart}} quick-order-item-addtocart-success{{/if}}">
        <a class="gs-icon-close" data-action="removeLine" data-index="{{index}}"><span class="sr-only"> {{translate 'Remove'}}</span></a>
    </div>

    <!-- Mobile Row -->
    <div class="column-details-mobile {{#if addedToCart}}quick-order-item-addtocart-success{{/if}}">

        {{#if noResults}}
            <div class="quick-order-lookup-noresults">
                <i class="quick-order-status-no-results"></i>
                <span>{{translate 'No Items Found Matching $(0)' query}}</span>
            </div>
        {{/if}}

        {{#if resultsFound}}
            <div class="quick-order-lookup-results">
                <label class="quick-order-lookup-results-group-label sr-only" for="results-{{index}}">{{translate 'Items Found'}}</label>
                <i class="quick-order-status-results"></i>
                <div class="quick-order-dropdown-form-controls">
                    <select name="results-{{index}}" id="results-{{index}}" class="quick-order-dropdown-select" data-action="select" data-field="results" data-query="{{query}}" data-index="{{index}}">
                        <option value="">{{translate '-- Select --'}}</option>
                        {{#each results}}
                            <option value="{{internalid}}" {{#if selected}}selected{{/if}}>{{name}}, {{sku}}</option>
                        {{/each}}
                    </select>
                </div>
            </div>
        {{/if}}

        {{#if itemSelected}}

            <div class="quick-order-item-details">

                {{#if isNavigable}}
                    <div class="quick-order-item-image">
                        <a {{linkAttributes}} class="quick-order-image-link" target="_blank">
                            <img src="{{resizeImage thumbnailURL 'thumbnail'}}" alt="{{thumbnailAltImageText}}" />
                        </a>
                    </div>
                    <div class="quick-order-item-name">
                        <a {{linkAttributes}} class="quick-order-name-link" target="_blank">
                            {{name}}
                            <div class="quick-order-item-sku">{{translate 'SKU/UPC:'}} {{sku}}</div>
                        </a>
                    </div>
                {{else}}
                    <div class="quick-order-item-image-viewonly">
                        <img src="{{resizeImage thumbnailURL 'thumbnail'}}" alt="{{thumbnailAltImageText}}" target="_blank" />
                    </div>
                    <div class="quick-order-item-name-viewonly">
                        {{name}}
                        <div class="quick-order-item-sku">{{translate 'SKU/UPC:'}} {{sku}}</div>
                    </div>
                {{/if}}
            </div>

            <div class="quick-order-status quick-order-status-mobile">
                {{#if isinstock}}
                    {{translate 'In Stock'}}
                    {{#if quantityAvailable}}
                        <br />
                        {{translate 'Available: $(0)' quantityAvailable}}
                    {{/if}}
                {{else}}
                    {{translate 'Out of Stock'}}
                {{/if}}

                {{#if minquantity}}
                    <br>
                    {{translate 'Min Qty:'}} {{minquantityvalue}}
                {{/if}}
            </div>
        {{/if}}

    </div>

</div>

<hr class="hr-double"/>
