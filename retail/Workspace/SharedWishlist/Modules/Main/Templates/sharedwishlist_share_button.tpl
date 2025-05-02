{{!
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
}}

{{#if isDefaultList }}

    {{#if isInvitee }}

        <p class="product-list-share-list-shared-with">
            <span class="product-list-list-details-description-label">{{translate 'Shared by:'}} </span>
            <span class="product-list-list-details-description-value">{{ownerInfo}}</span>
        </p>

        {{ else }}

        <div class="product-list-share-list-button">
            <h5>Privacy</h5>
            <div class="product-list-share-list-setting">
                <label class="switch label">{{translate 'Share:'}}</label>
                <label class="switch"><input type="checkbox" data-action="editList" {{#unless isListPrivate}} checked {{/unless}} />
                    <div class="slider round"></div>
                </label>
            </div>
            {{#unless isListPrivate}}
                <p class="product-list-share-list-shared-with">
                <p>{{translate 'Shared with:'}}</p>
                <p>{{sharelistwith}}</p>
                </p>
            {{/unless}}
        </div>

    {{/if}}
{{/if}}
