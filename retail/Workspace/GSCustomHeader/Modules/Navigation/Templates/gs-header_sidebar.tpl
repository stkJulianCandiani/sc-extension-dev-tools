{{!
	© 2016 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
}}

<!--<div class="close-sidebar-menu" data-action="header-sidebar-hide">-->
    <!--<i class="gs-icon-back"></i>-->
<!--</div>-->

<div class="header-sidebar-wrapper">

	<div class="header-sidebar-menu-wrapper" data-type="header-sidebar-menu">

		<ul class="header-sidebar-menu">

            <li>
                <a class="header-sidebar-home" href="/" data-hashtag="#" data-touchpoint="home" name="{{translate 'Home'}}">
                    {{translate 'Home'}}
                </a>
            </li>

			{{#each categories}}
				{{#if text}}
					<li class="header-sidebar-menu-index-{{@index}} {{#if color}}category-color{{color}}{{/if}}{{#if @last}} header-sidebar-menu-lastoption{{/if}}">
						<a {{objectToAtrributes this}} {{#if categories}}data-action="push-menu"{{/if}} name="{{text}}">
							{{text}}
						</a>
                        {{#if categories}}
                            <ul data-color="{{#if color}}sub-category-color{{color}}{{/if}}">

                                <li>
                                    <a href="#" class="header-sidebar-menu-back" data-action="pop-menu" name="back-sidebar">
                                        <i class="gs-icon-back"></i>
                                    </a>
                                </li>

                                <li>
                                    <a class="header-sub-menu-title" {{objectToAtrributes ../this}}>
                                        {{text}}
                                    </a>
                                </li>

                                {{#each categories}}
                                    <li>
                                        <a {{objectToAtrributes this}} {{#if categories}}data-action="open-menu"{{/if}}>
                                            {{text}}
                                            {{#if categories}}<i class="header-sidebar-menu-push-icon"></i>{{/if}}
                                        </a>

                                        {{#if categories}}
                                            <ul class="header-sidebar-menu-dropdown">
                                                <!--<li>-->
                                                    <!--<a href="#" class="header-sidebar-menu-back" data-action="pop-menu">-->
                                                        <!--<i class="header-sidebar-menu-pop-icon"></i>-->
                                                        <!--{{translate 'Back'}}-->
                                                    <!--</a>-->
                                                <!--</li>-->

                                                <!--<li>-->
                                                    <!--<a {{objectToAtrributes ../this}}>-->
                                                        <!--{{translate 'Browse $(0)' ../text}}-->
                                                    <!--</a>-->
                                                <!--</li>-->

                                                {{#each categories}}
                                                    <li>
                                                        <a {{objectToAtrributes this}} name="{{text}}">{{text}}</a>
                                                    </li>
                                                {{/each}}
                                            </ul>
                                        {{/if}}
                                    </li>
                                {{/each}}
                            </ul>
                        {{/if}}
					</li>
				{{/if}}
			{{/each}}

			<!-- li class="header-sidebar-menu-separator"></li -->
			{{#if showExtendedMenu}}
			<li class="header-sidebar-menu-myaccount" data-view="Header.Menu.MyAccount"></li>
			{{/if}}
			<!-- li data-view="RequestQuoteWizardHeaderLink">
			</li -->

		</ul>

	</div>

    <div data-view="Header.Profile" data-template="gs-header_profile_mobile"></div>

	{{#if showLanguages}}
	<div data-view="Global.HostSelector"></div>
	{{/if}}
	{{#if showCurrencies}}
	<div data-view="Global.CurrencySelector"></div>
	{{/if}}

    {{#if showExtendedMenu}}
        <div class="green-sub-menu green-sub-menu-large">
            <div class="green-sub-menu-item icon-right">
                <a href="#" data-touchpoint="logout" name="logout">
                    <span>{{translate 'Sign Out'}}</span>
                    <i class="header-sidebar-user-logout-icon"></i>
                </a>
            </div>
        </div>
    {{/if}}

</div>
