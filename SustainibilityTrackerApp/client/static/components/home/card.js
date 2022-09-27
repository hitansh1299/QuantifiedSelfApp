const template = `
<div class="max-w-sm mt-6 overflow-hidden bg-white rounded shadow-lg">
    <div class="px-6 py-4">
        <div class="mb-2 text-xl font-bold text-gray-900">{{tracker_name}}</div>
        <p class="text-base text-gray-700">
            {{description}} 
        </p>
    </div>
    <div class="px-6 pt-4 pb-2">
        <span
        class="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200">
        Last updated: {{last_edited}} 
        </span>
    </div>
</div>
`

export default{
    template: template,
    props: {
        tracker_name: {
            type: String,
            default: 'My Tracker'
        },
        tracker_type: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        },
        last_edited: {
            type: String,
            default: '14/12/2021'
        }
    },
    data(){
        return{

        }
    }
}