export type NavLink = {
  name: string;
  href?: string;
  isDropdown?: boolean;
  dropdownItems?: { name: string; href: string }[];
};

export interface ImageItem {
  id: string;
  url: string;
  file?: File;
  isNew: boolean;
  order: number;
}

export interface ImagePayload {
  id: string;
  type: "existing" | "new";
  url?: string;
  order: number;
}