import React, { useState } from "react";
import "./Sidebar.css";
import { SidebarData } from "../Data/Data";
import { motion } from "framer-motion";

const Sidebar = ({ onMenuItemSelect }) => {
  const [selected, setSelected] = useState(0);
  
  const handleMenuItemClick = (index) => {
    setSelected(index);
    onMenuItemSelect(SidebarData[index]); 
  };

  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-60%'
    }
  }
  return (
    <>
     
    <div className="sidebar d-flex flex-column vh-100 flex-shrink-0 p-3 text-white bg-dark " style={{ width: '230px' }}
    variants={sidebarVariants}
    animate={window.innerWidth<=768?`${expanded}`:''}
    >
      <div className="logo">
        <span>
          Dollar<span>W</span>ala
        </span>
      </div>
  
      <hr style={{ width: '170px',marginTop:30,marginBottom:0}} />

      <div className="menu">
        {SidebarData.map((item, index) => {
          return (
            <div
              className={selected === index ? "menuItem active" : "menuItem"}
              key={index}
              onClick={() =>  handleMenuItemClick(index)}
            >
              <item.icon />
              <span>{item.heading}</span>
            </div>
          );
        })}

      </div>
    </div>
    </>
  );
};

export default Sidebar;
