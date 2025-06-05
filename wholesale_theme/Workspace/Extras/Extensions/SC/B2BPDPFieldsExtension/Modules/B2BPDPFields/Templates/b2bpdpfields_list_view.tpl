{{#if showField}}
    {{#if fieldValue}}
        <span class="b2b-extension-sku-label">{{fieldLabel}}</span>
        <span class="b2b-extension-sku-value" itemprop="{{fieldId}}">{{{fieldValue}}}</span>
            {{#if showUnit}}
            <span class="b2b-extension-sku-value">{{fieldUnit}}</span>
            {{/if}}
    {{/if}}
{{/if}}