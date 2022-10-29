import log from "./log.js"
import chart from "./charts.js"
import editTime from "./editTime.js"
import editNote from "./editNote.js"
const template = `
  <div>
    <h3 class="text-3xl font-medium text-white">{{this.tracker_name}}</h3>

    <div class="mt-4 text-white" >
      <div class="pb-10">
        <log
        :tracker_id='this.tracker_id'
        :tracker_type='this.tracker_type'
        :tracker_name='this.tracker_name'
        :tracker_desc='this.tracker_desc'
        :tracker_choices='this.tracker_choices'
        @click='this.$forceUpdate()'
        />
        <button
        class="px-6 py-3 mt-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none"
        @click="getCSV(this.tracker_id)"
        >
        Download as CSV
      </button>
      </div>
      <div class="flex flex-wrap ">
        <div class="w-full px-6">
          <div
            class="flex px-5 py-6 rounded-md shadow-sm"
          >
            <div class="w-full">
              <chart
                :id='this.tracker_id'
                :type='this.tracker_type'
                :title='this.tracker_name'
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8"></div>

    <div class="flex flex-col mt-8">
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div
          class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg"
        >
          <table class="min-w-full">
            <thead>
              <tr>
                <th
                  class="px-6 py-3 text-xs font-medium  font-semibold leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  Date/Time
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium font-semibold leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  Data
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium font-semibold leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  Note
                </th>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
              </tr>
            </thead>

            <tbody class="bg-white">
              <tr v-for="(u, index) in logs" :key="index">
                <td
                  class="px-6 py-4 border-b border-gray-200 whitespace-nowrap"
                > 
                    <editTime 
                    :id='u.id'
                    :datetime='u.datetime'
                    />   
                </td>

                <td
                  class="px-6 py-4 border-b border-gray-200 whitespace-nowrap"
                >
                  <div class="text-sm leading-5 text-gray-900">
                    {{ u.value }}
                  </div>
                </td>

                <td
                  class="px-6 py-4 border-b border-gray-200 whitespace-nowrap"
                >
                <editNote 
                :id='u.id'
                :note='u.note'
                />
                </td>

                <td
                  class="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap"
                >
                  <a @click='deleteLog(u.id)' class="text-red-600 hover:font-semibold"
                    >Delete</a
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
`

export default{
  template: template,
  data(){
    return {
      tracker_id: '',
      tracker_name: '',
      tracker_desc: '',
      tracker_type: '',
      tracker_choices: '',
      last_edited: '',
      logs: [],
      openDate: false
    }
  },
  components: {
    log: log,
    chart: chart,
    editTime: editTime,
    editNote: editNote
  },
  created(){
    this.tracker_id = Number(this.$route.query['tracker_id'])
    this.tracker_desc = this.$route.query['tracker_desc']
    this.tracker_name = this.$route.query['tracker_name']
    this.tracker_choices = this.$route.query['tracker_choices']
    this.tracker_type = this.$route.query['tracker_type']
    this.last_edited = this.$route.query['last_edited']

    //GET logs
  },
  mounted(){
    axios.get(`/tracker/${this.tracker_id}/logs`,{
      headers: {
        Authorization: 'JWT '+ $cookies.get("access_token")
      }
    })
    .then(res => {
        console.log(res)
        this.logs = res['data']['logs']
    })       
  },
  methods: {
    deleteLog(id){
      axios.delete(`/tracker/log/${id}`,
      {
        headers: {
          Authorization: 'JWT '+ $cookies.get("access_token")
        }
      }).then(res => {this.$router.go()});
    },
    getCSV(id){
      axios.get(`/tracker/getCSV/${id}`,
      {
        responseType:'blob',
        headers: {
          Authorization: 'JWT '+ $cookies.get("access_token")
        }
      }).then(res => {
        const blob = new Blob([res.data], { type: 'text/csv' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = 'log.csv'
        link.click()
        URL.revokeObjectURL(link.href)
        // alert('Your CSV file will be sent to your email');
      });
    }
  }

}
