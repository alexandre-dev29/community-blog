import {AspectRatio} from "@/components/ui/aspect-ratio"
import {ScrollArea} from "@/components/ui/scroll-area"
import {Separator} from "@/components/ui/separator"
import {Skeleton} from "@/components/ui/skeleton"

export default async function IndexPage() {
  return (
    <section className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_400px]">
      <div className="mx-auto w-[80%] min-w-0 md:w-[70%]">
        <div className="space-y-2">
          <Skeleton className="h-5 w-full  bg-gray-100 dark:bg-gray-800"/>
          <Skeleton className="h-5 w-3/4  bg-gray-100 dark:bg-gray-800"/>
          <Skeleton className="h-5 w-3/4  bg-gray-100 dark:bg-gray-800"/>
          <Skeleton className="h-5 w-3/4  bg-gray-100 dark:bg-gray-800"/>
        </div>
        <Separator className="my-4 md:my-6"/>
        <div>
          <div
            className={
              "col-span-12 w-full md:order-2 md:col-start-8 md:col-end-12 md:block"
            }
          >
            <AspectRatio ratio={16 / 9}>
              <Skeleton className="h-full w-full bg-gray-200 dark:bg-gray-800"/>
            </AspectRatio>
          </div>
          <Skeleton className="h-5 w-full  bg-gray-100 dark:bg-gray-800"/>
          <Skeleton className="h-5 w-full  bg-gray-100 dark:bg-gray-800"/>
          <Skeleton className="h-5 w-full  bg-gray-100 dark:bg-gray-800"/>
          <Skeleton className="h-5 w-full  bg-gray-100 dark:bg-gray-800"/>
          <Skeleton className="h-5 w-full  bg-gray-100 dark:bg-gray-800"/>
          <Skeleton className="h-5 w-full  bg-gray-100 dark:bg-gray-800"/>
        </div>
      </div>
      <div className="hidden text-sm xl:block">
        <div className="sticky right-16 top-16 -mt-10 h-[calc(100vh-4rem)] overflow-hidden pt-6">
          <ScrollArea className="pb-10">
            <Skeleton className="h-5 w-full  bg-gray-100 dark:bg-gray-800"/>
            <Skeleton className="h-5 w-full  bg-gray-100 dark:bg-gray-800"/>
            <Skeleton className="h-5 w-full  bg-gray-100 dark:bg-gray-800"/>
            <Skeleton className="h-5 w-full  bg-gray-100 dark:bg-gray-800"/>
            <Skeleton className="h-5 w-full  bg-gray-100 dark:bg-gray-800"/>
            <Skeleton className="h-5 w-full  bg-gray-100 dark:bg-gray-800"/>
            <Skeleton className="h-5 w-full  bg-gray-100 dark:bg-gray-800"/>
            <Skeleton className="h-5 w-full  bg-gray-100 dark:bg-gray-800"/>
          </ScrollArea>
        </div>
      </div>
    </section>
  )
}
