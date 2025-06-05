{{#if displayItems}}
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
    {{#each items}}
        <tr>
		    <td>{{displayname}}</td>
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