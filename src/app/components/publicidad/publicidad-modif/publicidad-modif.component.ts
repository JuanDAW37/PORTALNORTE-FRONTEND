import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicidadService } from 'src/app/services/publicidad.service';
import { Publicidades } from 'src/app/models/publicidades.models';
import { Gestors } from 'src/app/models/gestors.models';
import { GestorsService } from 'src/app/services/gestors.service';
import { Empresas } from 'src/app/models/empresas.models';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ImagenService } from 'src/app/services/imagen/imagen.service';

@Component({
  selector: 'app-publicidad-modif',
  templateUrl: './publicidad-modif.component.html',
  styleUrls: ['../../../app.component.css']
})
export class PublicidadModifComponent {
  public tit: string = 'Alta de Anuncio';
  public gestors:Gestors[];
  public empresas:Empresas[];
  public previsualizacion!:String;
  public archivo:any;
  public archivos:any=[];
  public gestor_id:any;
  public empresa_id:any;
  public id!:number;
  public ModifForm!:FormGroup;
  public mensaje="";

  constructor(private gestor_servicio: GestorsService, public publi_servicio: PublicidadService,
    private empresa_servicio: EmpresaService, public form: FormBuilder, private router: Router,
    private sanitizer: DomSanitizer, private route: ActivatedRoute, private imagen:ImagenService){
    this.id=this.route.snapshot.params['id'];
    this.gestors=[];
    this.empresas=[];

  }

  /**
   * Inicializa el componente
   * @returns void
   */
  ngOnInit(): void {
    //Declaro los campos del formulario
    this.ModifForm=this.form.group({
    titulo: new FormControl('', [Validators.required, Validators.minLength(1)]),
    importe:new FormControl(0, [Validators.required]),
    foto:new FormControl(''),
    gestor:new FormControl(Validators.required),
    empresa:new FormControl(Validators.required)
    });
    if(this.publi_servicio.estado){
      this.tit="Consulta de Anuncio";
      this.ModifForm.controls['titulo'].disable();
      this.ModifForm.controls['importe'].disable();
      this.ModifForm.controls['foto'].disable();
      this.ModifForm.controls['gestor'].disable();
      this.ModifForm.controls['empresa'].disable();
      this.ModifForm.controls['titulo'].removeValidators([Validators.required, Validators.minLength(1)]);
      this.ModifForm.controls['importe'].removeValidators([Validators.required]);
      this.ModifForm.controls['gestor'].removeValidators(Validators.required);
      this.ModifForm.controls['empresa'].removeValidators(Validators.required);
    }else{
      this.tit="Modificación de Anuncio";
    }
    //Busco el registro por su id para traer la info
    this.publi_servicio.leer(this.id).subscribe((data)=>{
      this.ModifForm.controls['titulo'].setValue(data.titulo);
      this.ModifForm.controls['importe'].setValue(data.importe);
      this.gestor_id=data.gestor_id;
      this.empresa_id=data.empresa_id;
      this.ModifForm.controls['gestor'].setValue(this.gestor_id);
      this.ModifForm.controls['empresa'].setValue(this.empresa_id);
      //Se cargan los dos comboBox (Gestor y Empresa)
      this.gestor_servicio.get().subscribe((data)=>{
        for(let i=0; i<data.length;i++){
          let gestor=new Gestors();
          gestor.id=data[i].id;
          gestor.nombre=data[i].nombre;
          this.gestors.push(gestor);
        }
      })
      this.empresa_servicio.get().subscribe((data)=>{
        for(let i=0; i<data.length;i++){
          let empresa=new Empresas();
          empresa.id=data[i].id;
          empresa.nombre=data[i].nombre;
          this.empresas.push(empresa);
        }
      })
    })
  }

  /**Se les da un nombre descriptivo a los campos, a la hora de que sea más cómodo validarlos */
  get titulo():FormControl {
    return this.ModifForm.get('titulo') as FormControl;
  }

  get gestor():FormControl {
    return this.ModifForm.get('gestor') as FormControl;
  }

  get empresa():FormControl {
    return this.ModifForm.get('empresa') as FormControl;
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
    publi.id=this.id;
    publi.titulo=String(this.ModifForm.controls['titulo']?.value);
    publi.importe=parseInt(this.ModifForm.controls['importe']?.value);
    publi.gestor_id=this.ModifForm.controls['gestor'].value;
    publi.empresa_id=this.ModifForm.controls['empresa'].value;
    if(this.archivo!=undefined){
      publi.imagen=this.archivo.name;
    }else{
      publi.imagen="";
    }
    this.publi_servicio.update(publi).subscribe((data)=>{
      this.mensaje=data.mensaje;
      if(this.archivo!=undefined){
        this.subir();
      }
    });
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
