export default class InventoryAdapter{
     static adapt(state){
          return{
          status:
                state.schedule?.status ??
                state.quality?.status ??
                state.resource?.status ??
                state.status,
          availableQuantity: state.resource?.available,
          requiredQuantity: state.resource?.required  
          };
     };
}