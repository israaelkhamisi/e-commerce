

import Icon from "src/components/shared/Icon";

export default function IconInput({
  
icon,
  
end,
  
...props
}: React.ComponentProps<"input"> & {
  
icon: string;
  
end?: React.ReactNode;
}) {
  
return (
    
<div className="relative">
      
<Icon
        
src={icon}
        
width={20}
        
height={16}
        
className="absolute start-4 top-1/2 -translate-y-1/2"
      
/>
      
<input
        
id={props.name}
        
{...props}
        
className="w-full rounded-xl border-2 border-gray-200 bg-transparent py-3.5 ps-[50px] pe-[50px] text-base font-medium text-gray-700 outline-none placeholder:text-gray-700/50 focus:border-green-600 dark:border-gray-700 dark:text-gray-100"
      
/>
      
{end && <div className="absolute end-4 top-1/2 -translate-y-1/2">{end}</div>}
    
</div>
  
);
}
