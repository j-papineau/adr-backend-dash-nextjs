import { HiMenuAlt3 } from "react-icons/hi";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import {BsFillChatLeftQuoteFill} from "react-icons/bs"
import { MdOutlineDashboard } from "react-icons/md";

export const spencerView = [
    { name: "Dashboard", link: "/", icon: MdOutlineDashboard },
    { name: "Profile", link: "/profile", icon: AiOutlineUser },
    { name: "Analytics", link: "/", icon: TbReportAnalytics, margin: true },
    { name: "Settings", link: "/", icon: RiSettings4Line },
    { name: "Quote Tool", link: "/spencer-quote-tool", icon: BsFillChatLeftQuoteFill}
]