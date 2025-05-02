<section class="footer-cms-section" data-cms-area="footer_top" data-cms-area-filters="global"></section>
<section class="footer-cms-section" data-cms-area="footer_medium" data-cms-area-filters="global"></section>
<nav class="footer-d-navigation footer-d-main-navigation">
    {{#each navigationItems}}
        <div class="footer-d-col">
            <h4 href="#footer-collapse-{{className}}" class="footer-d-main-navigation-head">
                <span>{{title}}</span>
            </h4>
            <ul class="footer-d-main-navigation-list">
                {{#each collection}}
                    <li class="footer-d-main-navigation-item">
                        <a class="footer-d-main-navigation-link" href="{{href}}" data-touchpoint="{{touchpoint}}" data-hashtag="#{{href}}" target="{{target}}">{{text}}</a>
                    </li>
                {{/each}}
            </ul>
        </div>
    {{/each}}
    <section class="footer-cms-section" data-cms-area="footer_bottom" data-cms-area-filters="global"></section>
</nav>
