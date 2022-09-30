const template = `
    <div class="relative shadow-lg rounded-lg overflow-hidden w-auto">
        <div class="py-3 px-5 bg-gray-50 w-full">Line chart</div>
            <canvas class="p-10 bg-white" id="linechart"></canvas>
    </div>
`

const labels = ["January", "February", "March", "April", "May", "June"];

const data = {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
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
            data: data,
            chartLine: null
        }
    },
    beforeMount(){

    },
    mounted(){
        chartLine = new Chart(
            "linechart",
            configLineChart
          );
    }
}