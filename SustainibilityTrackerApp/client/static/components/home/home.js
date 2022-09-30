import Sidebar from "../common/Sidebar.js";
import Header from "../common/Header.js";
import card from "./card.js"
const template = `
<div className="flex h-screen bg-gray-200 font-roboto">
    <Sidebar/>
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header/>
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-600">
        <div class="container mx-auto px-6 py-8">
        <router-link
          to="/form"
        >
            <h3 class="text-3xl font-semibold text-white">
              + Create a new Tracker
            </h3>
        </router-link>
            <div class="mt-4">
                <div class="mt-4">
                    <div class="p-6 bg-gray-800 rounded-md shadow-md">
                    <h3 class="text-3xl font-semibold text-emerald-600">Your Trackers</h3>
                      <div class="mt-4 mb-3">
                          <card 
                          v-if="!this.trackersLoading"
                          v-for="tracker in this.trackers" 
                          :tracker_desc='tracker["tracker_description"]' 
                          :tracker_type='tracker.tracker_type'
                          :tracker_name='tracker.tracker_name'
                          :tracker_id='tracker.id'
                          :tracker_choices='tracker.choices'
                          :last_edited='tracker.last_updated'
                          />
                      </div>  
                    </div>
                </div>
            </div>
        
        </div>
      </main>
    </div>
</div>
`

export default{
    template: template,
    components: {
        Sidebar: Sidebar,
        Header: Header,
        card: card
    },
    data(){
      return{
        trackers: {},
        trackersLoading: true
      }
    },
    methods:{
      getTrackers(){
        
      }
    },
    beforeMount(){
      axios.get('/tracker/', {
        headers: {
          Authorization: 'JWT '+ $cookies.get("access_token")
        }
      }).then(res => (this.trackers = res.data)).finally(() => {
        this.trackersLoading = false
      })
    }
}