"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function FeaturesSection() {
   return (
      <div className="flex justify-center">
         <div className="w-full max-w-screen-xl bg-white flex flex-col">
            {/* First Section - Image Left, Text Right */}
            <motion.section
               initial={{ opacity: 0, x: -100 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8, ease: "easeOut" }}
               viewport={{ once: true }}
               className="w-full py-16 md:py-24 bg-gray-50"
            >
               <div className="container mx-auto px-4 md:px-6">
                  <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
                     <div className="relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-[#2B1F76] to-[#4733B5]">
                        <Image
                           src="/gatherSectionThree.png"
                           alt="Serendipitous chat interaction"
                           className="object-cover"
                           fill
                           sizes="(max-width: 768px) 100vw, 50vw"
                        />
                     </div>
                     <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-2">
                           <p className="text-sm font-medium tracking-wide text-purple-600 uppercase">
                              Serendipitous moments
                           </p>
                           <h2 className="text-3xl font-bold tracking-tighter text-[#2B1F76] sm:text-4xl md:text-5xl">
                              Talk naturally throughout your day
                           </h2>
                           <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                              Stop by someone&apos;s desk, say hi in the
                              hallway, and bring back water cooler chats. No
                              scheduling required.
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </motion.section>

            {/* Second Section - Text Left, Image Right */}
            <motion.section
               initial={{ opacity: 0, x: 100 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8, ease: "easeOut" }}
               viewport={{ once: true }}
               className="w-full py-16 md:py-12 bg-gray-50"
            >
               <div className="container mx-auto px-4 md:px-6">
                  <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
                     <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-2">
                           <p className="text-sm font-medium tracking-wide text-purple-600 uppercase">
                              Productive conversations
                           </p>
                           <h2 className="text-3xl font-bold tracking-tighter text-[#2B1F76] sm:text-4xl md:text-5xl">
                              Meet in the moment
                           </h2>
                           <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                              Collaborate in the moment or schedule team
                              meetings to keep everyone aligned and work moving
                              forward.
                           </p>
                        </div>
                     </div>
                     <div className="relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-[#2B1F76] to-[#4733B5]">
                        <Image
                           src="/gatherSectionThree2.png"
                           alt="Team meeting interaction"
                           className="object-cover"
                           fill
                           sizes="(max-width: 768px) 100vw, 50vw"
                        />
                     </div>
                  </div>
               </div>
            </motion.section>
         </div>
      </div>
   );
}
