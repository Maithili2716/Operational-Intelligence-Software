export default class WarehouseAdapter{
     static adapt(state){
          return{
          name: state.name,
          location:state.location,
          capacity:state.capacity
          };
     };
}