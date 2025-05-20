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
        <NavbarLink href="/" active>
          Home
        </NavbarLink>

        <NavbarLink href="/technology">Technology</NavbarLink>
        <NavbarLink href="/gadgets">Gadgets</NavbarLink>
        <NavbarLink href="/apps">Apps</NavbarLink>
        <NavbarLink href="/traveling">Traveling</NavbarLink>
        <NavbarLink href="/finance">Finance</NavbarLink>
        <NavbarLink href="/parenting">Parenting</NavbarLink>
        <NavbarLink href="/health">Health</NavbarLink>
        <NavbarLink href="/food">Food</NavbarLink>
        <NavbarLink href="/lifestyle">Lifestyle</NavbarLink>
        <NavbarLink as={Link} href="/about">
          About
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}

export default NavbarComponent;
