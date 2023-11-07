import React from "react";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import { itemVariants, sideVariants } from "../motion/motion";
import {BiHomeAlt2, BiWindowClose} from "react-icons/bi";

export default function Sidebar() {
  const [open, cycleOpen] = useCycle(false, true);
  return (
    <main>
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ width: 0 }}
            animate={{
              width: 300,
            }}
            exit={{
              width: 0,
              transition: { delay: 0.7, duration: 0.3 },
            }}>
            <motion.div
              className="container"
              initial="closed"
              animate="open"
              exit="closed"
              variants={sideVariants}>
              {links.map(({ name, to, id }) => (
                <motion.a
                  key={id}
                  href={to}
                  whileHover={{ scale: 1.1 }}
                  variants={itemVariants} >
                  {name}
                </motion.a>
              ))}
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
      <div className="btn-container">
        <button className="rounded-circle bg-primary" onClick={cycleOpen}>{open ? <BiWindowClose /> : <BiHomeAlt2 />}</button>
      </div>
    </main>
  );
}

const links = [
  { name: "Home", to: "#", id: 1 },
  { name: "Population By Density", to: "#", id: 2 },
  { name: "Population By Age", to: "#", id: 3 },
  { name: "Population By GDP", to: "#", id: 4 },
];
