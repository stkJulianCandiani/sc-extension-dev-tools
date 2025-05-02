{{!
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
}}

<tr class="downloadable-items-list-item-row">
    <td class="downloadable-items-list-item-column" data-name="{{name}}">
        <span class="recordviews-actionable-label">{{translate 'Filename'}}</span>
        <span class="recordviews-actionable-value">{{name}}</span>
    </td>
    <td class="downloadable-items-list-item-column-downloads" data-name="{{name}}">
        <span class="recordviews-actionable-label">{{translate 'Remaining Downloads'}}</span>
        <span class="recordviews-actionable-value">{{remainingdownloads}}</span>
    </td>
    <td class="recordviews-actionable-actions">
        {{#if canDownload}}
            <a data-navigation="ignore-click" data-file-id="{{file}}" data-download href="{{ downloadLink }}">
                <span class="downloadable-item-link-text">{{ translate 'Download' }}</span>
                <i class="downloadable-item-icon"></i>
            </a>
        {{else}}
            {{errorMessage}}
        {{/if}}
    </td>
</tr>
