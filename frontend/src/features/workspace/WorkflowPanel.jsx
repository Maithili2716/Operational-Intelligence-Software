//Right Workspace Panel

import FadeIn from "../Inspection/FadeIn"; 

export default function WorkflowPanel(
     { inspection, children }) 
{ 
     return ( 
<aside className=" h-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 " >
      { inspection && ( 
          <FadeIn> 
          <div className=" h-full overflow-y-auto px-5 py-5 " > 
               {children} 
               </div> 
               </FadeIn> ) }
                </aside> );
                 }