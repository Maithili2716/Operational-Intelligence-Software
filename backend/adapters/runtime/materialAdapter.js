
export default class MaterialAdapter{
     static adapt(state){
          return{
          name: state.name,
          version:state.materialCodeVersion,
          unit:state.unit,
          };
     };
}