<div class="newsletter-lightbox-container">
    <div class="newsletter-lightbox-image">
        <img src="{{image}}" alt=""/>
    </div>
    <div class="newsletter-lightbox-content">
        <div class="newsletter-lightbox-icon">
            <i class="gs-icon-mail"></i>
        </div>
        {{#if title}}
        <h4 class="newsletter-lightbox-title">{{translate title}}</h4>
        {{/if}}
        {{#if description}}
        <p class="newsletter-lightbox-description">{{translate description}}</p>
        {{/if}}
        <form class="newsletter-lightbox-suscription-form" data-action="newsletter-subscribe" novalidate>

            <div>
                <div data-validation="control-group">
                    <div class="newsletter-lightbox-subscription-form-container {{#if showErrorMessage}}error{{/if}}" data-validation="control">
                        <input
                                name="email"
                                id="email"
                                type="email"
                                class="newsletter-lightbox-suscription-form-input"
                                placeholder="{{translate 'Enter Email'}}"
                                >
                        <button type="submit" class="newsletter-lightbox-suscription-form-mobile-submit">
                            {{translate 'Go >'}}
                        </button>
                    </div>
                </div>
                <div data-validation="control-group">
                    <div class="newsletter-lightbox-suscription-form-checkbox" data-validation="control">
                        <div class="newsletter-lightbox-input-checkbox">
                            <label>
                                <input
                                        type="checkbox"
                                        name="age"
                                        id="age"
                                        value="T"
                                        data-unchecked-value="F">
                                <em></em>
                            <span class="newsletter-lightbox-subscription-label-text">
                                {{translate 'I am 13 years of age or older'}}
                            </span>
                                {{#if disclaimer}}
                                    <i class="icon-question-circle" data-toggle="tooltip" data-placement="bottom" data-template='<div class="tooltip newsletter-lightbox-tooltip" role="tooltip"><div class="tooltip-inner"></div></div>'  class="newsletter-lightbox-subscription-expander-tooltip" title="" data-original-title="{{translate disclaimer}}"></i>
                                {{/if}}
                            </label>
                        </div>
                    </div>
                </div>
                <div class="newsletter-alert-placeholder" data-type="alert-placeholder">
                    {{#if isFeedback}}
                        <div data-view="GlobalMessageFeedback"></div>
                    {{/if}}
                </div>
            </div>

            <button type="submit" class="newsletter-lightbox-subscription-form-button-subscribe-gs">
                {{translate 'Subscribe'}}
            </button>

            {{#if disclaimer}}
            <p class="newsletter-lightbox-subscription-mobile-disclaimer">
                {{translate disclaimer}}
            </p>
            {{/if}}

        </form>
    </div>
</div>