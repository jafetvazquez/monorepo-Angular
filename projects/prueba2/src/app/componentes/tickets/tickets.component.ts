import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  data: any;

  constructor(private http: HttpClient) {
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe((data) => {
      this.data = data;

      setTimeout(()=>{
        $('#datatableExample').DataTable({
          pagingType: 'simple_numbers',
          pageLength: 5,
          processing: true,
          lengthMenu: [5, 10, 25],
          language:{url:'//cdn.datatables.net/plug-ins/1.12.1/i18n/es-ES.json'},
          "dom": 'fltip',
        });
      }, 1);

      
    }, error => console.log(error)
    );
  }

  ngOnInit(): void {
    $('.dateadded').on( 'change', function (ret :any) {
 
      var v = ret.target.value  // getting search input value
      
      $('#dataTables-example').DataTable().columns(3).search(v).draw();
  } );

  }

}
