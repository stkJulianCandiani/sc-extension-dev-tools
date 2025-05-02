{{!
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
}}
<aside class="merchandising-zone merchandising-zone-default">
    {{#if showTitle}}
        <h3 class="merchandising-zone-title">{{translate zoneTitle}}</h3>
    {{/if}}
    {{#if showDescription}}
        {{#if zoneDescription}}
            <div class="merchandising-zone-description">{{translate zoneDescription}}</div>
        {{/if}}
    {{/if}}
    <div class="merchandising-zone-container">
        <div data-view="Zone.Items"></div>
    </div>
</aside>
