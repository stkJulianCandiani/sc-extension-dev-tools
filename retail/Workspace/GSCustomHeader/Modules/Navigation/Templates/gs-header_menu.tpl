{{!
	© 2016 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
}}

<nav class="header-menu-secondary-nav">

	<ul class="header-menu-level1">

		{{#each categories}}
			{{#if text}}
				<li {{#if categories}}data-toggle="categories-menu"{{/if}} {{#if color}} class="category-color{{color}}"{{/if}}>
					<a class="{{class}}" {{objectToAtrributes this}}>
						<span class="header-menu-link-text">{{translate text}}</span>
					</a>
					{{#if categories}}
					<ul class="header-menu-level-container">
						<li>
                            {{#if thumbnailurl}}
                                <div class="header-menu-level2-banner mega-menu-banner banner-{{@index}}">
                                    <div class="header-menu-level2-banner-image">
                                        <a {{objectToAtrributes this}}>
                                            <img src="{{thumbnailurl}}" alt="{{translate text}}">
                                        </a>
                                    </div>
                                    <div class="header-menu-level2-banner-info">
                                        {{#if description}}
                                            <div class="header-menu-level2-banner-desc"><a {{objectToAtrributes this}}>{{translate description}}</a></div>
                                        {{/if}}
                                        <div class="header-menu-level2-banner-link">

                                        </div>
                                    </div>
                                </div>
                            {{/if}}
                            <div class="header-menu-level2-wrap {{#unless thumbnailurl}} no-header-menu-banner{{/unless}}">
                                <ul class="header-menu-level2">
                                    {{#each categories}}
                                        <li>
                                            <a class="{{class}}" {{objectToAtrributes this}}>{{translate text}}</a>

                                            {{#if categories}}
                                                <ul class="header-menu-level3">
                                                    {{#each categories}}
                                                        <li>
                                                            <a class="{{class}}" {{objectToAtrributes this}}>{{translate text}}</a>
                                                        </li>
                                                    {{/each}}
                                                </ul>
                                            {{/if}}
                                        </li>
                                    {{/each}}
                                </ul>
                                <div class="dropdown-menu-sep"></div>
                                <div class="dropdown-menu-sep"></div>
                                <div class="dropdown-menu-sep"></div>
                            </div>
						</li>
					</ul>
					{{/if}}
				</li>
			{{/if}}
		{{/each}}
	</ul>
</nav>
