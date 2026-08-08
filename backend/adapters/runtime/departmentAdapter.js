export default class DepartmentAdapter{
     static adapt(state){
          return{
          name: state.name,
          head:state.head
          };
          

     };
}