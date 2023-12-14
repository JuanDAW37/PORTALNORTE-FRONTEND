import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpsService } from 'src/app/services/cps.service';
import { CiudadesService } from 'src/app/services/ciudades.service';
import { DireccionesService } from 'src/app/services/direcciones.service';
import { Direcciones } from 'src/app/models/direcciones.models';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { PaisesService } from 'src/app/services/paises.service';
import { CP } from 'src/app/models/cps.models';
import { Paises } from 'src/app/models/paises.models';
import { Provincias } from 'src/app/models/provincias.models';
import { Ciudades } from 'src/app/models/ciudades.models';
import { Observable } from 'rxjs';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class DireccionesModule {
  public direc=new Direcciones();
  constructor(private direccionS: DireccionesService, private cpsS :CpsService, private ciudadS :CiudadesService,
    private provService: ProvinciasService, private paisService: PaisesService){}

  /**
   * Busca la dirección recibiendo como paŕametro un objeto de tipo Direcciones y
    * en caso de encontrarla, devuelve un objeto de tipo Dirección y una bandera a false
    * para no crear la dirección
    * @param direccion
    */
  buscarDireccion(direccion: Direcciones){
    this.direccionS.filtrar(direccion.calle, direccion.km, direccion.numero, direccion.bloque, direccion.piso, direccion.letra)
      .subscribe((resultado)=>{
        console.log("Respuesta de la dirección", resultado);
        if(resultado.status){
          this.direc.calle=resultado.calle;
          this.direc.km=resultado.km;
          this.direc.numero=resultado.numero;
          this.direc.bloque=resultado.bloque;
          this.direc.piso=resultado.piso;
          this.direc.letra=resultado.letra;
        }else{
          this.direc.calle="";
          this.direc.km="";
          this.direc.numero="";
          this.direc.bloque="";
          this.direc.piso="";
          this.direc.letra="";
        }
      });
  }

  /**
   * Busca el Código Postal recibiendo como paŕametro un objeto de tipo CP y
   * en caso de encontrarlo, devuelve un objeto de tipo CP y una bandera a false
   * para no crear el Cp. Si no lo encuentra devuelve un objeto CP vacío
   * y una bandera a true, para crearlo.
   * @param CP codP
   * @returns CP cp
   */
  public buscarCp(codP: CP){
    let cp=new CP();
    this.cpsS.filtrar(codP.numero).subscribe((resultado)=>{
      console.log("Respuesta de CP ", resultado)
    })
    return cp;
  }

  /**
   * Busca la Ciudad recibiendo como paŕametro un objeto de tipo Ciudad y
   * en caso de encontrarla, devuelve un objeto de tipo Ciudad y una bandera a false
   * para no crear la ciudad. Si no la encuentra devuelve un objeto Ciudad vacío, con la
   * bandera a true para crearla
   * @param Ciudades ciudad
   * @returns Ciudades ciud
   */
  public buscarCiudad(ciudad: Ciudades){
    let ciud=new Ciudades();
    this.ciudadS.filtrar(ciudad.ciudad).subscribe((resultado)=>{
      console.log("Respuesta de Ciudad ", resultado);
    })
    return ciud;
  }

  /**
   * Busca la Provincia recibiendo como paŕametro un objeto de tipo Provincia y
   * en caso de encontrarla, devuelve un objeto de tipo Provincia y una bandera a false
   * para no crear la provincia. Si no la encuentra devuelve un objeto Provincia vacío, con la
   * bandera a true para crearla
   * @param Provincias provin
   * @returns Provincias prov
   */
  public buscarProvincia(provin: Provincias){
    let prov= new Provincias();
    this.provService.buscarPorNombre(provin.nombre).subscribe((resultado)=>{
      console.log("Respuesta de Provincia ", resultado);
    });
    return prov;
  }

  /**
   * Busca el País recibiendo como paŕametro un objeto de tipo País y
   * en caso de encontrarlo, devuelve un objeto de tipo País y una bandera a false
   * para no crearlo. Si no lo encuentra devuelve un objeto País vacío, con la
   * bandera a true para crearlo
   * @param Paises pais
   * @returns Paises pa
   */
  public buscaPais(pais: Paises){
    let pa=new Paises();
    this.paisService.buscarPorNombre(pais.nombre).subscribe((resultado)=>{
      console.log("Respuesta de Pais ", resultado)
    })
    return pa;
  }
}
