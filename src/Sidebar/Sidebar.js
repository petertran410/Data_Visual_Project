import React from "react";
import { AnimatePresence, motion, useCycle } from "framer-motion";
// import { itemVariants, sideVariants } from "../motion/motion";
// import { BiHomeAlt2, BiWindowClose } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [open, cycleOpen] = useCycle(true, true);
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
              className="sideBarContainer"
              initial="open"
              animate="open">
              {links.map(({ name, to, id }) => (
                <Link to={to} key={id}>
                  <motion.a whileHover={{ scale: 1.1 }}>{name}</motion.a>
                </Link>
              ))}
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
      <div className="btn-container"></div>
    </main>
  );
}

const links = [
  { name: "Home", to: "/", id: 1 },
  { name: "Population By Density", to: "/Density", id: 2 },
  { name: "Population By Age", to: "/Age", id: 3 },
  { name: "Population By GDP", to: "/GDP", id: 4 },
  { name: "The rate of poor households", to: "/PoorHouseholds", id: 5 },
];
