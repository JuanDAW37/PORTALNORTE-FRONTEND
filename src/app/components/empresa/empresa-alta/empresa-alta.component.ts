import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CpsService } from 'src/app/services/cps.service';
import { CiudadesService } from './../../../services/ciudades.service';
import { DireccionesService } from './../../../services/direcciones.service';
import { Direcciones } from '../../../models/direcciones.models';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { PaisesService } from 'src/app/services/paises.service';
import { Router } from '@angular/router';
import { CP } from 'src/app/models/cps.models';
import { Paises } from 'src/app/models/paises.models';
import { Provincias } from 'src/app/models/provincias.models';
import { Ciudades } from 'src/app/models/ciudades.models';
import { Empresas } from 'src/app/models/empresas.models';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-empresa-alta',
  templateUrl: './empresa-alta.component.html',
  styleUrls: ['./empresa-alta.component.css'],
})
export class EmpresaAltaComponent {
  public titulo: string = 'Alta de Empresa';
  public direccion_id!: number;
  public alta_direccion: boolean = false;
  public alta_cp: boolean = false;
  public cp_id!: number;
  public alta_ciudad: boolean = false;
  public ciudad_id!: number;
  public alta_provincia: boolean = false;
  public provincia_id!: number;
  public alta_pais: boolean = false;
  public pais_id!: number;

