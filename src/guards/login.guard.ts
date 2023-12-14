export const loginGuard=()=>{
  let valores=JSON.parse(String(localStorage.getItem('token')));
  let rol=valores.rol;
  //Si el rol es 1, administrador, deja acceder a todas las opciones de menú
  if(rol==1){
    return true;
  }else{
    return false;
  }
}
