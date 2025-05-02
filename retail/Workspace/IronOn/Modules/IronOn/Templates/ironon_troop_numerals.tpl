{{#if showTroopNumerals}}
    <select class="product-views-option-tile-picker ironon-feature-troop-numeral " data-index="{{index}}" data-action="troop-numeral" name="troopNumeral" id='troopNumeral'>
        <option value=""> - </option>
        {{#each troopNumerals}}
            <option value="{{internalid}}" data-item="{{itemId}}" data-label="{{label}}" {{#if isSelected}} selected {{/if}}>{{label}}</option>
        {{/each}}
    </select>
{{/if}}
