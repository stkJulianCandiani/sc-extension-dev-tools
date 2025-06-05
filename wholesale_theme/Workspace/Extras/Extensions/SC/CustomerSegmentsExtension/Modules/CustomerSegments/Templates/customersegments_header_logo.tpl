<div id="site-logo" class="content-banner"></div>

<a class="header-logo" href="{{headerLinkHref}}" data-touchpoint="{{headerLinkTouchPoint}}" data-hashtag="{{headerLinkHashtag}}" title="{{headerLinkTitle}}">
    {{#if logoUrl}}
        {{#if isReady}}
            {{#if isAbsoluteURL}}
                <img class="header-logo-image" src="{{logoUrl}}" alt="{{siteName}}">
            {{else}}
                <img class="header-logo-image" src="{{getThemeAssetsPathWithDefault logoUrl 'img/SCA_Logo.png'}}" alt="{{siteName}}">
            {{/if}}
        {{/if}}
    {{else}}
        <span class="header-logo-sitename">
            {{siteName}}
        </span>
    {{/if}}
</a>