<tr class="matrix-multi-add-table-cols-title">
    <th class="matrix-multi-add-table-title">{{translate 'Order Sheet'}}</th>
    {{#each model.values}}
        {{#if internalid}}
            <th class="matrix-multi-add-table-column-heading">{{label}}</th>
        {{/if}}
    {{/each}}
    <th class="matrix-multi-add-table-title"></th>
</tr>