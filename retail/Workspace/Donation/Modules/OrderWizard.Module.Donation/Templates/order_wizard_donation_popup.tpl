{{!
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
}}

<div class="">
    <div class="order-wizard-shipmethod-module-message roundup-container">
        <label class="roundup-label">
            {{#if allowDonation}}
                <p>{{ translate 'Your change will make change! Round up your order to the nearest dollar and donate the difference to Girl Scouts of the USA to help girls prepare for a lifetime of leadership, adventure, and success.'}}</p>
                <p class="pop-up-roundup-p">{{ translate 'You can choose to not donate your change by clicking the button below.' }}</p>
                <button class="order-wizard-step-button-continue round-up-button" data-action="stop-donating">{{ translate 'Stop donating my change' }}</button>
            {{/if}}
            {{#unless allowDonation}}
                <p>{{ translate 'Round up and donate $(0) to Girl Scouts of the USA to help girls prepare for a lifetime of leadership, adventure, and success. By clicking this box you agree to donate your change.' roundedValue}}</p>
                <button class="order-wizard-step-button-continue round-up-button" data-action="start-donating"> Donate my change </button>
            {{/unless}}
        </label>
    </div>
</div>
