import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ImagenService } from 'src/app/services/imagen/imagen.service';
import { TiposActividades } from 'src/app/models/tiposactividades.models';
import { TiposActividadService } from 'src/app/services/tipos-actividad.service';

@Component({
  selector: 'app-tipos-actividad-alta',
  templateUrl: './tipos-actividad-alta.component.html',
  styleUrls: ['./tipos-actividad-alta.component.css']
})
export class TiposActividadAltaComponent {
  public tit: string = 'Alta de Anuncio';
  public previaFoto!:String;
  public previaIcono!:String;
  public AltaForm!:FormGroup;
  public archivo:any;
  public archivos:any=[];

  constructor(private tipo_servicio: TiposActividadService, private router: Router,
    public form: FormBuilder, private sanitizer: DomSanitizer, public imagen:ImagenService){}

  /**
   * Inicializa el componente
   *  @returns void
  */
  ngOnInit(): void {
    this.AltaForm=this.form.group({
      tipo: new FormControl('', [Validators.required, Validators.minLength(1)]),
      foto:new FormControl(''),
      icono:new FormControl('')
    });
  }

  /**Se les da un nombre descriptivo a los campos, a la hora de que sea más cómodo validarlos */
  get tipo():FormControl {
    return this.AltaForm.get('tipo') as FormControl;
  }

  /**
  * Envía la foto y el icoo al servidor
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
   * @returns void
   */
  guardar():void{
    let tipo=new TiposActividades();
    tipo.tipo=this.AltaForm.controls['tipo'].value;
    if(this.archivo!=undefined){
      tipo.foto=this.archivo.name[0];
      tipo.icono=this.archivo.name[1];
    }else{
      tipo.foto="";
      tipo.icono="";
    }
    this.tipo_servicio.insert(tipo).subscribe((data)=>{
      if(this.archivo!=undefined){
        this.subir();
      }
      this.router.navigate(['/tipos']);
      return;
    })
  }

  /**
   * Recupera el nombre de archivo proporcionado por el evento event
   * Llama a extraerBase64 para hacer la previsualización de la foto
   * @param event
   * @return void
   */
  subirFoto(event:any):void{
    this.archivo = event.target.files;
    this.extraerBase64(this.archivo).then((imagen:any)=>{
      this.previaFoto=imagen.base;
    });
    this.archivos.push(this.archivo);
  }

  /**
   * Recupera el nombre de archivo proporcionado por el evento event
   * Llama a extraerBase64 para hacer la previsualización de la foto
   * @param event
   * @return void
   */
  subirIcono(event:any):void{
    this.archivo = event.target.files;
    this.extraerBase64(this.archivo).then((imagen:any)=>{
      this.previaIcono=imagen.base
    });
    this.archivos.push(this.archivo);
  }

  /**
   *
   * @param $event Convierte la foto a o icono a base64 para previsualizar
   * @returns void
   */
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

  /**
   * Cierra y sale a listado
   * @returns void
   */
  cerrar():void{
    this.router.navigate(['/tipos']);
  }
}
