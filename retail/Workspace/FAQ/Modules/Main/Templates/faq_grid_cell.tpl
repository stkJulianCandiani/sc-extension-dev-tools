{{!
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
}}

<div class="faq-grid">
    <h2 class="faq-section-title">{{section}}</h2>
    <div class="faq-grid-questions">
        <div class="panel-group" id="accordion{{gridIndex}}" role="tablist" aria-multiselectable="true">
            {{#each questions}}
                <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="heading{{../gridIndex}}{{@index}}">
                        <h4 class="panel-title faq-question-title">
                            <a
                                role="button"
                                data-toggle="collapse"
                                data-parent="#accordion{{../gridIndex}}"
                                href="#collapse{{../gridIndex}}{{@index}}"
                                aria-expanded="true"
                                aria-controls="collapse{{../gridIndex}}{{@index}}"
                                data-navigation="ignore-click"
                                class="collapsed">
                                <i class="gs-icon-c-down"></i>
                                <span>{{name}}</span>
                            </a>
                        </h4>
                    </div>
                    <div id="collapse{{../gridIndex}}{{@index}}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading{{../gridIndex}}{{@index}}">
                        <div class="panel-body faq-answer">
                            {{{content}}}
                        </div>
                    </div>
                </div>
            {{/each}}
        </div>
    </div>
</div>
