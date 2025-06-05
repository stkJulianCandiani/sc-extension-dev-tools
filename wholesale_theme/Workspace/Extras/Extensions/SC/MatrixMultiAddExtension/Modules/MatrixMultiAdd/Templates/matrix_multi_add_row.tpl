
    {{#if isDisplay}}
        <tr data-rowid="{{uniqueID}}" class="matrix-multi-add-row" data-action="mma-show-prices">
            <td>
                {{#if thumbnailImage.url}}
                    <img class="matrix-multi-add-thumb-image" src="{{thumbnailImage.url}}" alt="{{colsLabel}}">
                {{else}}
                    {{#if cols}}<div class="matrix-multi-add-thumb-color" style="background-color: {{cols}}"></div>{{/if}}
                {{/if}}
                <span class="matrix-multi-add-cols-label">{{colsLabel}}</span>
            </td>
            {{#if rowsCollection}}
                {{#each rowsCollection}}
                    {{#if internalid}}
                        {{#if isAvailable}}
                            <td>
                                <table align="center" id="rowsAndColsTable">
                                    <tr data-colsid="{{colsID}}" class="matrix-multi-add-row" data-action="mma-show-prices">
                                        <td class="matrix-multi-add-quantity">
                                            <input data-field="input" type="number" name="{{label}}" min="0" class="multi-add-to-cart-quantity-value" data-rowid="{{internalid}}" placeholder="0" data-action="add-quantity" value="{{quantity}}">
                                        </td>
                                    </tr>
                                    <tr data-priceid="{{internalid}}" class="matrix-multi-add-pricing mma-tagaccordion-id-price matrix-multi-add-collapse">
                                        <td>
                                            {{#if priceSchedule}}
                                                <table align="center">
                                                    <tbody>
                                                        <tr>
                                                            <td class="quantity-pricing-table-header">{{translate 'Available'}}</td>
                                                            <td class="quantity-pricing-table-body">
                                                                {{qytAvailable}}
                                                            </td>
                                                        </tr>
                                                        {{#if showNotifyBtn}}
                                                            <tr data-colsid="{{../uniqueID}}">
                                                                <td class="matrix-multi-add-details" colspan="2">
                                                                    <a
                                                                        href="#" data-action="mma-backinstock"
                                                                        class="matrix-multi-add-details"
                                                                        data-toggle="show-in-modal"
                                                                        data-rowid="{{internalid}}"
                                                                    >
                                                                        {{../btnText}}
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        {{/if}}
                                                        <tr class="quantityPricingHidePriceHeader">
                                                            <td class="quantity-pricing-table-header">{{translate 'Quantity'}}</td>
                                                            <td class="quantity-pricing-table-header">{{translate 'Price'}}</td>
                                                        </tr>
                                                        {{#each priceSchedule}}
                                                            <tr class="quantityPricingHidePrice">
                                                                {{#if maximumquantity}}
                                                                    <td class="quantity-pricing-table-body">{{minimumquantity}} – {{maximumquantity}}</td>
                                                                    {{#if is_range}}
                                                                        <td class="quantity-pricing-table-body hidePrice">{{price_range.min_formatted}} - {{price_range.max_formatted}}</td>
                                                                    {{else}}
                                                                        <td class="quantity-pricing-table-body hidePrice">{{price_formatted}}</td>
                                                                    {{/if}}
                                                                {{else}}
                                                                    <td class="quantity-pricing-table-body">{{minimumquantity}} +</td>
                                                                    {{#if is_range}}
                                                                        <td class="quantity-pricing-table-body hidePrice">{{price_range.min_formatted}} - {{price_range.max_formatted}}</td>
                                                                    {{else}}
                                                                        <td class="quantity-pricing-table-body hidePrice">{{price_formatted}}</td>
                                                                    {{/if}}
                                                                {{/if}}
                                                            </tr>
                                                        {{/each}}
                                                    </tbody>
                                                </table>
                                            {{else}}
                                                {{#if originalPrice}}
                                                    <table align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td class="quantity-pricing-table-header">{{translate 'Available'}}</td>
                                                                <td class="quantity-pricing-table-body">
                                                                    {{qytAvailable}}
                                                                </td>
                                                            </tr>
                                                            {{#if showNotifyBtn}}
                                                                <tr data-colsid="{{../uniqueID}}">
                                                                    <td class="matrix-multi-add-details" colspan="2">
                                                                        <a
                                                                            href="#" data-action="mma-backinstock"
                                                                            class="matrix-multi-add-details"
                                                                            data-toggle="show-in-modal"
                                                                            data-rowid="{{internalid}}"
                                                                        >
                                                                            {{../btnText}}
                                                                        </a>
                                                                    </td>
                                                                </tr>
                                                            {{/if}}
                                                            <tr>
                                                                <td class="quantity-pricing-table-header">{{translate 'Price'}}</td>
                                                                <td class="quantity-pricing-table-body hidePrice">
                                                                    {{originalPrice}}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                {{/if}}
                                            {{/if}}
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        {{else}}
                            <td class="matrix-multi-add-not-available">{{translate 'N/A'}}</td>
                        {{/if}}
                    {{/if}}
                {{/each}}
            {{else}}
                {{#if uniqueID}}
                    {{#if colsCollection.isAvailable}}
                        <td>
                            <table align="center" id="colsOnlyTable">
                                    <tr data-colsid="{{uniqueID}}" class="matrix-multi-add-row" data-action="mma-show-prices">
                                        <td class="matrix-multi-add-quantity">
                                            <input data-field="input" data-rowid="{{internalid}}" type="number" name="{{colsCollection.label}}" min="0" class="multi-add-to-cart-quantity-value" placeholder="0" data-action="add-quantity" value="{{colsCollection.quantity}}">
                                        </td>
                                    </tr>
                                    <tr data-priceid="{{uniqueID}}" class="matrix-multi-add-pricing mma-tagaccordion-id-price matrix-multi-add-collapse">
                                        <td>
                                            {{#if colsCollection.priceSchedule}}
                                                <table align="center">
                                                    <tbody>
                                                        <tr>
                                                            <td class="quantity-pricing-table-header">{{translate 'Available'}}</td>
                                                            <td class="quantity-pricing-table-body">
                                                                {{colsCollection.qytAvailable}}
                                                            </td>
                                                        </tr>
                                                        {{#if colsCollection.showNotifyBtn}}
                                                            <tr data-colsid="{{uniqueID}}"> <!-- uniqueId is for cols only -->
                                                                <td class="matrix-multi-add-details" colspan="2">
                                                                    <a
                                                                        href="#" data-action="mma-backinstock"
                                                                        class="matrix-multi-add-details"
                                                                        data-toggle="show-in-modal"
                                                                        data-rowid="{{internalid}}"> <!-- if has cols and rows -->
                                                                        {{btnText}}
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        {{/if}}
                                                        <tr class="quantityPricingHidePriceHeader">
                                                            <td class="quantity-pricing-table-header">{{translate 'Quantity'}}</td>
                                                            <td class="quantity-pricing-table-header">{{translate 'Price'}}</td>
                                                        </tr>
                                                        {{#each colsCollection.priceSchedule}}
                                                            <tr class="quantityPricingHidePrice">
                                                                {{#if maximumquantity}}
                                                                    <td class="quantity-pricing-table-body">{{minimumquantity}} – {{maximumquantity}}</td>
                                                                    {{#if is_range}}
                                                                        <td class="quantity-pricing-table-body hidePrice">{{price_range.min_formatted}} - {{price_range.max_formatted}}</td>
                                                                    {{else}}
                                                                        <td class="quantity-pricing-table-body hidePrice">{{price_formatted}}</td>
                                                                    {{/if}}
                                                                {{else}}
                                                                    <td class="quantity-pricing-table-body ">{{minimumquantity}} +</td>
                                                                    {{#if is_range}}
                                                                        <td class="quantity-pricing-table-body hidePrice">{{price_range.min_formatted}} - {{price_range.max_formatted}}</td>
                                                                    {{else}}
                                                                        <td class="quantity-pricing-table-body hidePrice">{{price_formatted}}</td>
                                                                    {{/if}}
                                                                {{/if}}
                                                            </tr>
                                                        {{/each}}
                                                    </tbody>
                                                </table>
                                            {{else}}
                                                {{#if colsCollection.originalPrice}}
                                                    <table align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td class="quantity-pricing-table-header">{{translate 'Available'}}</td>
                                                                <td class="quantity-pricing-table-body">
                                                                    {{colsCollection.qytAvailable}}
                                                                </td>
                                                            </tr>
                                                            {{#if colsCollection.showNotifyBtn}}
                                                                <tr data-colsid="{{uniqueID}}"> <!-- uniqueId is for cols only -->
                                                                    <td class="matrix-multi-add-details" colspan="2">
                                                                        <a
                                                                            href="#" data-action="mma-backinstock"
                                                                            class="matrix-multi-add-details"
                                                                            data-toggle="show-in-modal"
                                                                            data-rowid="{{internalid}}"> <!-- if has cols and rows -->
                                                                            {{btnText}}
                                                                        </a>
                                                                    </td>
                                                                </tr>
                                                            {{/if}}
                                                            <tr>
                                                                <td class="quantity-pricing-table-header">{{translate 'Price'}}</td>
                                                                <td class="quantity-pricing-table-body hidePrice">
                                                                    {{colsCollection.originalPrice}}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                {{/if}}
                                            {{/if}}
                                        </td>
                                    </tr>
                                </table>
                            </td>

                    {{else}}
                        <td class="matrix-multi-add-not-available">{{translate 'N/A'}}</td>
                    {{/if}}
                        <td class="matrix-multi-add-spacer">&nbsp;</td>
                {{/if}}
            {{/if}}
            <td>
                <a href="#" data-action="mma-price-hide">
                    {{translate 'More Details'}}
                </a>
            </td>
        </tr>
    {{/if}}