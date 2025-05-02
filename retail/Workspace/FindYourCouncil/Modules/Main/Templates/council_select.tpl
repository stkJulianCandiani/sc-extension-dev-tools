<div class="categories-council-select-container">
    <h3>{{translate 'Select Your Council:'}}</h3>
    <form action="#">
        <div class="categories-council-select-dropdown">
            <div class="selected-sort" data-toggle="dropdown" aria-expanded="true">
                <span>{{selected.name}}</span>
                <i class="gs-icon-arrow-up-down"></i>
            </div>
            <ul class="">
                {{#each options}}
                    <li data-navigation-selectors data-value="{{value}}" {{#if isSelected}} data-selected {{/if}}>
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
        <br />
        <div data-type="alert-placeholder"></div>
        <button class="categories-council-large-button" id="search" data-submit>{{translate 'Submit'}}</button>
    </form>
</div>
