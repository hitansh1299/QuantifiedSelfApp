const template = `
<div class="max-w-sm mt-6 overflow-hidden bg-white rounded shadow-lg">
    <router-link :to="{
        name: 'dashboard',
        query: { 
            'tracker_id': this.tracker_id,
            'tracker_type': this.tracker_type,
            'tracker_desc': this.tracker_desc,
            'tracker_name': this.tracker_name,
            'tracker_choices': this.tracker_choices,
            'last_edited': this.last_edited
        }
    }"
    >
    <div class="px-6 py-4">
        <div class="mb-2 text-xl font-bold text-gray-900">{{tracker_name}}</div>
        <p class="text-base text-gray-700">
            {{tracker_desc}} 
        </p>
    </div>
    <div class="px-6 pt-4 pb-2 flex items-stretch justify-between">
        <span
        class="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200" >
            Last updated: {{last_edited || 'Never'}} 
        </span>
        <div class="flex justify-around">
            <i class="fas fa-trash text-sm font-semibold"></i> 
            <i class="fas fa-pen text-sm font-semibold"></i>
        </div>
    </div>
    </router-link>
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
        tracker_desc: {
            type: String,
            default: ''
        },
        last_edited: {
            type: String,
            default: 'Never'
        },
        tracker_choices: {
            type: String,
            default: ''
        },
        tracker_id: Number
    },
    mounted(){
        console.log('Cards'+this.last_edited)
    }
}