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
            <a data-navigation="ignore-click" target="_blank" data-file-id="{{file}}" data-download href="{{ downloadLink }}">
                <span class="downloadable-item-link-text">{{ translate 'Download' }}</span>
                <i class="downloadable-item-icon"></i>
            </a>
        {{else}}
            {{errorMessage}}
        {{/if}}
    </td>
</tr>