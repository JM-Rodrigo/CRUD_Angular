import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/servicio/crud.service';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-listar-empleado',
  templateUrl: './listar-empleado.component.html',
  styleUrls: ['./listar-empleado.component.css']
})
export class ListarEmpleadoComponent implements OnInit {
  Empleados:any;

  constructor(
    private crudService:CrudService
  ) { }

  ngOnInit(): void {
    this.crudService.ObtenerEmpleados().subscribe(respuesta => {
      console.log(respuesta);
      this.Empleados=respuesta;
    })
  } 
  borrarRegistro(id:any, iControl:any){
    console.log(id);
    console.log(iControl);

    Swal.fire({
      title: 'Deseas eliminar?',
      text: "Se eliminara el registro!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, deseo eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
            
        this.crudService.BorrarEmlpleado(id).subscribe((respuesta)=>{
          this.Empleados.splice(iControl,1);
        });
      
        Swal.fire(
          'Eliminado!',
          "Has eliminado el registro"
        )
      }
    })



  }

}
