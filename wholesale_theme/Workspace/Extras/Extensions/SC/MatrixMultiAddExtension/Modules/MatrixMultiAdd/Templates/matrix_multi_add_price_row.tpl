<tr data-priceid="{{uniqueID}}" class="matrix-multi-add-pricing">
        {{#if isRows}}
            <!-- Alignemnt Fix if it has columns only -->
            <td></td>
        {{/if}}
        {{#each priceCollection}}
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
                            <tr>
                                <td class="quantity-pricing-table-header">{{translate 'Quantity'}}</td>
                                <td class="quantity-pricing-table-header">{{translate 'Price'}}</td>
                            </tr>
                            {{#each priceSchedule}}
                                <tr>
                                    {{#if maximumquantity}}
                                        <td class="quantity-pricing-table-body">{{minimumquantity}} – {{maximumquantity}}</td>
                                        {{#if is_range}}
                                            <td class="quantity-pricing-table-body">{{price_range.min_formatted}} - {{price_range.max_formatted}}</td>
                                        {{else}}
                                            <td class="quantity-pricing-table-body">{{price_formatted}}</td>
                                        {{/if}}
                                    {{else}}
                                        <td class="quantity-pricing-table-body">{{minimumquantity}} +</td>
                                        {{#if is_range}}
                                            <td class="quantity-pricing-table-body">{{price_range.min_formatted}} - {{price_range.max_formatted}}</td>
                                        {{else}}
                                            <td class="quantity-pricing-table-body">{{price_formatted}}</td>
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
                                <tr>
                                    <td class="quantity-pricing-table-header">{{translate 'Price'}}</td>
                                    <td class="quantity-pricing-table-body">
                                        {{originalPrice}}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    {{/if}}
                {{/if}}
            </td>
        {{/each}}
    </tr>