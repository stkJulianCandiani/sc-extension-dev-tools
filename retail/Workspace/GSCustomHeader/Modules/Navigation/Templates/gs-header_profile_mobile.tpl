{{!
	© 2016 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
}}

<div class="header-profile-mobile">
    <div class="green-sub-menu green-sub-menu-large">
        <div class="green-sub-menu-item icon-right">
            <a data-touchpoint="home" data-hashtag="#cart" href="#">
                <span>{{translate 'Shopping Cart'}}</span>
                <i class="gs-icon-cart"></i>
            </a>
        </div>

        <div class="green-sub-menu-item icon-right">
            <a data-touchpoint="storelocator" data-hashtag="#stores" href="#">
                <span>{{translate 'Store Locator'}}</span>
                <i class="gs-icon-location"></i>
            </a>
        </div>

        {{#if showLogin}}
            {{#if showLoginMenu}}
                <div class="green-sub-menu-item icon-right">
                    <a data-touchpoint="register" data-hashtag="login-register" href="#">
                        <span>{{translate 'Sign Up'}}</span>
                        <i class="gs-icon-note"></i>
                    </a>
                </div>
            {{/if}}
        {{/if}}

        {{#if showLogin}}
            {{#if showLoginMenu}}
                <div class="green-sub-menu-item multi-link">
                    <a data-touchpoint="customercenter" data-hashtag="#overview" name="accountoverview" href="#">{{translate 'My Account'}}</a>
                    <a data-touchpoint="login" data-hashtag="login-register" href="#">{{translate 'Login'}}</a>
                </div>
            {{/if}}
        {{/if}}
    </div>
</div>
