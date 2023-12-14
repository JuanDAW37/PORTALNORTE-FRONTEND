import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ImagenService } from 'src/app/services/imagen/imagen.service';
import { TiposActividades } from 'src/app/models/tiposactividades.models';
import { TiposActividadService } from 'src/app/services/tipos-actividad.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-tipos-actividad-modif',
  templateUrl: './tipos-actividad-modif.component.html',
  styleUrls: ['./tipos-actividad-modif.component.css'],
})
export class TiposActividadModifComponent {
  public tipos:TiposActividades[];
  id!:number;
  public tit: string = 'Alta de Anuncio';
  public previaFoto!:String;
  public previaIcono!:String;
  public ModiForm!:FormGroup;
  public archivo:any;
  public archivos:any=[];
  public mensaje:string="";

  constructor(public tipos_servicio: TiposActividadService, private router: Router, private route: ActivatedRoute,
    private form : FormBuilder, private sanitizer : DomSanitizer, public imagen:ImagenService) {
    this.tipos=[];
    this.id=this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.ModiForm=this.form.group({
      tipo: new FormControl('', [Validators.required, Validators.minLength(1)]),
      foto:new FormControl(''),
      icono:new FormControl('')
    });
    if(this.tipos_servicio.estado){
      this.tit="Consulta de Tipo de Actividad";
      this.ModiForm.controls['tipo'].disable();
      this.ModiForm.controls['foto'].disable();
      this.ModiForm.controls['icono'].disable();
      this.ModiForm.controls['tipo'].removeValidators([Validators.required, Validators.minLength(1)]);
    }else{
      this.tit="Modificación de Tipo de Actividad";
    }
    this.tipos_servicio.leer(this.id).subscribe((data)=>{
      this.ModiForm.controls['tipo'].setValue(data.tipo);
      this.ModiForm.controls['foto'].setValue(data.foto);
      this.ModiForm.controls['icono'].setValue(data.icono);
    })
  }

  /**Se les da un nombre descriptivo a los campos, a la hora de que sea más cómodo validarlos */
  get tipo() {
    return this.ModiForm.get('tipo') as FormControl;
  }

  /**
  * Envía la foto y el icono al servidor
  * @returns any
  */
  subir():any{
    try{
      const formData=new FormData();
      for(let i=0;i<this.archivos.length;i++){
        formData.append('file',this.archivos[i]);
      }
      this.imagen.tipo(formData).subscribe((data)=>{
        console.log(data);
      });
    }catch(e){
      console.log(e);
    }
  }

  /**
   * Guarda el tipo de actividad
   */
  guardar(){
    let tipo=new TiposActividades();
    tipo.id=this.id;
    tipo.tipo=this.ModiForm.controls['tipo'].value;
    if(this.archivo!=undefined){
      tipo.foto=this.archivo.name;
      tipo.icono=this.archivo.name;
    }else{
      tipo.foto="";
      tipo.icono="";
    }
    this.tipos_servicio.update(tipo).subscribe((data)=>{
      this.mensaje=data.mensaje;
      if(this.archivo!=undefined){
        this.subir();
      }
    })
  }

  subirFoto(event:any){
    this.archivo = event.target.files[0];
    this.extraerBase64(this.archivo).then((imagen:any)=>{
      this.previaFoto=imagen.base
    })
    this.archivos.push(this.archivo);
  }

  subirIcono(event:any){
    this.archivo = event.target.files[0];
    this.extraerBase64(this.archivo).then((imagen:any)=>{
      this.previaIcono=imagen.base
    })
    this.archivos.push(this.archivo);
  }

  extraerBase64=async($event: any) => new Promise((resolve,reject)=>{
    try{
      const unsafeImg=window.URL.createObjectURL($event);
      const image=this.sanitizer.bypassSecurityTrustUrl($event);
      const reader=new FileReader();
      reader.readAsDataURL($event);
      reader.onload=()=>{
        resolve({
          base:reader.result
        });
      };
      reader.onerror=error=>{
        resolve({
          base:null
        });
      };
    }catch(e){
      //return null;
    }
  })

  cerrar(){
    this.router.navigate(['/tipos']);
  }
}
