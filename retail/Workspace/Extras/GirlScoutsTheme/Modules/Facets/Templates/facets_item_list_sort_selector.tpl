<span class="label">
    {{translate 'Sort By:'}}
</span>

<div class="facets-item-list-sort-selector">
    <div class="selected-sort" data-toggle="dropdown" aria-expanded="true">
        <span>{{selectedLabel}}</span>
        <i class="gs-icon-arrow-up-down"></i>
    </div>
    <ul class="">
    {{#each options}}
        <li data-action="select-sort" data-value="{{configOptionUrl}}" class="{{className}}" {{#if isSelected}} data-selected {{/if}}>
            <span>
                {{translate name}}
                {{#if isSelected}}
                    <i class="gs-icon-check"></i>
                {{/if}}
            </span>
        </li>
    {{/each}}
    </ul>
</div>
