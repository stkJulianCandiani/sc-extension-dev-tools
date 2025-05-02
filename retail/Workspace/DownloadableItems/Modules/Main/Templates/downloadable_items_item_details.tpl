{{!
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
}}

{{#if showDownloadableItems}}
    <table class="table table-hover downloadable-items-audio-table">
        <thead>
            <tr>
                <th>{{ translate 'Track' }}</th>
                <th>{{ translate 'Price' }}</th>
                <th></th>
                <th><input type="checkbox" data-action="select-all-tracks"></th>
            </tr>
        </thead>
        <tbody>
            {{#each downloadableItems}}
                <tr>
                    <td>{{_name}}</td>
                    <td>{{_price_formatted}}</td>
                    <td>
                        {{#if custitem2}}
                            <div class="downloadable-items-audio-container">
                                <audio controls controlsList="play timeline nodownload novolume">
                                    <source src="{{custitem2}}" type="audio/mpeg">
                                </audio>
                            </div>
                        {{/if}}
                    </td>
                    <td><input type="checkbox" data-action="select-track" data-itemid="{{internalid}}"></td>
                </tr>
            {{/each}}
        </tbody>
    </table>
{{/if}}
