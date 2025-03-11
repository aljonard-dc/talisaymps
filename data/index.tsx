import { FaDatabase } from "react-icons/fa";
import { IoMdAnalytics } from "react-icons/io";
import { IoFileTrayFullSharp } from "react-icons/io5";

export const menuItems = [
    {
      label: "Case Records",
      icon: <IoFileTrayFullSharp size={30} />,
    },
    {
      label: "Analytics",
      icon: <IoMdAnalytics size={30} />,
    },
    {
      label: "Database",
      icon: <FaDatabase size={30} />,
    },
  ];
