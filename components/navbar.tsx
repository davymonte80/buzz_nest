import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import Link from "next/link";
//import Image from "next/image";
function NavbarComponent() {
  return (
    <Navbar fluid rounded>
      <NavbarBrand as={Link} href="/">
        {/* <Image
          src="/file.svg"
          className="mr-3 h-6 sm:h-9"
          alt=" Buzz Next"
          width={50}
          height={50}
        /> */}
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Buzz Nest
        </span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink href="#" active>
          Home
        </NavbarLink>
        <NavbarLink as={Link} href="#">
          About
        </NavbarLink>
        <NavbarLink href="#">Technology</NavbarLink>
        <NavbarLink href="#">Gadgets</NavbarLink>
        <NavbarLink href="#">Apps</NavbarLink>
        <NavbarLink href="#">Traveling</NavbarLink>
        <NavbarLink href="#">Finance</NavbarLink>
        <NavbarLink href="#">Parenting</NavbarLink>
        <NavbarLink href="#">Health</NavbarLink>
        <NavbarLink href="#">Food</NavbarLink>
        <NavbarLink href="#">Lifestyle</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}

export default NavbarComponent;
