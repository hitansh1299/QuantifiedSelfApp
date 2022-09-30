const template = `
    <div class="relative shadow-lg rounded-lg overflow-hidden w-auto">
        <div class="py-3 px-5 bg-gray-50 w-full text-emerald-600">Line chart</div>
            <canvas class="p-10 bg-white" id="linechart"></canvas>
    </div>
`

const labels = ["January", "February", "March", "April", "May", "June"];

const data = {
    labels: labels,
    datasets: [
      {
        label: "value",
        maxBarThickness: 5,
        backgroundColor: "hsl(252, 82.9%, 67.8%)",
        borderColor: "hsl(252, 82.9%, 67.8%)",
        data: [0, 100, 5, 2, 20, 30, 45],
      },
    ],
  };

  const configLineChart = {
    type: "line",
    data,
    options: {
        responsive: true
    },
  };

  var chartLine = new Chart(
    "linechart",
    configLineChart
  );

export default {
    template: template,
    data(){
        return {
            chartLine: null
        }
    },
    props:{
      title: {
        default: 'Line Chart'
      },
      id: {
        required: true
      },
      type: String
    },
    beforeMount(){},
      
    mounted(){
        axios.get(`/tracker/chart/${this.id}/${this.type}`,
          {
            headers: {
              Authorization: 'JWT '+ $cookies.get("access_token")
            }
          }).then(
            res => {
              console.log(res);
              this.chartLine = new Chart(
                "linechart",
                {
                  type: "bar",
                  data: {
                    labels: res.data.x,
                    datasets: [
                      {
                        label: "tracked Value",
                        maxBarThickness: 40,
                        backgroundColor: "#50C878",
                        // backgroundColor: 'rgb(217,231,236)',
                        borderColor: "hsl(252, 82.9%, 67.8%)",
                        data: res.data.y,
                      }
                    ]
                  },
                  options: {
                      responsive: true
                  }
                }
              )
            }
          )
    }
}