import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-3 md:p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1 flex-1 w-full">
            {/* Name skeleton */}
            <Skeleton className="h-5 w-32 md:w-40" />
            {/* Username and email skeleton */}
            <Skeleton className="h-4 w-48 md:w-64" />
            {/* Last access skeleton */}
            <Skeleton className="h-3 w-40 md:w-48" />
          </div>
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
            {/* Status badge skeleton */}
            <Skeleton className="h-5 w-16" />
            {/* Role badge skeleton */}
            <Skeleton className="h-5 w-16" />
            {/* Action buttons skeleton */}
            <div className="flex gap-1">
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