  /**Defino los campos del formulario con las validaciones */
  public formAltaEmp = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(1)]),
    nif: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(15),
    ]),
    calle: new FormControl('', [Validators.required, Validators.minLength(2)]),
    km: new FormControl(''),
    numero: new FormControl(''),
    bloque: new FormControl(''),
    piso: new FormControl(''),
    letra: new FormControl(''),
    cp: new FormControl('', [Validators.required, Validators.minLength(5)]),
    ciudad: new FormControl('', [Validators.required, Validators.minLength(4)]),
    provincia: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    pais: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  constructor(
    public paises_servicio: PaisesService,
    public provincia_servicio: ProvinciasService,
    public ciudad_servicio: CiudadesService,
    public cp_servicio: CpsService,
    private direccion: DireccionesService,
    public service: EmpresaService,
    private router: Router
  ) {}

  /**Se les da un nombre descriptivo a los campos, a la hora de que sea más cómodo validarlos */
  get nombre():FormControl {
    return this.formAltaEmp.get('nombre') as FormControl;
  }

  get nif():FormControl {
    return this.formAltaEmp.get('nif') as FormControl;
  }

  get calle():FormControl {
    return this.formAltaEmp.get('calle') as FormControl;
  }

  get cp():FormControl {
    return this.formAltaEmp.get('cp') as FormControl;
  }

  get ciudad():FormControl {
    return this.formAltaEmp.get('ciudad') as FormControl;
  }

  get provincia():FormControl {
    return this.formAltaEmp.get('provincia') as FormControl;
  }

  get pais():FormControl {
    return this.formAltaEmp.get('pais') as FormControl;
  }

  /**Cierra el formulario
   * @returns void
  */
  cerrar():void {
    this.router.navigate(['/empresa']);
  }

  /**Da de alta la empresa
   * @returns void
   */
  guardar():void {
    let empre=new Empresas();
    empre.nombre = String(this.formAltaEmp.controls['nombre']?.value);
    empre.nif = String(this.formAltaEmp.controls['nif']?.value);
    empre.direccione_id = this.direccion_id;
    this.service.insert(empre).subscribe(() => {});
    this.service.get().subscribe(()=>{});
    this.router.navigate(['/empresa']);
  }

  /**
   * Dirección, si se encuentra, trae cp, ciudad, provincia y país
   * @returns void
   */
  buscarDireccion():void {
    let calle = String(this.formAltaEmp.controls['calle']?.value);
    let km = String(this.formAltaEmp.controls['km']?.value);
    let numero = String(this.formAltaEmp.controls['numero']?.value);
    let bloque = String(this.formAltaEmp.controls['bloque'].value);
    let piso = String(this.formAltaEmp.controls['piso'].value);
    let letra = String(this.formAltaEmp.controls['letra'].value);
    this.direccion.filtrar(calle, km, numero, bloque, piso, letra).subscribe((respuesta) => {
        if (!respuesta.status) {
          //Pongo a true para dar de alta la dirección
          this.alta_direccion = true;
          this.direccion_id=0;
          this.formAltaEmp.controls['cp'].setValue('');
          this.formAltaEmp.controls['ciudad'].setValue('');
          this.formAltaEmp.controls['provincia'].setValue('');
          this.formAltaEmp.controls['pais'].setValue('');
        }else {
          this.direccion_id = respuesta.id;
          console.log("ID", this.direccion_id, respuesta.id);
          this.formAltaEmp.controls['cp'].setValue(String(respuesta.cp));
          this.formAltaEmp.controls['ciudad'].setValue(respuesta.ciudad);
          this.formAltaEmp.controls['provincia'].setValue(respuesta.provincia);
          this.formAltaEmp.controls['pais'].setValue(respuesta.pais);
        }
      })
    }

  /**
   * Si no existe la dirección la crea y guarda el id
   * @param cp_id
   * @returns void
   */
  crearDireccion(cp_id:number):void{
    //Pregunto si se encontró antes la dirección, para darla o no de alta
    if (this.alta_direccion) {
      let direccion=new Direcciones();
      direccion.calle=String(this.formAltaEmp.controls['calle']?.value);
      direccion.km=String(this.formAltaEmp.controls['km']?.value);
      direccion.numero=String(this.formAltaEmp.controls['numero']?.value);
      direccion.bloque=String(this.formAltaEmp.controls['bloque'].value);
      direccion.piso=String(this.formAltaEmp.controls['piso'].value);
      direccion.letra=String(this.formAltaEmp.controls['letra'].value);
      direccion.cp_id=cp_id;
      this.direccion.insert(direccion).subscribe((alta_dir)=>{
        this.direccion_id=alta_dir.id;
        this.alta_direccion=false;
      });
    }
  }

  /**
   * Inicializa las flags de dirección y cp y llama a buscar dirección
   * @returns void
   */
  entraCp():void{
    this.alta_direccion=false;
    this.buscarDireccion();
    this.alta_cp=false;
  }

  /**Cp, si se encuentra, trae la ciudad, provincia y país y crea la dirección
   * @param $event
   * @returns void
   */
  buscarCp($event: any):void {
    let cp = parseInt($event.target.value);
    this.cp_servicio.filtrar(cp).subscribe((respuesta)=>{
      if (!respuesta.status) {
      //Pongo a true para dar de alta el CP
        this.alta_cp = true;
        this.formAltaEmp.controls['ciudad'].setValue('');
        this.formAltaEmp.controls['provincia'].setValue('');
        this.formAltaEmp.controls['pais'].setValue('');
      }else {
        this.cp_id = respuesta.id;
        this.crearDireccion(this.cp_id);
        this.formAltaEmp.controls['ciudad'].setValue(respuesta.ciudad);
        this.formAltaEmp.controls['provincia'].setValue(respuesta.provincia);
        this.formAltaEmp.controls['pais'].setValue(respuesta.pais);
      }
    });
  }

  /**
   * Crea el código postal, en caso de que no exista y guarda su id
   * @param ciudad_id
   * @returns void
   */
  crearCp(ciudad_id:number):void{
    if (this.alta_cp) {
      let cp=new CP();
      cp.numero=parseInt(String(this.formAltaEmp.controls['cp']?.value));
      cp.ciudade_id=ciudad_id;
      this.cp_servicio.insert(cp).subscribe((alta_cp)=>{
        this.cp_id=alta_cp.id;
        this.alta_cp=false;
      });
    }
  }

  /**
   * Inicializa la flag para ciudad
   * @returns void
   */
  entraCiudad():void{
    this.alta_ciudad=false;
  }

  /**Ciudad, si se encuentra, trae la provincia y país, y crea el cp y la dirección
   * @param $event
   * @returns void
   */
  buscarCiudad($event: any):void {
    let ciudad = $event.target.value;
    this.ciudad_servicio.filtrar(ciudad).subscribe((respuesta) => {
      console.log("CIUDAD=>", respuesta);
      if (!respuesta.status) {
        //Pongo a true para dar de alta la ciudad
        this.alta_ciudad = true;
        this.formAltaEmp.controls['provincia'].setValue('');
        this.formAltaEmp.controls['pais'].setValue('');
      }else {
        this.ciudad_id = respuesta.id;
        this.formAltaEmp.controls['provincia'].setValue(respuesta.provincia);
        this.formAltaEmp.controls['pais'].setValue(respuesta.pais);
        if (this.alta_cp) {
            this.crearCp(this.ciudad_id);
            this.crearDireccion(this.cp_id);
        }
      }
    });
  }

  /**
   * Crea la ciudad con el código de provincia
   * @param provin_id
   * @returns void
   */
  crearCiudad(provin_id:number):void{
    if(this.alta_ciudad){
      let ciudad=new Ciudades();
      ciudad.ciudad=String(this.formAltaEmp.controls['ciudad'].value);
      ciudad.provincia_id=provin_id;
      this.ciudad_servicio.insert(ciudad).subscribe((ins_ciu)=>{
        this.ciudad_id=ins_ciu.id;
        this.alta_ciudad=false;
      });
    }
  }

  /**
   * Incializa la flag de provincia
   * @returns void
   */
  entraProvincia():void{
    this.alta_provincia=false;
  }

  /**Provincia, si se encuentra trae el país
   * @param $event
   * @returns void
   */
  buscarProvincia($event: any):void {
    let provincia = $event.target.value;
    this.provincia_servicio.buscarPorNombre(provincia).subscribe((respuesta) => {
      if (!respuesta.status) {
        //Pongo a true para dar de alta la provincia
        this.alta_provincia = true;
        this.formAltaEmp.controls['pais'].setValue('');
      }else {
        this.provincia_id = respuesta.id;
        this.formAltaEmp.controls['pais'].setValue(respuesta.pais);
        this.crearCiudad(this.provincia_id);
        this.crearCp(this.ciudad_id);
        this.crearDireccion(this.cp_id);
        }
      });
    }

    /**
     * Crea la provincia con el código del país
     * @param pais_id
     * @returns void
     */
    crearProvincia(pais_id:number):void{
      if(this.alta_provincia){
        let provin=new Provincias();
        provin.paise_id=pais_id;
        provin.nombre=String(this.formAltaEmp.controls['provincia'].value);
        provin.codigo=parseInt(String(this.formAltaEmp.controls['cp'].value).substring(0,2));
        this.provincia_servicio.insert(provin).subscribe((datos)=> {
          this.provincia_id=datos.id;
          this.alta_provincia=false;
        });
      }
    }

    /**
     * Inicializa la flag del país
     * @returns void
     */
    entraPais():void{
      this.alta_pais=false;
    }

  /**País, si no se encuentra, lo da de alta
   * @param $event
   * @returns void
   */
  buscarPais($event: any):void{
    let pais = $event.target.value;
    this.paises_servicio.buscarPorNombre(pais).subscribe((respuesta) => {
      if (!respuesta.status) {
        let pais=new Paises();
        pais.nombre=String(this.formAltaEmp.controls['pais'].value);
        this.paises_servicio.insert(pais).subscribe((data)=>{
          this.pais_id=data.id;
          this.crearProvincia(this.pais_id);
          this.crearCiudad(this.provincia_id);
          this.crearCp(this.ciudad_id);
          this.crearDireccion(this.cp_id);
        })
      }else {
        this.pais_id = respuesta.id;
        this.crearProvincia(this.pais_id);
        this.crearCiudad(this.provincia_id);
        this.crearCp(this.ciudad_id);
        this.crearDireccion(this.cp_id);
      }
    });
  }
}
