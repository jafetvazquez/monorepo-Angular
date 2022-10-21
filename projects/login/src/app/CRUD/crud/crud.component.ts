import { Component, OnInit, Input, Type } from '@angular/core';
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { MiniCRUDService } from "../../../../_services/mini-crud.service";
import { HttpProviderService } from 'projects/login/_services/http-provider.service';

@Component({
  selector: 'ng-modal-confirm',
  template: `
  <div class=""modal-header>
    <h5 class="modal-title" id="modal-title">Delete Confirmation</h5>
    <button type="button" class="btn close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
    <span aria-hidden="true">x</span>
    </button>
  </div>

  <div class="modal-body">
    <p>Are you sure you want to delete?</p>
  </div>

  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">CANCEL</button>
    <button type="button" ngbAutofocus class="btn btn-success" (click)="modal.close('Ok click')">OK</button>
  </div>`,
})

export class NgModalConfirm{
  constructor(public modal: NgbActiveModal){}
}
const MODALS: { [name: string]: Type<any>} = {
  deleteModal: NgModalConfirm,
};

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})

export class CrudComponent implements OnInit {
  closeResult = '';
  employeeList: any = [];

  constructor(private router: Router, private modalService: NgbModal, private toastr: ToastrService, private httpProvider: HttpProviderService) { }

  ngOnInit(): void {
    this.getAllEmployee();
  }
  async getAllEmployee(){
    this.httpProvider.getAllEmployee().subscribe((data: any) => {
      if(data != null && data.body != null){
        var resultData = data.body;
        if(resultData){
          this.employeeList = resultData;
        }
      }
    },
    (error: any) => {
      if(error.error && error.error.message){
        this.employeeList = [];
      }
    });
  }

  addEmployee(){
    this.router.navigate(['AddEmployee']);
  }

  deleteEmployeeConfirmation(employee: any) {
    this.modalService.open(MODALS['deleteModal'],
      {
        ariaLabelledBy: 'modal-basic-title'
      }).result.then((result) => {
        this.deleteEmployee(employee);
      },
        (reason) => {});
  }

  deleteEmployee(employee: any){
    this.httpProvider.deleteEmployee(employee.id).subscribe((data: any) => {
      if(data != null && data.body != null){
        var resultData = data.body;

        if(resultData != null && resultData.isSuccess){
          this.toastr.success(resultData.message);
          this.getAllEmployee();
        }
      }
    })
  }
}