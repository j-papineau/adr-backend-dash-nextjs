import { HiMenuAlt3 } from "react-icons/hi";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import {BsFillChatLeftQuoteFill} from "react-icons/bs"
import { MdOutlineDashboard } from "react-icons/md";
import { FaMap } from "react-icons/fa";

export const spencerView = [
    
    { name: "Dashboard", link: "/", icon: MdOutlineDashboard },
    { name: "Zip Search Analytics", link: "/zipSearchData", icon: TbReportAnalytics},
    { name: "Quote Tool", link: "/spencer-quote-tool", icon: BsFillChatLeftQuoteFill},
    { name: "ADR Map", link: "/adr-map", icon: FaMap},
    { name: "Profile", link: "/profile", icon: AiOutlineUser, margin: true },
    { name: "Settings", link: "/", icon: RiSettings4Line},
    
]