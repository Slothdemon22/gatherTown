'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

function RemoteTeamSection() {
  return (
    <>
      <section className="w-full py-20 md:py-32 flex justify-center items-center">
        <div className="container px-4 md:px-6">
          {/* Main heading */}
          <motion.div
            className="text-center mb-20 md:mb-24"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1A1A3D] leading-tight">
              The in-person moments <br /> you&apos;ve been missing
            </h1>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-2 items-center">
            {/* Left content */}
            <motion.div
              className="space-y-6 lg:max-w-[90%]"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
              <p className="text-[#6366F1] text-sm md:text-base font-semibold uppercase tracking-wide">
                Proximity and Visibility
              </p>
              <h2 className="text-3xl md:text-[34px] font-bold text-[#1E1E50] leading-tight">
                Bring your remote team closer together
              </h2>
              <p className="text-lg text-[#6B7280] leading-relaxed">
                Communicate, collaborate, and feel more connected in a persistent space that
                reflects your unique team culture.
              </p>
            </motion.div>

            {/* Right image */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
              <div className="w-full max-w-[580px]">
                <Image
                  src="/gatherSectionTwo.png"
                  alt="Remote team collaboration interface showing virtual office spaces"
                  width={800}
                  height={600}
                  className="rounded-xl shadow-lg"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
export default RemoteTeamSection;
