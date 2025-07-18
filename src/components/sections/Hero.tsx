import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye } from "lucide-react";
import { LampContainer } from "@/components/ui/lamp";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        The Exclusive Library of AI Automations <br /> You Can Sell as Your Own
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0.5, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.6,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="text-slate-300 text-xl md:text-2xl text-center max-w-4xl mx-auto leading-relaxed mt-8"
      >
        Access 100+ powerful AI automations you can resell to make $10,000+/month online or use to automate and grow your own business effortlessly.
      </motion.p>

      <motion.div
        initial={{ opacity: 0.5, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.9,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12"
      >
        <Link to="/library">
          <Button 
            size="lg" 
            className="gradient-gold text-gold-foreground hover:opacity-90 px-8 py-4 text-lg font-semibold gold-glow"
          >
            Unlock the Vault
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
        <Link to="/library">
          <Button 
            size="lg" 
            variant="outline" 
            className="px-8 py-4 text-lg font-semibold border-slate-300/30 text-slate-300 hover:bg-slate-300/10"
          >
            <Eye className="mr-2 h-5 w-5" />
            Browse Library
          </Button>
        </Link>
      </motion.div>
    </LampContainer>
  );
}