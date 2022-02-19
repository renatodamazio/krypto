import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import Logo from "../../images/logo.png";

interface navBarItemProps {
  classProps: string;
  title: string;
}

const NavBarItem = (props: navBarItemProps) => {
  return (
    <li className={`mx-4 cursor-pointer ${props.classProps}`}>{props.title}</li>
  );
};

export default function NavBar() {
  const [toggleMenu, setToggleMenu] = useState<Boolean>(false);
  const IconConfig = {
    fontSize: 28,
    className: "text-white md:hidden cursor-pointer",
    onClick: () => setToggleMenu(!toggleMenu),
  };

  const Menus = (props:any) => {
    return ["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
      <NavBarItem key={item + index} classProps={props.className} title={item} />
    ));
  };
  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="flex justify-between  items-center">
        <img src={Logo} alt="" className="w-32 cursor-pointer" />
        <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
          {Menus({})}

          <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
            Login
          </li>
        </ul>
        <div className="flex relative">
          {toggleMenu ? (
            <AiOutlineClose {...IconConfig} />
          ) : (
            <HiMenuAlt4 {...IconConfig} />
          )}

          {toggleMenu && (
            <ul className="text-white z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start item-end rounded-md blue-glassmorphism text-white animate-slide-in">
              <li className="p-4 flex w-full items-center py-8"><AiOutlineClose {...IconConfig} fontSize={18}/> &nbsp;</li>
              {Menus({ className: "p-4 text-right"})}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
