{{#if outOfStockData.showOutOfStock}}
<i class="out-of-stock-notification-icon" id="minicart-tooltip-{{device}}" data-toggle="tooltip" data-placement="auto" {{#if container}}data-container="{{container}}"{{/if}}  title="{{outOfStockData.outOfStockMessage}}"></i>
{{/if}}
