import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CpsService } from 'src/app/services/cps.service';
import { CiudadesService } from './../../../services/ciudades.service';
import { DireccionesService } from './../../../services/direcciones.service';
import { Direcciones } from '../../../models/direcciones.models';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { PaisesService } from 'src/app/services/paises.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CP } from 'src/app/models/cps.models';
import { Paises } from 'src/app/models/paises.models';
import { Provincias } from 'src/app/models/provincias.models';
import { Ciudades } from 'src/app/models/ciudades.models';
import { Empresas } from 'src/app/models/empresas.models';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Trabajadores } from 'src/app/models/trabajadores.models';

@Component({
  selector: 'app-empresa-modif',
  templateUrl: './empresa-modif.component.html',
  styleUrls: ['./empresa-modif.component.css']
})
export class EmpresaModifComponent {
  public titulo: string = 'Modificación de Empresa';
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
  public trabajadores!:Trabajadores[];
  public id!:number;
  public mensaje!:string;

  constructor(
    public paises_servicio: PaisesService,
    public provincia_servicio: ProvinciasService,
    public ciudad_servicio: CiudadesService,
    public cp_servicio: CpsService,
    private direccion: DireccionesService,
    public service: EmpresaService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.trabajadores=[];
    this.id=this.route.snapshot.params['id'];
    if(this.service.estado){
      this.formModifEmp.controls.nombre.removeValidators([Validators.required, Validators.minLength(1)]);
      this.formModifEmp.controls.nif.removeValidators([Validators.required, Validators.minLength(4), Validators.maxLength(15)]);
      this.formModifEmp.controls.calle.removeValidators([Validators.required, Validators.minLength(2)]);
      this.formModifEmp.controls.cp.removeValidators([Validators.required, Validators.minLength(5)]);
      this.formModifEmp.controls.ciudad.removeValidators([Validators.required, Validators.minLength(4)]);
      this.formModifEmp.controls.provincia.removeValidators([Validators.required, Validators.minLength(4)]);
      this.formModifEmp.controls.pais.removeValidators([Validators.required, Validators.minLength(4)]);
      this.formModifEmp.get('nombre')?.disable();
      this.formModifEmp.get('nif')?.disable();
      this.formModifEmp.get('calle')?.disable();
      this.formModifEmp.get('km')?.disable();
      this.formModifEmp.get('numero')?.disable();
      this.formModifEmp.get('bloque')?.disable();
      this.formModifEmp.get('piso')?.disable();
      this.formModifEmp.get('letra')?.disable();
      this.formModifEmp.get('cp')?.disable();
      this.formModifEmp.get('ciudad')?.disable();
      this.formModifEmp.get('provincia')?.disable();
      this.formModifEmp.get('pais')?.disable();
      this.titulo="Consultar Empresa";
    }else{
      this.titulo="Modificar Empresa";
    }
  }

  ngOnInit(): void {
    this.service.leer(this.id).subscribe((respuesta)=>{
      this.formModifEmp.controls['nombre'].setValue(respuesta.nombre);
      this.formModifEmp.controls['nif'].setValue(respuesta.nif);
      this.formModifEmp.controls['calle'].setValue(respuesta.calle);
      this.formModifEmp.controls['numero'].setValue(respuesta.numero);
      this.formModifEmp.controls['km'].setValue(respuesta.km);
      this.formModifEmp.controls['bloque'].setValue(respuesta.bloque);
      this.formModifEmp.controls['piso'].setValue(respuesta.piso);
      this.formModifEmp.controls['letra'].setValue(respuesta.letra);
      this.formModifEmp.controls['cp'].setValue(String(respuesta.cp));
      this.formModifEmp.controls['ciudad'].setValue(respuesta.ciudad);
      this.formModifEmp.controls['provincia'].setValue(respuesta.provincia);
      this.formModifEmp.controls['pais'].setValue(respuesta.pais);
      this.direccion_id=respuesta.direccione_id;
      for (let i of respuesta.trabajadores) {
        let trab=new Trabajadores();
        let id_trab=i.id;
        let nom_trab=i.nombre;
        let ape1_trab=i.apellido1;
        let ape2_trab=i.apellido2;
        let nif_trab=i.nif;
        trab.id=id_trab;
        trab.nombre=nom_trab;
        trab.apellido1=ape1_trab;
        trab.apellido2=ape2_trab;
        trab.nif=nif_trab;
        this.trabajadores.push(trab);
      }
    })
  }

