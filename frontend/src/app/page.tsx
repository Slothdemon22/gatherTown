"use client";

import { useState } from "react";
import { ChevronDown, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
   const [showBanner, setShowBanner] = useState(true);

   return (
      <div className="min-h-screen bg-gradient-to-b from-[#4858CA] to-[#1E2341] relative overflow-hidden">
         {/* Background stars/dots */}
         <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* More stars with animation */}
            <div className="absolute h-1.5 w-1.5 bg-white/10 rounded-full top-[10%] left-[5%] animate-[twinkle_4s_infinite_ease-in-out]" />
            <div className="absolute h-2 w-2 bg-white/10 rounded-full top-[20%] left-[10%] animate-[twinkle_5s_infinite_ease-in-out]" />
            <div className="absolute h-1 w-1 bg-white/10 rounded-full top-[15%] left-[20%] animate-[twinkle_3s_infinite_ease-in-out]" />
            <div className="absolute h-2 w-2 bg-white/10 rounded-full top-[40%] left-[20%] animate-[twinkle_6s_infinite_ease-in-out]" />
            <div className="absolute h-1.5 w-1.5 bg-white/10 rounded-full top-[60%] left-[15%] animate-[twinkle_4.5s_infinite_ease-in-out]" />
            <div className="absolute h-1 w-1 bg-white/10 rounded-full top-[30%] right-[25%] animate-[twinkle_3.5s_infinite_ease-in-out]" />
            <div className="absolute h-2 w-2 bg-white/10 rounded-full top-[70%] right-[10%] animate-[twinkle_5.5s_infinite_ease-in-out]" />
            <div className="absolute h-1.5 w-1.5 bg-white/10 rounded-full top-[50%] right-[30%] animate-[twinkle_4s_infinite_ease-in-out]" />
            <div className="absolute h-1 w-1 bg-white/10 rounded-full top-[25%] right-[15%] animate-[twinkle_3s_infinite_ease-in-out]" />
            <div className="absolute h-2 w-2 bg-white/10 rounded-full top-[85%] right-[25%] animate-[twinkle_5s_infinite_ease-in-out]" />
            <div className="absolute h-1.5 w-1.5 bg-white/10 rounded-full top-[75%] left-[30%] animate-[twinkle_4.5s_infinite_ease-in-out]" />
            <div className="absolute h-1 w-1 bg-white/10 rounded-full top-[90%] left-[10%] animate-[twinkle_3.5s_infinite_ease-in-out]" />
            <div className="absolute h-1.5 w-1.5 bg-white/10 rounded-full top-[35%] left-[40%] animate-[twinkle_4s_infinite_ease-in-out]" />
            <div className="absolute h-2 w-2 bg-white/10 rounded-full top-[45%] right-[40%] animate-[twinkle_5s_infinite_ease-in-out]" />
            <div className="absolute h-1 w-1 bg-white/10 rounded-full top-[55%] right-[5%] animate-[twinkle_3s_infinite_ease-in-out]" />
         </div>

         {/* Top Banner */}
         {showBanner && (
            <div className="bg-[#3850FF] text-white py-4 px-6 flex items-center justify-between">
               <p className="text-sm sm:text-base">
                  We&apos;re building a brand new version of Gather, redesigned
                  from the ground up. Want early access?
               </p>
               <div className="flex items-center gap-4">
                  <Button
                     variant="secondary"
                     className="text-[#3850FF] bg-white hover:bg-white/90"
                  >
                     Join the Waitlist
                  </Button>
                  <button
                     onClick={() => setShowBanner(false)}
                     className="text-white hover:text-white/80"
                  >
                     <X className="h-5 w-5" />
                  </button>
               </div>
            </div>
         )}

         {/* Navigation */}
         <nav className="border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                     <Link href="/" className="flex items-center text-white">
                        <div className="flex items-center">
                           <svg
                              width="120"
                              height="42"
                              viewBox="0 0 120 42"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-8 w-auto"
                           >
                              <path
                                 fillRule="evenodd"
                                 shapeRendering="optimizeQuality"
                                 clipRule="evenodd"
                                 d="M4.94723 2.63715C4.61092 2.05424 4.8105 1.30887 5.393 0.972321C5.9755 0.635776 6.72034 0.835497 7.05664 1.41841L9.64289 5.90113C9.67653 5.90719 9.7102 5.9147 9.74381 5.92372L15.6951 7.5199C16.3449 7.69416 16.7305 8.36253 16.5564 9.01273C16.3824 9.66294 15.7145 10.0488 15.0648 9.87451L9.69146 8.43334L8.25307 13.8066C8.07902 14.4569 7.41121 14.8427 6.76149 14.6684C6.11177 14.4942 5.72617 13.8258 5.90022 13.1756L7.49453 7.21982C7.5044 7.18294 7.51586 7.14691 7.52882 7.11178L4.94723 2.63715ZM82.6926 12.4957V30.4212H85.8873V24.0477C85.8873 22.919 86.1784 22.0393 86.7608 21.4086C87.3598 20.7779 88.1086 20.4626 89.0071 20.4626C89.9222 20.4626 90.5878 20.7447 91.0037 21.3091C91.4363 21.8734 91.6526 22.6867 91.6526 23.7489V30.4212H94.8223V23.4502C94.8223 21.5912 94.3981 20.1804 93.5495 19.2178C92.7175 18.2551 91.5362 17.7738 90.0054 17.7738C89.0902 17.7738 88.2749 17.9729 87.5595 18.3713C86.8606 18.753 86.3032 19.2841 85.8873 19.9646V12.4957H82.6926ZM42.1454 29.5996C43.3766 30.3465 44.8159 30.7199 46.4632 30.7199C47.7776 30.7199 48.8592 30.4959 49.7077 30.0477C50.5563 29.5996 51.2635 28.9606 51.8292 28.1307L52.0788 30.4212H55.0239V20.836H47.3866V23.2261H51.8042C51.6379 24.6203 51.147 25.7489 50.3317 26.612C49.533 27.4585 48.3434 27.8817 46.7627 27.8817C45.1487 27.8817 43.8675 27.3589 42.9191 26.3132C41.9873 25.251 41.5214 23.7572 41.5214 21.8319C41.5214 19.9066 41.9956 18.3962 42.944 17.3007C43.8924 16.1887 45.2402 15.6327 46.9873 15.6327C48.0854 15.6327 48.984 15.865 49.6828 16.3298C50.3816 16.7779 50.8641 17.4086 51.1304 18.2219H54.6994C54.3001 16.4957 53.4265 15.143 52.0788 14.1638C50.731 13.1845 49.0339 12.6949 46.9873 12.6949C45.1903 12.6949 43.6345 13.0849 42.3201 13.865C41.0222 14.6285 40.0156 15.699 39.3001 17.0767C38.6013 18.4377 38.2519 20.0144 38.2519 21.807C38.2519 23.5829 38.593 25.1431 39.2751 26.4875C39.9573 27.8153 40.9141 28.8527 42.1454 29.5996ZM59.702 30.222C60.3842 30.5539 61.2577 30.7199 62.3226 30.7199C63.3542 30.7199 64.1945 30.5042 64.8434 30.0726C65.509 29.6411 66.0248 29.0934 66.3909 28.4294L66.6904 30.4212H69.4108V22.8277C69.4108 21.2178 68.9033 19.9729 67.8884 19.0933C66.8734 18.2136 65.484 17.7738 63.7203 17.7738C62.6887 17.7738 61.7569 17.9563 60.925 18.3215C60.093 18.67 59.4108 19.1763 58.8784 19.8402C58.3626 20.5041 58.0631 21.2842 57.9799 22.1804H61.0997C61.2161 21.5829 61.5156 21.1348 61.9982 20.836C62.4807 20.5207 63.0464 20.363 63.6953 20.363C64.4108 20.363 65.0098 20.5622 65.4923 20.9605C65.9749 21.3588 66.2161 21.9813 66.2161 22.8277V23.1265H63.0714C61.2744 23.1265 59.9266 23.4833 59.0281 24.197C58.1296 24.9107 57.6804 25.8402 57.6804 26.9855C57.6804 27.666 57.8468 28.2884 58.1795 28.8527C58.5123 29.417 59.0198 29.8734 59.702 30.222ZM65.1679 27.334C64.6687 27.9315 63.9616 28.2303 63.0464 28.2303C62.4474 28.2303 61.9649 28.0975 61.5988 27.8319C61.2328 27.5664 61.0498 27.1929 61.0498 26.7116C61.0498 26.2635 61.2328 25.89 61.5988 25.5913C61.9649 25.2759 62.5722 25.1182 63.4208 25.1182H66.1413C66.0082 25.9979 65.6837 26.7365 65.1679 27.334ZM77.7035 30.4212C76.4056 30.4212 75.3657 30.1058 74.5837 29.4751C73.8016 28.8444 73.4106 27.724 73.4106 26.1141V20.7364H71.2891V18.0725H73.4106L73.785 14.7613H76.6053V18.0725H79.9497V20.7364H76.6053V26.139C76.6053 26.7365 76.7301 27.1514 76.9797 27.3838C77.2459 27.5996 77.6951 27.7075 78.3274 27.7075H79.8748V30.4212H77.7035ZM103.589 30.7199C102.341 30.7199 101.234 30.4544 100.269 29.9232C99.3041 29.3921 98.5471 28.6452 97.998 27.6826C97.4489 26.7199 97.1744 25.6078 97.1744 24.3464C97.1744 23.0684 97.4406 21.9315 97.973 20.9356C98.5221 19.9397 99.2709 19.168 100.219 18.6202C101.184 18.0559 102.316 17.7738 103.614 17.7738C104.828 17.7738 105.901 18.0393 106.833 18.5704C107.765 19.1016 108.489 19.8319 109.005 20.7613C109.537 21.6742 109.803 22.695 109.803 23.8236C109.803 24.0062 109.795 24.197 109.778 24.3962C109.778 24.5954 109.77 24.8029 109.753 25.0186H100.344C100.411 25.9813 100.743 26.7365 101.342 27.2842C101.958 27.8319 102.698 28.1058 103.564 28.1058C104.213 28.1058 104.753 27.9647 105.186 27.6826C105.635 27.3838 105.968 27.0021 106.184 26.5373H109.429C109.196 27.3174 108.805 28.0311 108.256 28.6784C107.723 29.3091 107.058 29.8071 106.259 30.1722C105.477 30.5373 104.587 30.7199 103.589 30.7199ZM103.614 20.363C102.832 20.363 102.141 20.5871 101.542 21.0352C100.943 21.4667 100.56 22.1306 100.394 23.0269H106.559C106.509 22.2136 106.209 21.5663 105.66 21.085C105.111 20.6037 104.429 20.363 103.614 20.363ZM112.288 18.0725V30.4212H115.483V24.7946C115.483 23.8485 115.632 23.1099 115.932 22.5788C116.248 22.0476 116.681 21.6742 117.23 21.4584C117.779 21.2427 118.403 21.1348 119.102 21.1348H120V17.7738C118.952 17.7738 118.037 18.0144 117.255 18.4958C116.489 18.9605 115.882 19.5912 115.433 20.3879L115.133 18.0725H112.288ZM17.5617 22.0868C19.9088 20.7307 20.7128 17.7271 19.3576 15.378C18.0023 13.0289 15.0009 12.2239 12.6538 13.58C10.3066 14.9361 9.5026 17.9397 10.8579 20.2888C12.2132 22.6379 15.2146 23.4429 17.5617 22.0868ZM16.2925 19.9341C17.4537 19.2632 17.8515 17.7772 17.181 16.615C16.5105 15.4528 15.0255 15.0545 13.8643 15.7254C12.7031 16.3963 12.3053 17.8824 12.9758 19.0446C13.6463 20.2068 15.1312 20.605 16.2925 19.9341ZM9.15811 21.2925C10.5134 23.6416 9.70934 26.6452 7.36222 28.0013C5.0151 29.3573 2.01371 28.5523 0.658425 26.2033C-0.696856 23.8542 0.107191 20.8505 2.45431 19.4945C4.80144 18.1384 7.80283 18.9434 9.15811 21.2925ZM6.96246 22.4872C7.63298 23.6494 7.23518 25.1354 6.07395 25.8064C4.91272 26.4773 3.4278 26.079 2.75728 24.9168C2.08676 23.7546 2.48456 22.2686 3.64579 21.5977C4.80701 20.9267 6.29194 21.325 6.96246 22.4872ZM18.4089 34.5956C20.756 33.2395 21.56 30.2358 20.2048 27.8868C18.8495 25.5377 15.8481 24.7327 13.501 26.0887C11.1538 27.4448 10.3498 30.4485 11.7051 32.7976C13.0604 35.1466 16.0618 35.9516 18.4089 34.5956ZM17.1019 32.3873C18.2631 31.7164 18.6609 30.2304 17.9904 29.0682C17.3198 27.906 15.8349 27.5077 14.6737 28.1786C13.5125 28.8495 13.1147 30.3356 13.7852 31.4978C14.4557 32.66 15.9406 33.0582 17.1019 32.3873ZM30.4387 34.4414C31.794 36.7905 30.9899 39.7941 28.6428 41.1502C26.2957 42.5062 23.2943 41.7012 21.939 39.3522C20.5837 37.0031 21.3878 33.9994 23.7349 32.6434C26.082 31.2873 29.0834 32.0923 30.4387 34.4414ZM28.2595 35.6627C28.93 36.8249 28.5322 38.311 27.371 38.9819C26.2097 39.6528 24.7248 39.2545 24.0543 38.0923C23.3838 36.9301 23.7816 35.4441 24.9428 34.7732C26.104 34.1022 27.5889 34.5005 28.2595 35.6627ZM28.6457 28.6811C30.9928 27.325 31.7969 24.3214 30.4416 21.9723C29.0863 19.6232 26.0849 18.8182 23.7378 20.1743C21.3907 21.5304 20.5866 24.534 21.9419 26.8831C23.2972 29.2322 26.2986 30.0372 28.6457 28.6811ZM27.4216 26.5151C28.5828 25.8442 28.9806 24.3581 28.3101 23.1959C27.6395 22.0337 26.1546 21.6355 24.9934 22.3064C23.8322 22.9773 23.4344 24.4633 24.1049 25.6255C24.7754 26.7877 26.2603 27.186 27.4216 26.5151ZM29.5944 9.46353C30.9497 11.8126 30.1456 14.8163 27.7985 16.1723C25.4514 17.5284 22.45 16.7234 21.0947 14.3743C19.7395 12.0252 20.5435 9.0216 22.8906 7.66552C25.2377 6.30944 28.2391 7.11444 29.5944 9.46353ZM27.3995 10.6415C28.07 11.8037 27.6722 13.2897 26.511 13.9606C25.3498 14.6315 23.8648 14.2333 23.1943 13.0711C22.5238 11.9089 22.9216 10.4228 24.0828 9.75191C25.2441 9.081 26.729 9.47927 27.3995 10.6415Z"
                                 fill="currentColor"
                              />
                           </svg>
                           <span className="ml-1 text-xl font-semibold"></span>
                        </div>
                     </Link>
                  </div>

                  <div className="hidden md:flex items-center space-x-8">
                     <div className="flex items-center text-white/80 hover:text-white cursor-pointer">
                        Product <ChevronDown className="ml-1 h-4 w-4" />
                     </div>
                     <div className="flex items-center text-white/80 hover:text-white cursor-pointer">
                        Solutions <ChevronDown className="ml-1 h-4 w-4" />
                     </div>
                     <Link
                        href="/pricing"
                        className="text-white/80 hover:text-white"
                     >
                        Pricing
                     </Link>
                     <div className="flex items-center text-white/80 hover:text-white cursor-pointer">
                        Resources <ChevronDown className="ml-1 h-4 w-4" />
                     </div>
                     <Link
                        href="/contact"
                        className="text-white/80 hover:text-white"
                     >
                        Contact Sales
                     </Link>
                  </div>

                  <div className="flex items-center space-x-4">
                     <Button
                        variant="outline"
                        className="bg-white text-[#3850FF] hover:bg-white/90 border-0"
                     >
                        Sign In
                     </Button>
                     <Button className="bg-[#28E0B9] text-white hover:bg-[#28E0B9]/90 border-0">
                        Get started
                     </Button>
                  </div>
               </div>
            </div>
         </nav>

         {/* Hero Section */}
         <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="grid lg:grid-cols-2 gap-12  justify-center items-center">
               {/* Left Side - Hero Text */}
               <div className="flex flex-col justify-center">
                  <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
                     Your Virtual HQ
                  </h1>
                  <p className="text-xl text-white/80 mb-8">
                     Gather is a 2D Metaverse Office, where teams collaborate
                     naturally—just like in real life. Walk around, chat, and
                     work together in a virtual space that feels truly connected
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                     <Button className="bg-[#28E0B9] text-white hover:bg-[#28E0B9]/90 border-0 text-lg px-8 py-6">
                        Get started
                     </Button>
                     <Button
                        variant="ghost"
                        className="text-white hover:bg-white/10 text-lg px-8 py-6 group"
                     >
                        Or take a tour{" "}
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                     </Button>
                  </div>
               </div>

               {/* Right Side - Video */}
               <div className="flex items-center justify-center mt-10 ">
                  <div className="rounded-3xl overflow-hidden shadow-2xl w-full max-w-xl mx-auto">
                     <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        poster="https://cdn.prod.website-files.com/63c885e8fb810536398b658a/645bf7b13ac3a54d23fb33ad_Screenshot%202023-05-10%20125910.jpg"
                        className="w-full rounded-3xl"
                        style={{
                           boxShadow: "0 10px 25px rgba(0,0,0,0.55) ",
                        }}
                     >
                        <source
                           src="https://cdn.vidzflow.com/v/h3yy6rTnJQ_720p_1691443174.mp4"
                           type="video/mp4"
                        />
                        Your browser does not support the video tag.
                     </video>
                  </div>
               </div>
            </div>
         </main>
      </div>
   );
}
