<div class="newslleter-page-email-profile-container">

    <div class="newslleter-page-email-profile-header">
        <div class="newslleter-page-email-profile-header-icon">
            <i class="gs-icon-mail"></i>
        </div>
        <h2 class="newslleter-page-email-profile-title">{{translate 'Personalize Your Email Profile'}}</h2>
    </div>
    <div class="newslleter-page-email-profile-form-container">
        <p class="newslleter-page-email-profile-form-description">{{translate 'We’d love to know more about you!'}}</p>
        <form class="newslleter-page-email-profile-form" data-action="newsletter-subscribe" novalidate>
            <div data-validation="control-group">
                <div class="newslleter-page-email-profile-control {{#if showErrorMessage}}error{{/if}}" data-validation="control">
                    <label class="newslleter-page-email-profile-label" for="firstname">{{translate 'First Name'}} <small>({{translate 'Required'}})</small></label>
                    <input
                            name="firstname"
                            id="firstname"
                            type="text"
                            class="newslleter-page-email-profile-firstname">
                </div>
            </div>
            <div data-validation="control-group">
                <div class="newslleter-page-email-profile-control {{#if showErrorMessage}}error{{/if}}" data-validation="control">
                    <label class="newslleter-page-email-profile-label" for="lastname">{{translate 'Last Name'}} <small>({{translate 'Required'}})</small></label>
                    <input
                            name="lastname"
                            id="lastname"
                            type="text"
                            class="newslleter-page-email-profile-lastname">
                </div>
            </div>
            <div data-validation="control-group">
                <div class="newslleter-page-email-profile-control {{#if showErrorMessage}}error{{/if}}" data-validation="control">
                    <label class="newslleter-page-email-profile-label" for="email">{{translate 'Email'}} <small>({{translate 'Required'}})</small></label>
                    <input
                        name="email"
                        id="email"
                        type="email"
                        class="newslleter-page-email-profile-email"
                        placeholder="{{translate 'Enter Email'}}">
                </div>
            </div>
            
            <div data-validation="control-group">
                <div class="newslleter-page-email-profile-control {{#if showErrorMessage}}error{{/if}}" data-validation="control">
                    <label class="newslleter-page-email-profile-label" for="lastname">{{translate 'Zip Code'}}</label>
                    <input
                            name="zipcode"
                            id="zipcode"
                            type="text"
                            class="newslleter-page-email-profile-zipcode">
                </div>
            </div>
            <div data-validation="control-group">
                <div class="newslleter-page-email-profile-control {{#if showErrorMessage}}error{{/if}}" data-validation="control">
                    <label class="newslleter-page-email-profile-label" for="lastname">{{translate 'Date of Birth'}} <small>({{translate 'Required'}})</small></label>
                    <input
                            name="birth"
                            id="birth"
                            type="text"
                            class="newslleter-page-email-profile-birth"
                            placeholder="MM/DD/YYYY">
                </div>
            </div>
            {{#if terms}}
                <div class="newslleter-page-email-profile-terms">
                    <p>{{{terms}}}</p>
                </div>
            {{/if}}
            <div class="newslleter-page-email-profile-recaptcha"></div>
            
            <div class="newsletter-alert-placeholder" data-type="alert-placeholder" >
                {{#if isFeedback}}
                    <div data-view="GlobalMessageFeedback"></div>
                {{/if}}
            </div>

            <button type="submit" class="newslleter-page-email-profile-button">
                {{translate 'Subscribe'}}
            </button>

            {{#if disclaimer}}
            <p class="newslleter-page-email-profile-disclaimer">
                {{translate disclaimer}}
            </p>
            {{/if}}
        </form>
    </div>
</div>
