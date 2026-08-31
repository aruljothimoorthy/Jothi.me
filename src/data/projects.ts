import payrupeImg from "@/components/assets/payrupe.png";
import rupenetImg from "@/components/assets/rupenet.jpg";
import myfullnoteImg from "@/components/assets/Myfullnote.png";

export type Project = {
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  /** Tailwind text color class for the project title */
  titleColor: string;
  /** Optional — import from `@/components/assets/` */
  image?: string;
  /** How the image fits in the card — use "contain" for full UI screenshots */
  imageFit?: "cover" | "contain";
  liveUrl: string;
  /** Optional — omit when the project has no public repo */
  githubUrl?: string;
};

export const projects: Project[] = [
  {
    title: "PayRupe",
    description:
      " PayRupe is a digital payment platform designed to provide secure and convenient money transfer and payment-related services for users and merchants..",
    tags: ["HTML5" , "CSS3" , "JavaScript" , "React.js" , "Bootstrap" , "Node.js" , "REST APIs"],
    gradient: "from-cyan-500/20 to-blue-500/20",
    titleColor: "text-cyan-400",
    image: payrupeImg,
    liveUrl: "https://payrupe.rupenet.com/",
  },
  {
    title: "RupeNet",
    description:"Rupenet is a FinTech platform that offers digital payment, money transfer, banking, lending, KYC, merchant, and payment collection solutions.The platform enables secure, convenient, and scalable financial services for businesses.",
    tags: ["HTML5", "CSS3", "Bootstrap","JavaScript" ,"React.js","Node.js"],
    gradient: "from-amber-500/20 to-orange-500/20",
    titleColor: "text-amber-400",
    image:rupenetImg ,
    liveUrl: "https://www.rupenet.com/",
    
  },
  {
    title: "FullNoteEHR",
    description:"FullNoteEHR is a healthcare management platform designed for hospitals and healthcare organizations.It provides secure, role-based access to manage electronic health records and clinical information.The platform helps healthcare teams organize and access patient-related information efficiently.",
    tags: ["HTML5", "CSS3", "JavaScript", "Php","Mysql"],
    gradient: "from-emerald-500/20 to-teal-500/20",
    titleColor: "text-emerald-400",
    image: myfullnoteImg,
    imageFit: "contain",
    liveUrl: "https://myfullnote.com/interface/login/login.php?site=default",
  },

];
