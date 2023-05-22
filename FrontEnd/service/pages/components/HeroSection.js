import { motion, useAnimation } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const HeroSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });
  const controls = useAnimation();
  const router=useRouter();
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  const handleClick=()=>{
    router.push('/dashboard/dashboard')
  }

  const variants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, ease: 'easeOut' },
    },
  };

  return (
    <section className="hero relative">
    {/* Hero section content */}


    <div className="relative">
    <div className="relative h-screen">
    <img
      src="/4.jpg"
      className="absolute inset-0 w-full h-full object-cover max-w-full"
      alt=""
    />
    <img
      src="/mobile.jpg"
      className="absolute inset-0 w-full h-full object-cover max-w-full sm:hidden"
      alt=""
    />
    <div className="absolute inset-0 bg-gray-900 opacity-0"></div>
    <div className="absolute inset-0 flex items-center">
      <motion.div
        className="text-white text-center md:text-left md:pl-[150px] lg:w-[750px]"
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={variants}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Bangladesh's Leading <span className="text-[#EB4E0F]">Home Service</span> Provider Company.
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8">
        Welcome to QuickFix, your go-to service provider for all your needs. We offer a wide range of services, all delivered with professionalism and excellence. Let us take care of your needs and exceed your expectations today.</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>{handleClick()}}>
          Get Started
        </button>
        </motion.div>
      </div>
    </div>
  </div>

  </section>
  );
};

export default HeroSection;
