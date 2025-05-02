<section class="footer-cms-section" data-cms-area="footer_top" data-cms-area-filters="global"></section>
<nav class="footer-m-navigation footer-m-parent-navigation">
    <ul>
        {{#each menuItems}}
            <li>
                <a href="{{href}}" class="footer-m-navigation-link footer-m-navigation-link-{{@index}} {{#if color}}category-color{{color}}{{/if}}" data-hastag="{{data.hashtag}}" data-touchpoint="{{data.touchpoint}}">
                    {{text}}
                </a>
            </li>
        {{/each}}
    </ul>
</nav>
<nav data-view="FooterSocialIcons" class="footer-m-navigation footer-m-social-icons"></nav>
<section class="footer-cms-section" data-cms-area="footer_medium" data-cms-area-filters="global"></section>
<nav class="footer-m-navigation footer-m-main-navigation">
    <div class="footer-m-main-navigation-dropdown-link">
        <a class="footer-link" data-touchpoint="customercenter" data-hashtag="#overview" name="accountoverview" href="#">{{translate 'My Account'}}</a>
        <a class="footer-link" data-touchpoint="login" data-hashtag="login-register" href="#">{{translate 'Login'}}</a>
    </div>
    <a class="footer-m-main-navigation-dropdown-link footer-link" data-touchpoint="{{cartTouchPoint}}" data-hashtag="#cart" href="#">
        <span>{{translate 'Shopping Cart'}}</span>
        <i class="gs-icon-cart footer-m-main-navigation-dropdown-icon"></i>
    </a>

    {{#each navigationItems}}
        <div class="footer-m-main-navigation-title">
            <a href="#footer-collapse-{{className}}" class="footer-m-main-navigation-dropdown-link collapsed" data-navigation="ignore-click" role="button" data-toggle="collapse" aria-expanded="false" aria-controls="footer-collapse-{{className}}">
                <span>{{title}}</span>
                <i class="icon-plus footer-m-main-navigation-dropdown-icon"></i>
            </a>
        </div>
        <div class="{{className}} collapse" id="footer-collapse-{{className}}" aria-expanded="false" style="height: 0px;">
            <ul class="footer-m-main-navigation-list">
                {{#each collection}}
                    <li class="footer-m-main-navigation-item">
                        <a class="footer-m-main-navigation-link" href="{{href}}" data-touchpoint="{{touchpoint}}" data-hashtag="#{{href}}" target="{{target}}">{{text}}</a>
                    </li>
                {{/each}}
            </ul>
        </div>
    {{/each}}
    <section class="footer-cms-section" data-cms-area="footer_bottom" data-cms-area-filters="global"></section>
</nav>
