import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Map } from 'maplibre-gl';
import { MapModule } from 'src/app/modules/map/Map.module';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  map: Map | undefined;
  public lat!:number;
  public long!:number;
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  constructor(private coordenadas: MapModule){}

  ngOnInit(): void {
    this.lat=this.coordenadas.daCoordenadas()[0];
    this.long=this.coordenadas.daCoordenadas()[1];
  }

  /**
   * Después de cargarse la vista, con la latitud y logitud construye un objeto de tipo Map y lo visualiza
   * @return void
   */
  ngAfterViewInit():void {
    const initialState = { lng: this.long, lat: this.lat, zoom: 14 };
    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=XDoj3AWWWIvQF0Zbo21z`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    });
  }

  /**
   * Deja de verse el mapa
   * @return void
   */
  ngOnDestroy():void {
    this.map?.remove();
  }
}
