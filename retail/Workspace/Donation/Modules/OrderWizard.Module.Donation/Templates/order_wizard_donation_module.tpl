{{!
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
}}


<div class="order-wizard-shipmethod-module">
    
    {{#if showTitle}}
        <h3 class="order-wizard-shipmethod-module-title donation-title">
            {{title}}
        </h3>
        <p>{{translate 'Make a donation to help girls prepare for a lifetime of leadership, adventure and success.'}}</p>
    {{/if}}
    {{#if showDonation}}
    <div class="order-wizard-paymentmethod-selector-module roundup-box">
        <div class='row'>

            <div class='donation-container col-md-6 col-sm-12'>
                {{#each donationOptions}}
                    <button class="roundup-btn {{class}}" data-action="roundup" data-value='{{value}}'> ${{value}} </button>
                {{/each}}
            </div>
            <div class="col-md-6 col-sm-12">
                <span class="roundup-btn custom-roundup  {{#unless selectedOption}} {{#if hasDonation}}roundup-btn-active {{/if}}{{/unless}}">{{translate 'Custom'}}</span>
                <input type="currency" class="roundup-btn" data-action="roundup-input" placeholder="Amount" data-value='' {{#unless selectedOption}}value="{{donationamount}}" {{/unless}} />
            </div>
            <div class='roundup-remove-donation'>
                <p>{{#if hasRoundup}}<a href='#' data-action='removeDonation'>{{ translate 'Remove round up donation' }}</a>{{/if}}</p>
            </div>
        </div>
    </div>
    {{/if}}
    {{#if showRoundUp}}
    {{#unless hideRoundup}}
        <div class="order-wizard-shipmethod-module-message roundup-container">
            <label class="roundup-label">
                <input type="checkbox" data-value="T" name="donation" {{#if allowDonation}} checked {{/if}}></input>
                {{#if allowDonation}}
                    <p class="rounduptext">{{ translate 'You’ve rounded up and donated your change to Girl Scouts of the USA.'}}</p>
                {{/if}}
                {{#unless allowDonation}}
                    <p class="rounduptext">{{ translate 'Round up to the next dollar and donate $(0). By clicking this box you agree to donate your change.' roundedValue}}
                {{/unless}}
                </p>
            </label>
        </div>
    {{/unless}}
    {{/if}}
</div>

