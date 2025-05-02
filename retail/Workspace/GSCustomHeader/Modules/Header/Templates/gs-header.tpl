<div class="header-message" data-view="Message.Placeholder"></div>
<div class="banner-green banner-green-mobile">
	<div id="header-global-banner-mobile" data-cms-area="header_gloabl_banner_mobile" data-cms-area-filters="global"></div>
</div>
<section class="gs-header-main-wrapper">
	<div class="gs-header-logo-wrapper">
		<div data-view="Header.Logo"></div>
	</div>
	<div class="gs-header-menu">
		<div class="header-submenu">
			<nav class="header-submenu-navigation">
				{{#each sumbenuLinks}}
					<div class="header-submenu-link">
						<a href="/{{link}}" data-hashtag="#{{link}}" data-touchpoint="home">{{text}}</a>
					</div>
					<span class="header-submenu-separator">|</span>
				{{/each}}

				{{#if showStoreLocator}}
					<div class="header-submenu-link" data-view="StoreLocatorHeaderLink"></div>
					<span class="header-submenu-separator">|</span>
				{{/if}}
				{{#if showQuickOrder}}
					<div class="header-submenu-link" data-view="QuickOrderHeaderLink"></div>
					<span class="header-submenu-separator">|</span>
				{{/if}}
				<div class="header-menu-profile" data-view="Header.Profile"></div>
			</nav>
		</div>

		<section class="gs-header-secondary-wrapper">
			<div class="gs-header-menu-wrapper" data-view="Header.Menu" data-phone-template="gs-header_sidebar" data-tablet-template="gs-header_sidebar"></div>
			<div class="gs-header-menu-cart">
				<div class="header-menu-cart-dropdown">
					<div data-view="Header.MiniCart"></div>
				</div>
			</div>
		</section>
	</div>

	{{#unless isStandalone}}
		<section class="gs-header-bottom">
			<div class="gs-header-bottom-col-left">
				<div class="gs-banner-bottom">
					<div class="gs-header-message-cms" id="header-gloabl-banner" data-cms-area="header-global-banner" data-cms-area-filters="global">

					</div>
				</div>
			</div>
			<section class="gs-header-mobile">
				<div class="gs-mobile-user-buttons gs-header-mobile-item icon-green">
					<a data-touchpoint="customercenter" href="#"><i class="gs-icon-girl"></i></a>
				</div>

				<div class="gs-mobile-user-buttons gs-header-mobile-item icon-purple">
					<a data-touchpoint="storelocator" data-hashtag="#stores" href="#"><i class="gs-icon-compass"></i></a>
				</div>

				<div class="gs-mobile-user-buttons gs-header-mobile-item icon-pink">
					<a href="#" data-action="showNewsletterModal" data-navigation="ignore-click"><i class="gs-icon-mail"></i></a>
				</div>

				<div class="header-menu-cart gs-header-mobile-item gscouts-cart">
					<div class="header-menu-cart-dropdown">
						<div data-view="Header.MiniCart"></div>
					</div>
				</div>

				<div class="header-sidebar-toggle-wrapper gs-header-mobile-item">
					<button class="header-sidebar-toggle" data-action="header-sidebar-show">
						<i class="gs-icon-hamburguer"></i>
					</button>
				</div>
			</section>

			<section class="gs-header-tablet">
				<div class="gs-header-logo-wrapper gs-header-tablet-item">
					<div data-view="Header.Logo"></div>
				</div>
				<div class="tablet-user-links">
					<div class="gs-header-tablet-item">
						<a data-touchpoint="storelocator" data-hashtag="#stores" href="#"><i class="gs-icon-location"></i>{{{translate 'Store Locator'}}} </a>
					</div>

					<div class="gs-header-tablet-item">
						<a data-touchpoint="login" data-hashtag="login-register" href="#">
							<i class="gs-icon-girl"></i>
							{{translate 'Login'}}
						</a>
					</div>

					<div class="gs-header-tablet-item">
						<a data-touchpoint="login" data-hashtag="login-register" href="#">
							<i class="gs-icon-note"></i>
							{{translate 'Sign Up'}}
						</a>
					</div>

					<div class="header-menu-cart gscouts-cart">
						<div class="header-menu-cart-dropdown">
							<div data-view="Header.MiniCart"></div>
						</div>
					</div>

					<div class="header-sidebar-toggle-wrapper">
						<button class="header-sidebar-toggle" data-action="header-sidebar-show">
							<i class="gs-icon-hamburguer"></i>
						</button>
					</div>
				</div>

			</section>

			<div class="gs-header-bottom-col-right">
				<div class="gs-site-search" data-view="SiteSearch"></div>
			</div>
		</section>
	{{/unless}}
</section>

<div class="header-sidebar-overlay" data-action="header-sidebar-hide"></div>

{{!--
<div class="header-main-wrapper {{#if isStandalone}}header-main-wrapper-standalone{{/if}}">
	<div class="header-logo-wrapper">
		<div data-view="Header.Logo"></div>
	</div>
    {{#unless isStandalone}}
	<div class="header-subheader">
        <div class="header-subheader-container">
            <div class="header-sidebar-toggle-wrapper">
                <button class="header-sidebar-toggle" data-action="header-sidebar-show">
                    <i class="header-sidebar-toggle-icon"></i>
                </button>
            </div>
			<ul class="header-subheader-options">
				{{#if showLanguagesOrCurrencies}}
					<li class="header-subheader-settings">
						<a href="#" class="header-subheader-settings-link" data-toggle="dropdown" title="{{translate 'Settings'}}">
							<i class="header-menu-settings-icon"></i>
							<i class="header-menu-settings-carret"></i>
						</a>
						<div class="header-menu-settings-dropdown">
							<h5 class="header-menu-settings-dropdown-title">{{translate 'Site Settings'}}</h5>
							{{#if showLanguages}}
								<div data-view="Global.HostSelector"></div>
							{{/if}}
							{{#if showCurrencies}}
								<div data-view="Global.CurrencySelector"></div>
							{{/if}}
						</div>
					</li>
				{{/if}}
			</ul>
            <div data-view="Header.Submenu" class="header-submenu"></div>

		</div>
	</div>
    {{/unless}}

	<nav class="header-main-nav">
		<div id="banner-header-top" class="content-banner banner-header-top" data-cms-area="header_banner_top" data-cms-area-filters="global"></div>
		<div class="header-sidebar-toggle-wrapper">
			<button class="header-sidebar-toggle" data-action="header-sidebar-show">
				<i class="header-sidebar-toggle-icon"></i>
			</button>
		</div>
		<div class="header-content">
			<div class="header-right-menu">
				<div class="header-menu-profile" data-view="Header.Profile"></div>
				{{#unless isStandalone}}
				{{#if showStoreLocator}}
					<div class="header-menu-locator-mobile" data-view="StoreLocatorHeaderLink"></div>
				{{/if}}
				<div class="header-menu-searchmobile" data-view="SiteSearch.Button"></div>
				<div class="header-menu-cart">
					<div class="header-menu-cart-dropdown" >
						<div data-view="Header.MiniCart"></div>
					</div>
				</div>
				{{/unless}}
			</div>
		</div>
		<div id="banner-header-bottom" class="content-banner banner-header-bottom" data-cms-area="header_banner_bottom" data-cms-area-filters="global"></div>
	</nav>

</div>

<div class="header-sidebar-overlay" data-action="header-sidebar-hide"></div>
<div class="header-secondary-wrapper{{#if isStandalone}} header-secondary-wrapper-standalone{{/if}}" data-view="Header.Menu" data-phone-template="header_sidebar" data-tablet-template="header_sidebar"></div>

--}}
{{!----
Use the following context variables when customizing this template:

	profileModel (Object)
	profileModel.addresses (Array)
	profileModel.addresses.0 (Array)
	profileModel.creditcards (Array)
	profileModel.firstname (String)
	profileModel.paymentterms (undefined)
	profileModel.phoneinfo (undefined)
	profileModel.middlename (String)
	profileModel.vatregistration (undefined)
	profileModel.creditholdoverride (undefined)
	profileModel.lastname (String)
	profileModel.internalid (String)
	profileModel.addressbook (undefined)
	profileModel.campaignsubscriptions (Array)
	profileModel.isperson (undefined)
	profileModel.balance (undefined)
	profileModel.companyname (undefined)
	profileModel.name (undefined)
	profileModel.emailsubscribe (String)
	profileModel.creditlimit (undefined)
	profileModel.email (String)
	profileModel.isLoggedIn (String)
	profileModel.isRecognized (String)
	profileModel.isGuest (String)
	profileModel.priceLevel (String)
	profileModel.subsidiary (String)
	profileModel.language (String)
	profileModel.currency (Object)
	profileModel.currency.internalid (String)
	profileModel.currency.symbol (String)
	profileModel.currency.currencyname (String)
	profileModel.currency.code (String)
	profileModel.currency.precision (Number)
	showLanguages (Boolean)
	showCurrencies (Boolean)
	showLanguagesOrCurrencies (Boolean)
	showLanguagesAndCurrencies (Boolean)
	isHomeTouchpoint (Boolean)
	cartTouchPoint (String)

----}}