  /**Defino los campos del formulario con las validaciones */
  public formModifEmp = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(1)]),
    nif: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
    calle: new FormControl('', [Validators.required, Validators.minLength(2)]),
    km: new FormControl(''),
    numero: new FormControl(''),
    bloque: new FormControl(''),
    piso: new FormControl(''),
    letra: new FormControl(''),
    cp: new FormControl('', [Validators.required, Validators.minLength(5)]),
    ciudad: new FormControl('', [Validators.required, Validators.minLength(4)]),
    provincia: new FormControl('', [Validators.required,Validators.minLength(4),]),
    pais: new FormControl('', [Validators.required, Validators.minLength(4)]),
    tablaTrab:new FormControl()
  });

  /**Se les da un nombre descriptivo a los campos, a la hora de que sea más cómodo validarlos */
  get nombre():FormControl {
    return this.formModifEmp.get('nombre') as FormControl;
  }

  get nif():FormControl {
    return this.formModifEmp.get('nif') as FormControl;
  }

  get calle():FormControl {
    return this.formModifEmp.get('calle') as FormControl;
  }

  get cp():FormControl {
    return this.formModifEmp.get('cp') as FormControl;
  }

  get ciudad():FormControl {
    return this.formModifEmp.get('ciudad') as FormControl;
  }

  get provincia():FormControl {
    return this.formModifEmp.get('provincia') as FormControl;
  }

  get pais():FormControl {
    return this.formModifEmp.get('pais') as FormControl;
  }

  /**Cierra el formulario
   * @returns void
  */
  cerrar():void {
    this.router.navigate(['/empresa']);
    return;
  }

  /**Modifica la empresa
   * @returns void
  */
  guardar():void {
    let empre=new Empresas();
    empre.nombre = String(this.formModifEmp.controls['nombre']?.value);
    empre.nif = String(this.formModifEmp.controls['nif']?.value);
    empre.direccione_id = this.direccion_id;
    empre.id=this.id;
    this.service.update(empre).subscribe((data) => {
      this.mensaje=data.mensaje;
    });
  }

  /**
   * Dirección, si se encuentra, trae cp, ciudad, provincia y país
   * @returns void
   */
  buscarDireccion():void {
    let calle = String(this.formModifEmp.controls['calle']?.value);
    let km = String(this.formModifEmp.controls['km']?.value);
    let numero = String(this.formModifEmp.controls['numero']?.value);
    let bloque = String(this.formModifEmp.controls['bloque'].value);
    let piso = String(this.formModifEmp.controls['piso'].value);
    let letra = String(this.formModifEmp.controls['letra'].value);
    this.direccion.filtrar(calle, km, numero, bloque, piso, letra).subscribe((respuesta) => {
      if (!respuesta.status) {
        //Pongo a true para dar de alta la dirección
        this.alta_direccion = true;
        this.direccion_id=0;
        this.formModifEmp.controls['cp'].setValue('');
        this.formModifEmp.controls['ciudad'].setValue('');
        this.formModifEmp.controls['provincia'].setValue('');
        this.formModifEmp.controls['pais'].setValue('');
      }else {
        this.direccion_id = respuesta.id;
        this.formModifEmp.controls['cp'].setValue(String(respuesta.cp));
        this.formModifEmp.controls['ciudad'].setValue(respuesta.ciudad);
        this.formModifEmp.controls['provincia'].setValue(respuesta.provincia);
        this.formModifEmp.controls['pais'].setValue(respuesta.pais);
      }
    });
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
      direccion.calle=String(this.formModifEmp.controls['calle']?.value);
      direccion.km=String(this.formModifEmp.controls['km']?.value);
      direccion.numero=String(this.formModifEmp.controls['numero']?.value);
      direccion.bloque=String(this.formModifEmp.controls['bloque'].value);
      direccion.piso=String(this.formModifEmp.controls['piso'].value);
      direccion.letra=String(this.formModifEmp.controls['letra'].value);
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
   * @preturns void
   */
  buscarCp($event: any):void {
    let cp = parseInt($event.target.value);
    this.cp_servicio.filtrar(cp).subscribe((respuesta)=>{
      if (!respuesta.status) {
      //Pongo a true para dar de alta el CP
        this.alta_cp = true;
        this.formModifEmp.controls['ciudad'].setValue('');
        this.formModifEmp.controls['provincia'].setValue('');
        this.formModifEmp.controls['pais'].setValue('');
      }else {
        this.cp_id = respuesta.id;
        this.crearDireccion(this.cp_id);
        this.formModifEmp.controls['ciudad'].setValue(respuesta.ciudad);
        this.formModifEmp.controls['provincia'].setValue(respuesta.provincia);
        this.formModifEmp.controls['pais'].setValue(respuesta.pais);
      }
    });
  }

  /**
   * Crea el código postal, en caso de que no exista y guarda su id   *
   * @param ciudad_id
   * @returns void
   */
  crearCp(ciudad_id:number):void{
    if (this.alta_cp) {
      let cp=new CP();
      cp.numero=parseInt(String(this.formModifEmp.controls['cp']?.value));
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
      if (!respuesta.status) {
        //Pongo a true para dar de alta la ciudad
        this.alta_ciudad = true;
        this.formModifEmp.controls['provincia'].setValue('');
        this.formModifEmp.controls['pais'].setValue('');
      }else {
        this.ciudad_id = respuesta.id;
        this.formModifEmp.controls['provincia'].setValue(respuesta.provincia);
        this.formModifEmp.controls['pais'].setValue(respuesta.pais);
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
      ciudad.ciudad=String(this.formModifEmp.controls['ciudad'].value);
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
        this.formModifEmp.controls['pais'].setValue('');
      }else {
        this.provincia_id = respuesta.id;
        this.formModifEmp.controls['pais'].setValue(respuesta.pais);
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
        provin.nombre=String(this.formModifEmp.controls['provincia'].value);
        provin.codigo=parseInt(String(this.formModifEmp.controls['cp'].value).substring(0,2));
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
  buscarPais($event: any):void {
    let pais = $event.target.value;
    this.paises_servicio.buscarPorNombre(pais).subscribe((respuesta) => {
      if (!respuesta.status) {
        let pais=new Paises();
        pais.nombre=String(this.formModifEmp.controls['pais'].value);
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
