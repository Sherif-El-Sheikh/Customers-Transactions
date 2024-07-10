import { Skeleton } from "@/components/ui/skeleton";
export const SkeletonTable = ()=> {
    return (
    
    <div className="container  mx-auto mt-28 p-4">
            <Skeleton className="h-10 w-2/5 mr-4 mb-5" />
        <div className="flex gap-4 mb-5">
        <Skeleton className="h-10 w-2/5 mr-4" />
        <Skeleton className="h-10 w-2/5 mr-4" />
        </div>
        {Array(5)
            .fill(0)
            .map((_, index) => (
            <div key={index} className="flex mb-4 justify-center">
            <Skeleton className="h-10 w-3/5 mr-4" />
            <Skeleton className="h-10 w-3/5 mr-4" />
            <Skeleton className="h-10 w-3/5" />
            </div>
            ))}
    </div>
    )
}
