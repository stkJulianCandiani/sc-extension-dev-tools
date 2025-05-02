{{!
	© 2016 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
}}
<div class="newsletter-sidebar">
    <form class="newsletter-suscription-form" data-action="newsletter-subscribe" novalidate>

        <div data-validation="control-group">

            <i class="gs-icon-mail"></i>
            <h5 class="newsletter-subscription-form-label" for="login-email">{{translate 'Join Our <br>Email List!'}}</h5>

            <div class="newsletter-subscription-form-container {{#if showErrorMessage}}error{{/if}}" data-validation="control">
                <input
                        name="email"
                        id="email"
                        type="email"
                        class="newsletter-suscription-form-input"
                        placeholder="{{translate 'Enter Email'}}"
                        >

                <button type="submit" class="newsletter-subscription-form-button-subscribe-gs">
                    <span>{{translate 'Sign Up'}}</span>
                </button>


            </div>

            <div class="newsletter-alert-placeholder" data-type="alert-placeholder" >
                {{#if isFeedback}}
                    <div data-view="GlobalMessageFeedback"></div>
                {{/if}}
            </div>
        </div>
    </form>
</div>