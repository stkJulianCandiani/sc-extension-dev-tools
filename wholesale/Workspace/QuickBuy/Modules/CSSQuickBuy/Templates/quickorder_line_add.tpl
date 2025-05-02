<div class="quick-order-line" data-lineid="{{referenceline}}">
    <div class="quick-order-item">
        {{#if addedToCart}}
            <div class="quick-order-item-addedtocart-message">
                {{translate 'Added to Cart'}}
                <br />
            </div>
        {{else}}
            <input class="quick-order-item-input" data-type="itemid" data-index="{{index}}" type="text" placeholder="SKU/UPC" tabindex="{{index}}"  data-field="itemid" name="itemid" value="{{query}}" data-lastquery="{{query}}">
            <button class="quick-order-item-button" type="button" data-action="queryAgain" data-index="{{index}}" >
              <i class="quick-order-search" data-index="{{index}}"></i>
            </button>
        {{/if}}
    </div>

    <div class="quick-order-item-data{{#if addedToCart}}quick-order-item-addtocart-success{{/if}}" >
        <div class="quick-order-status">
          {{#if resultsFound}}
            <div class="quick-order-lookup-results">
                <!-- <label class="quick-order-lookup-results-group-label sr-only" for="results-{{index}}">{{translate 'Items Found'}}</label> -->
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
          {{#if noResults}}
            <i class="quick-order-status-no-results"></i>
            <span class="quick-order-lookup-noresults">
                {{translate 'No Items Found Matching $(0)' query}}
            </span>
          {{/if}}
        </div>

        {{#if itemSelected}}
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
        {{/if}}

        {{#if newline}}
            <div class="quick-order-item-image-placeholder">
                <div class="quick-order-item-image-shape"></div>
            </div>

            <div class="quick-order-item-name-placeholder">
                <div class="quick-order-item-name-shape"></div>
                <div class="quick-order-item-name-shape"></div>
            </div>

            <div class="quick-order-item-price-placeholder">
                <div class="quick-order-item-price-shape"></div>
            </div>
        {{/if}}
    </div>

    <div class="quick-order-unit-price" >
      <div class="quick-order-item-price" data-view="Item.Price"></div>
    </div>

    <div class="quick-order-unit-price">
        {{#if itemSelected}}
            {{quantityavailable}}
        {{/if}}
    </div>

    <div class="quick-order-qty-container {{#if addedToCart}}quick-order-item-addtocart-success{{/if}}" >
        <div class="quick-order-qty">
           <input type="number" class="quick-order-qty-input {{#if minQtyAlert}}quick-order-item-minqty-warning{{/if}}" tabindex="{{quantityTabIndex}}" min="{{minquantityvalue}}" name="qty"
           data-index="{{index}}" data-field="itemqty" value="{{quantity}}" required {{#if focus }}data-focus="true"{{/if}}/>
        </div>

        {{#if itemSelected}}
            <div class="quick-order-status">
                {{#if isinstock}}
                    <span class="quick-order-status-found-instock">In Stock</span>
                {{else}}
                    <span class="quick-order-status-found-outofstock">Out of Stock</span>
                {{/if}}

                {{#if minquantity}}
                    <span class="quick-order-status-min-quantity">{{translate 'Min Qty:'}} {{minquantityvalue}}</span>
                {{/if}}
            </div>
        {{/if}}
    </div>

    <div class="quick-order-amount" >
      <div class="quick-order-item-price">{{amount}}</div>
    </div>

    <div class="quick-order-remove">
        <a class="quick-order-remove-icon" data-action="removeLine" data-index="{{index}}"><i class="icon-quickorder-remove"></i></a>
    </div>


</div>
