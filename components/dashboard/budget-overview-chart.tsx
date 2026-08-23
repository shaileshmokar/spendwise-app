import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BudgetOverview } from "@/type/dashboard"
import { formatCurrency } from "@/lib/utils"
import { Separator } from "../ui/separator"

type BudgetOverviewProps = {
  data: BudgetOverview[]
}

export function BudgetOverviewChart({ data }: BudgetOverviewProps) {
  return (
    <Card className="h-full">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Budget Overview</CardTitle>

        <button className="text-sm font-medium text-primary hover:underline">
          View All
        </button>
      </CardHeader>
      <Separator />

      <CardContent className="space-y-4">
        {data.map((item) => {
          const Icon = item.icon

          return (
            <div key={item.category} className="flex items-start gap-3">
              {/* Icon */}
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${item.bgClass}`}
              >
                <Icon className={`size-5 ${item.iconClass}`} />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                {/* Top row */}
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-medium">
                    {item.category}
                  </span>

                  <div className="flex shrink-0 items-center gap-1 text-xs">
                    <span className="font-semibold">
                      {formatCurrency(item.spent)}
                    </span>

                    <span className="text-muted-foreground">
                      / {formatCurrency(item.budget)}
                    </span>
                  </div>
                </div>

                {/* Progress row */}
                <div className="mt-2 flex items-center gap-3">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full ${item.progressClass}`}
                      style={{
                        width: `${item.percentage}%`,
                      }}
                    />
                  </div>

                  <span className="w-8 text-right text-xs font-medium">
                    {item.percentage}%
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

// import { motion } from "framer-motion"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { BudgetOverview } from "@/type/dashboard"
// import { formatCurrency } from "@/lib/utils"

// type BudgetOverviewProps = {
//   data: BudgetOverview[]
// }

// export function BudgetOverviewChart({ data }: BudgetOverviewProps) {
//   // Animation variants for container (stagger children)
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.08, // Delay between each item animation
//         delayChildren: 0.1, // Initial delay before animations start
//       },
//     },
//   }

//   // Animation variants for each item
//   const itemVariants = {
//     hidden: {
//       opacity: 0,
//       y: 20, // Start from 20px below
//     },
//     visible: {
//       opacity: 1,
//       y: 0, // End at original position
//       transition: {
//         type: "spring",
//         stiffness: 400,
//         damping: 25,
//         duration: 0.5,
//       },
//     },
//   }

//   return (
//     <Card className="h-full">
//       <CardHeader className="flex items-center justify-between">
//         <CardTitle>Budget Overview</CardTitle>

//         <button className="text-sm font-medium text-primary hover:underline">
//           View All
//         </button>
//       </CardHeader>

//       <CardContent className="space-y-4">
//         {/* Motion container with stagger children */}
//         <motion.div
//           className="space-y-4"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           viewport={{ once: true, margin: "-50px" }} // Animates when in view
//         >
//           {data.map((item) => {
//             const Icon = item.icon

//             return (
//               <motion.div
//                 key={item.category}
//                 className="flex items-start gap-3"
//                 // variants={itemVariants}
//                 // Optional: add whileHover effect
//                 whileHover={{
//                   scale: 1.02,
//                   transition: { duration: 0.2 },
//                 }}
//               >
//                 {/* Icon */}
//                 <div
//                   className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${item.bgClass}`}
//                 >
//                   <Icon className={`size-5 ${item.iconClass}`} />
//                 </div>

//                 {/* Content */}
//                 <div className="min-w-0 flex-1">
//                   {/* Top row */}
//                   <div className="flex items-center justify-between gap-2">
//                     <span className="truncate text-sm font-medium">
//                       {item.category}
//                     </span>

//                     <div className="flex shrink-0 items-center gap-1 text-xs">
//                       <span className="font-semibold">
//                         {formatCurrency(item.spent)}
//                       </span>

//                       <span className="text-muted-foreground">
//                         / {formatCurrency(item.budget)}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Progress row */}
//                   <div className="mt-2 flex items-center gap-3">
//                     <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
//                       <motion.div
//                         className={`h-full rounded-full ${item.progressClass}`}
//                         initial={{ width: 0 }}
//                         animate={{ width: `${item.percentage}%` }}
//                         transition={{
//                           duration: 0.8,
//                           delay: 0.2,
//                           ease: "easeOut",
//                         }}
//                       />
//                     </div>

//                     <motion.span
//                       className="w-8 text-right text-xs font-medium"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ delay: 0.4 }}
//                     >
//                       {item.percentage}%
//                     </motion.span>
//                   </div>
//                 </div>
//               </motion.div>
//             )
//           })}
//         </motion.div>
//       </CardContent>
//     </Card>
//   )
// }
