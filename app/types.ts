export type NavLink = {
  name: string;
  href?: string;
  isDropdown?: boolean;
  dropdownItems?: { name: string; href: string }[];
};