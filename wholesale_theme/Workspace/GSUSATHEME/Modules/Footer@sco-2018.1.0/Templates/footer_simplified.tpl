{{! Edited for Summit Theme}}

<div data-view="Global.BackToTop"></div>
<div class="footer-content footer-simplified">
    <div class="footer-banner">
        <div id="banner-footer" class="content-banner banner-footer" data-cms-area="global_banner_footer" data-cms-area-filters="global"></div>
    </div>
    <div class="footer-content-nav-copyright">
        <div class="footer-content-nav"></div>
        <div class="footer-content-copyright">
            {{#with extraFooterSimplified.copyright}}
                {{#unless hide}}
                    {{#if showRange}}
                        {{translate '&copy; $(0) &#8211; $(1) $(2)' initialYear currentYear companyName}}
                        <!-- an en dash &#8211; is used to indicate a range of values -->
                    {{else}}
                        {{translate '&copy; $(0) $(1)' currentYear companyName}}
                    {{/if}}
                {{/unless}}
				{{else}}
				{{translate '&copy; 2008-2017 Company Name'}}
            {{/with}}
        </div>
    </div>
</div>

{{!----
The context variables for this template are not currently documented. Use the {{log this}} helper to view the context variables in the Console of your browser's developer tools.
----}}
