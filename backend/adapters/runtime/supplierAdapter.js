export default class SupplierAdapter{
     static adapt(state){
          return{
          status:
                state.schedule?.status ??
                state.quality?.status ??
                state.resource?.status ??
                state.status,
          rating:state.rating,
          leadTime: state.leadTime
          
          };
     };
}