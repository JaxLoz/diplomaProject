<script setup>

</script>

<template>
  <div class="graph">
    <div class=" w-1/2">
      <Doughnut
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
      />
    </div>
  </div>
</template>

<script>
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { useRegitrosStore } from '@/stores/registros.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

export default {
  name: 'DoughnutChart',
  components: { Doughnut },
  data() {
    return {
      useRegistros: useRegitrosStore(),
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Estratos de los estudiantes'
          }
        }
      }
    }
  },
  computed: {
    estratos() {
      return this.useRegistros.estratos
    },
    chartData() {
      return {
        labels: Object.keys(this.estratos),
        datasets: [{ 
          data: Object.values(this.estratos),
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(255, 159, 64, 0.8)',
            'rgba(255, 205, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(153, 102, 255, 0.8)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)'
          ],
          borderWidth: 1
        }]
      }
    }
  }
}
</script>



