import { Component } from '@angular/core';
import { Publicidades } from '../../../models/publicidades.models';
import { PublicidadService } from 'src/app/services/publicidad.service';
import { Gestors } from 'src/app/models/gestors.models';
import { GestorsService } from 'src/app/services/gestors.service';
import { Empresas } from 'src/app/models/empresas.models';
import { EmpresaService } from 'src/app/services/empresa.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ImagenService } from 'src/app/services/imagen/imagen.service';

@Component({
  selector: 'app-publicidad-alta',
  templateUrl: './publicidad-alta.component.html',
  styleUrls: ['../../../app.component.css']
})
export class PublicidadAltaComponent {
  public tit: string = 'Alta de Anuncio';
  public gestors:Gestors[];
  public empresas:Empresas[];
  public previsualizacion!:String;
  public AltaForm!:FormGroup;
  public archivo:any;
  public archivos:any=[];
  public gestor_id:number=0;
  public empresa_id:number=0;

  constructor(private gestor_servicio: GestorsService, private publi_servicio: PublicidadService,
    private empresa_servicio: EmpresaService, public form: FormBuilder, private router: Router,
    private sanitizer: DomSanitizer, private imagen:ImagenService){
    this.gestors=[];
    this.empresas=[];
  }

  /**
   * Se inicializa el componente
   * @returns void
   */
  ngOnInit(): void {
    this.AltaForm=this.form.group({
      titulo: new FormControl('', [Validators.required, Validators.minLength(1)]),
      importe:new FormControl(0, [Validators.required, Validators.minLength(1)]),
      foto:new FormControl(''),
      gestor:new FormControl(Validators.required),
      empresa:new FormControl(Validators.required)
    });
    let gestor_id=0;
    let empresa_id=0;
    //Se cargan los dos comboBox (Gestor y Empresa)
    this.gestor_servicio.get().subscribe((data)=>{
      for(let i=0; i<data.length;i++){
        let gestor=new Gestors();
        if(gestor_id==0){
          this.gestor_id=data[i].id;
          gestor_id=data[i].id
        }
        gestor.id=data[i].id;
        gestor.nombre=data[i].nombre;
        this.gestors.push(gestor);
      }
      this.AltaForm.controls['gestor'].setValue(this.gestor_id);
    })
    this.empresa_servicio.get().subscribe((data)=>{
      for(let i=0; i<data.length;i++){
        let empresa=new Empresas();
        if(empresa_id==0){
          this.empresa_id=data[i].id;
          empresa_id=data[i].id
        }
        empresa.id=data[i].id;
        empresa.nombre=data[i].nombre;
        this.empresas.push(empresa);
      }
      this.AltaForm.controls['empresa'].setValue(this.empresa_id);
    })
  }

  /**Se les da un nombre descriptivo a los campos, a la hora de que sea más cómodo validarlos */
  get titulo():FormControl {
    return this.AltaForm.get('titulo') as FormControl;
  }

  get gestor():FormControl {
    return this.AltaForm.get('gestor') as FormControl;
  }

  get empresa():FormControl {
    return this.AltaForm.get('empresa') as FormControl;
  }

  /**Cierra el formulario
   * @returns void
  */
  cerrar():void {
    this.router.navigate(['/publicidad']);
  }

  /**
  * Envía la foto al servidor
  * @returns any
  */
  subir():any{
    try{
      const formData=new FormData();
      for(let i=0;i<this.archivos.length;i++){
        formData.append('file',this.archivos[i]);
      }
      this.imagen.publicidad(formData).subscribe((data)=>{
        console.log(data);
      });
    }catch(e){
      console.log(e);
    }
  }

  /**
   * Guarda el anuncio
   * @returns void
   */
  guardar():void{
    let publi=new Publicidades();
    publi.titulo=this.AltaForm.controls['titulo'].value;
    publi.importe=this.AltaForm.controls['importe'].value;
    publi.gestor_id=this.AltaForm.controls['gestor'].value;
    publi.empresa_id=this.AltaForm.controls['empresa'].value;
    console.log(publi);
    if(this.archivo!=undefined){
      publi.imagen=this.archivo.name;
    }else{
      publi.imagen="";
    }
    this.publi_servicio.insert(publi).subscribe(()=>{
        if(this.archivo!=undefined){
          this.subir();
        }
    })
    this.publi_servicio.get().subscribe(()=>{});
    this.router.navigate(['/publicidad']);
  }

  /**
   * Recupera el nombre de archivo proporcionado por el evento event
   * Llama a extraerBase64 para hacer la previsualización de la foto
   * @param event
   * @return void
   */
  subirFoto(event:any):void{
    this.archivo = event.target.files[0];
    this.extraerBase64(this.archivo).then((imagen:any)=>{
    this.previsualizacion=imagen.base
    });
    this.archivos.push(this.archivo);
  }

  /**
   * Convierte el archivo de imagen escogido a base64 para previsualizarlo
   * @param $event
   * @returns string
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
  });
}
