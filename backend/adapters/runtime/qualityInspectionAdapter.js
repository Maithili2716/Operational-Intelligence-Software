

export default class QualityInspectionAdapter{
     static adapt(state){
          return{
          status:
                state.schedule?.status ??
                state.quality?.status ??
                state.resource?.status ??
                state.status,
          inspector: state.inspector,
          goodPeices:state.quality.goodPeices ,
          
          };
     };
}