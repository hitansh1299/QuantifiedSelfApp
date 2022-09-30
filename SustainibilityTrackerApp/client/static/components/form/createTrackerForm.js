import Sidebar from "../common/Sidebar.js";
import Header from "../common/Header.js";
import {complete} from "./complete.js"
import { router } from "../../main.js";
const template = `
<div className="flex h-screen bg-gray-200 font-roboto">
    <Sidebar />
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header />
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-600">
        <div class="container mx-auto px-6 py-8">
            <h3 class="text-3xl font-semibold text-white">Create a new Tracker</h3>
        
            <div class="mt-4">
                <div class="mt-4">
                    <div class="p-6 bg-gray-800 rounded-md shadow-md">
                        <flow-form v-bind:progressbar="true" v-bind:standalone="true" ref='flowform' v-bind:questions='questions'>
                          <template v-slot:complete>
                          <p>
                            <span class="fh2">Confirm Tracker Creation</span>
                            <span v-if="!submitted" class="f-section-text">
                                You can verify the tracker details
                            </span>
                          </p>
                          </template>

                          <template v-slot:completeButton>
                          <div class="f-submit" v-if="!submitted">
                            <button
                              class="o-btn-action"
                              ref="button"
                              type="submit"
                              href="#"
                              v-on:click.prevent="createTracker()"
                              aria-label="Press to submit">
                              <span>Create Tracker</span>
                            </button>
                            <a 
                              class="f-enter-desc"
                              href="#"
                              v-on:click.prevent="createTracker()">
                            </a>
                          </div>
                        </template>
                        </flow-form>
                           
                    </div>
                </div>
            </div>
            
        </div>
      </main>
    </div>
</div>

`
const trackerType = new VueFlowForm.QuestionModel({
    id: 'tracker_type',
    title: 'What is the type of value to be tracked?',
    helpText: '',
    type: VueFlowForm.QuestionType.MultipleChoice,
    required: true,
    multiple: false,
    options: [
      new VueFlowForm.ChoiceOption({
        label: 'Text', 
        value: 'text'
      }),
      new VueFlowForm.ChoiceOption({
        label: 'Number/Numeric Type', 
        value: 'number'
       }),
      new VueFlowForm.ChoiceOption({
        label: 'Multiple Choice', 
        value: 'choice'
      }), 
      new VueFlowForm.ChoiceOption({
        label: 'Boolean', 
        value: 'bool'
      }),
      new VueFlowForm.ChoiceOption({
        label: 'Duration', 
        value: 'duration'
      })
    ],
    jump: {
      choice: 'choices',
      _other: 'tracker_description'
    }
  })

const trackerName = new VueFlowForm.QuestionModel({
    id: 'tracker_name',
    title: 'Please name your Tracker',
    helpText: 'What would you like to name your tracker, this will be displayed on your home screen',
    type: VueFlowForm.QuestionType.Text,
    required: true,
    placeholder: "Name for your tracker"

  })

const description = new VueFlowForm.QuestionModel({
  id: 'tracker_description',
  title: 'Please provide description for the tracker',
  helpText: 'This is the question that will be asked to you when loading tracking',
  type: VueFlowForm.QuestionType.Text,
  required: true,
  placeholder: "Tracker question"

})

const choice = new VueFlowForm.QuestionModel({
    id: 'choices',
    title: 'Please enter choices',
    helpText: 'Please enter choices to be asked, each on a different line (Shift + Enter)',
    type: VueFlowForm.QuestionType.LongText,
    required: true,
    value: ''
  })

export default{
    template: template,
    components: {
        Sidebar: Sidebar,
        Header: Header,
        question: VueFlowForm.Question,
        FlowForm: VueFlowForm.FlowForm,
        complete: complete
      },
    data(){
        return {
             name: 'NV_1',
             age: 0,
             number: 1000,
             submitted:false,
             questions:[
                  trackerName,
                  trackerType,
                  choice,
                  description
             ]
        }
    },
    methods:{
      onComplete(completed, questionList) {
        // This method is called whenever the "completed" status is changed.
        this.completed = completed
      },
      createTracker() {
        this.$refs.flowform.submitted = true
        this.submitted = true
        console.log(this.getData())
        axios.post('/tracker/',
          {data: this.getData()},
          {
            headers:{
              Authorization: 'JWT '+ $cookies.get("access_token")
            }
          }
        ).finally(() => {
          this.submitted = false 
          this.questions.forEach(q => {
            q.answer = null
          })
          router.push('/home')
        })
      },
      getData() {
        var data = {}
        this.questions.forEach(question => {
            data[question.id] = question.answer
        })
        if (data['choice'] != null){
            data['choice'] = data['choice'].split(/\r?\n/)
        }

        return data
      }
    }
  }