import { HiMenuAlt3 } from "react-icons/hi";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import {BsFillChatLeftQuoteFill} from "react-icons/bs"
import { MdDashboard, MdOutlineDashboard } from "react-icons/md";
import { FaMap } from "react-icons/fa";
import { FaUserSecret } from "react-icons/fa";
import NoPrivs from "@/components/NoPrivs";
import { MdAdminPanelSettings } from "react-icons/md";

export const spencerView = [
    
    { name: "Zip Search Analytics", link: "/zipSearchData", icon: TbReportAnalytics},
    { name: "Quote Tool", link: "/spencer-quote-tool", icon: BsFillChatLeftQuoteFill},
    { name: "ADR Map", link: "/adr-map", icon: FaMap},
    { name: "Profile", link: "/profile", icon: AiOutlineUser, margin: true },
    { name: "Settings", link: "/", icon: RiSettings4Line},
    
]

export const basicView  = [

    { name: "ADR Map", link: "/adr-map", icon: FaMap},
    { name: "Profile", link: "/profile", icon: AiOutlineUser, margin: true },
    { name: "Settings", link: "/", icon: RiSettings4Line},

]

export const devView = [
    
    {name: "Mktg. Dash", link: "/marketing-dash", icon: MdDashboard},
    { name: "Zip Search Analytics", link: "/zipSearchData", icon: TbReportAnalytics},
    { name: "Quote Tool", link: "/spencer-quote-tool", icon: BsFillChatLeftQuoteFill},
    { name: "ADR Map", link: "/adr-map", icon: FaMap},
    { name: "Profile", link: "/profile", icon: AiOutlineUser, margin: true },
    { name: "Settings", link: "/", icon: RiSettings4Line},
    { name: "Admin Tools", link: "/admin", icon: MdAdminPanelSettings, margin: true },
    { name: "Super Secret Dev Area", link: "/dev", icon: FaUserSecret, margin: true },
    
]

export const adminView = [
    
    {name: "Mktg. Dash", link: "/marketing-dash", icon: MdDashboard},
    { name: "Zip Search Analytics", link: "/zipSearchData", icon: TbReportAnalytics},
    { name: "Quote Tool", link: "/spencer-quote-tool", icon: BsFillChatLeftQuoteFill},
    { name: "ADR Map", link: "/adr-map", icon: FaMap},
    { name: "Profile", link: "/profile", icon: AiOutlineUser, margin: true },
    { name: "Settings", link: "/", icon: RiSettings4Line},
    { name: "Admin Tools", link: "/admin", icon: MdAdminPanelSettings, margin: true },
    
]