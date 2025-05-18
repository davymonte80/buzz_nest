import {
  Footer,
  FooterCopyright,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";

function FooterComponent() {
  return (
    <Footer container>
      <FooterCopyright href="#" by="Buzz Nest™" year={2025} />
      <FooterLinkGroup>
        <FooterLink href="#">About</FooterLink>
        <FooterLink href="#">Privacy Policy</FooterLink>
        <FooterLink href="#">Licensing</FooterLink>
        <FooterLink href="#">Contact</FooterLink>
        <FooterLink href="#">Terms & Conditions</FooterLink>
        <FooterLink href="#">Help</FooterLink>
      </FooterLinkGroup>
    </Footer>
  );
}
export default FooterComponent;
