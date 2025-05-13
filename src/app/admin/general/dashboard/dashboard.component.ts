import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../core/services/admin/dashboard/dashboard.service';
import { Chart, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  userCount: number = 0;
  adminCount: number = 0;
  pendingBookings: number = 0;
  completedBookings: number = 0;
  vehicles: number = 0;
  categories: number = 0;
  ads: number = 0;
  chart: any = [];
  newChart: any = [];
  facilitiesChart: any = [];
  overallChart: any = [];

  constructor(private _DashboardService: DashboardService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this._DashboardService.getCharts().subscribe({
      next: (response) => {
        this.userCount = response.usersCount;
        this.adminCount = response.adminsCount;
        this.pendingBookings = 20;
        this.completedBookings = 12;
        this.vehicles = response.vehiclesCount;
        this.categories = response.categoriesCount;

        console.log(response);
        
        this.initializeCharts();
      },
      error: (err) => {
        console.error('Error fetching dashboard data:', err);
      }
    });
  }

  initializeCharts() {
    this.createUsersChart();
    this.createFacilitiesChart();
    this.createOverallChart();
  }


  createUsersChart() {
    this.newChart = new Chart('usersChart', {
      type: 'bar',
      data: {
        labels: ['Users', 'Admins'],
        datasets: [{
          label: 'Count',
          data: [this.userCount, this.adminCount],
          backgroundColor: ['#3252DF', '#FF498B'],
          borderRadius: 8
        }]
      },
      options: {
        animation: {
          delay: (context) => context.dataIndex * 300,
          duration: 1000,
          easing: 'easeInOutQuart'
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }


  createFacilitiesChart() {
    this.facilitiesChart = new Chart('facilitiesChart', {
      type: 'pie',
      data: {
        labels: ['Vehicles', 'Categories'],
        datasets: [{
          data: [this.vehicles, this.categories],
          backgroundColor: ['#3252DF', '#FF498B'],
          borderWidth: 1
        }]
      },
      options: {
        animation: {
          animateScale: true,
          animateRotate: true,
          duration: 1500
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }

  createOverallChart() {
    this.overallChart = new Chart('overallChart', {
      type: 'radar',
      data: {
        labels: ['Users', 'Admins', 'Vehicles', 'Categories', 'Pending Bookings', 'Completed Bookings'],
        datasets: [{
          label: 'Statistics',
          data: [
            this.userCount,
            this.adminCount,
            this.vehicles,
            this.categories,
            // this.pendingBookings,
            // this.completedBookings
          ],
          backgroundColor: 'rgba(50, 82, 223, 0.2)',
          borderColor: '#3252DF',
          pointBackgroundColor: '#FF498B',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#3252DF'
        }]
      },
      options: {
        animation: {
          duration: 2000
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
