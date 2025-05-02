<article class="gs-sidebar-left container">
    <div class="row">
        <section class="col-xs-12 col-sm-3 cms-landing-page-sidebar cms-sidebar-navigation-items">
            {{#if navItems}}
                <h3>{{navTitle}}</h3>
                <nav class="gs-sidebar-left-nav">
                    <ul>
                        {{#each navItems}}
                            <li class="cms-sidebar-navigation-item">
                                <a href="" data-touchpoint="home" data-hashtag="#/{{link}}">
                                    {{{title}}}
                                </a>
                            </li>
                        {{/each}}
                    </ul>
                </nav>
            {{/if}}
        </section>
        <section class="col-xs-12 col-sm-9 cms-landing-page-content">
            <div data-view="sidebar-{{pageInfo.link}}"></div>
            <div data-cms-area="sidebar_left_content" data-cms-area-filters="path"></div>
        </section>
    </div>
</article>
