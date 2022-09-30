const template = `
  <div>
    <button
      @click="open = true"
      class="px-6 py-3 mt-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none"
    >
      + New Log
    </button>

    <div
      v-show="open"
      class="modal z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center"
    >
      <div
        @click="open = false"
        class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"
      ></div>

      <div
        class="z-50 w-11/12 mx-auto overflow-y-auto shadow-white modal-container md:max-w-fit"
      >
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="px-6 py-4 text-left modal-content">
          <!--Title-->

          <!--Body-->
          <div>
          <div class="container px-6 py-8">
            <h3 class="text-3xl font-semibold text-white">Add a new log</h3>
        
            <div class="mt-4">
                <div class="mt-4">
                    <div class="p-4 bg-gray-800 rounded-md shadow-lg shadow-slate-800">
                        <flow-form v-bind:progressbar="true" v-bind:standalone="true" ref='flowform' v-bind:questions='questions'>
                          <template v-slot:complete class="w-full">
                          <p>
                            <span class="fh2">Confirm?</span>
                            <span v-if="!submitted" class="f-section-text">
                            </span>
                          </p>
                          </template>

                          <template v-slot:completeButton>
                            <div class="f-submit w-fit" v-if="!submitted">
                              <button
                                class="o-btn-action"
                                ref="button"
                                type="submit"
                                href="#"
                                v-on:click.prevent="createLog()"
                                aria-label="Press to submit">
                                <span>Add</span>
                              </button>
                            </div>
                        </template>
                        </flow-form>
                           
                    </div>
                </div>
            </div>
            
          </div>
            </div>

          <!--Footer-->
        </div>
      </div>
    </div>
  </div>
`

const value = new VueFlowForm.QuestionModel({
  id: 'value',
  title: '',
  helpText: '',
  type: VueFlowForm.QuestionType.Text,
  required: true,
  placeholder: "data"

})

const notes = new VueFlowForm.QuestionModel({
id: 'notes',
title: 'Any notes?',
helpText: 'Add specific notes here',
type: VueFlowForm.QuestionType.Text,
required: false,
placeholder: "Notes"
})



export default {
    template: template,
    data(){
      return{

        open: false,
        submitted:false,
        questions:[
          value,
          notes
        ],
        id: -1
      }
    },
    props: {
      tracker_name: {
        default: '',
        type: String
      },
      tracker_desc: {
        default: 'Track value',
        type: String
      },
      tracker_type: {
        default: '',
        type: String
      },
      tracker_id:{
        default: -1,
        type: Number
      },
      tracker_choices:{
        default:'',
        type: String
      }
    },
    components: {
      question: VueFlowForm.Question,
      FlowForm: VueFlowForm.FlowForm
    },
    methods:{
      createLog() {
        console.log("Trying to create a log!")
        var data = this.getData();
        console.log(data)
        axios.post('/tracker/log',{
          data
        },
        {
          headers:{
            Authorization: 'JWT '+ $cookies.get("access_token")
          }
        })
        this.$refs.flowform.reset()
        this.open=false
        this.$router.go()
      },
      getData() {
        var data = {}
        this.questions.forEach(question => {
            data[question.id] = question.answer
        })
        data['datetime'] = new Date().toISOString();
        data['id'] = this.tracker_id
        return data
      }
    },
    mounted(){
      console.log(this.tracker_desc)
      this.questions[0].title = this.tracker_desc
      console.log(this.tracker_type)
      console.log(this.tracker_id)
      switch(this.tracker_type){
        
        case "text":
          this.questions[0].type  = VueFlowForm.QuestionType.Text;
          break;
        
        case "number":
          this.questions[0].type= VueFlowForm.QuestionType.Number;
          break;
        
        case "bool":
          this.questions[0].type = VueFlowForm.QuestionType.MultipleChoice;
          this.questions[0]['options'] = [
            new VueFlowForm.ChoiceOption({
              label: Yes, 
              value: yes
            }),
            new VueFlowForm.ChoiceOption({
              label: No, 
              value: no
            })
          ]
          break;

        case "choice":
          var choices = []
          for(var i of this.tracker_choices.split('\n')){
            choices.push(
              new VueFlowForm.ChoiceOption({
              label: String(i), 
              value: String(i)
            }))
          }
          this.questions[0].type = VueFlowForm.QuestionType.MultipleChoice
          this.questions[0]['options'] = choices 
          break;

        case "duration":
          this.questions[0] = new VueFlowForm.QuestionModel({
            id: 'value',
            title: 'Enter Duration',
            type: VueFlowForm.QuestionType.Text,
            mask: '##:##:##',
            placeholder: 'hh:mm:dd'
          });
          break;
      }
      
    }
}
