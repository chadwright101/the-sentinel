export interface AdData {
  company_name_banner: string;
  link_banner: string;
  image_banner: string;
  company_name_tower_left: string;
  link_tower_left: string;
  image_tower_left: string;
  company_name_tower_right: string;
  link_tower_right: string;
  image_tower_right: string;
  company_name_billboard: string;
  link_billboard: string;
  image_billboard: string;
  company_name_tower: string;
  link_tower: string;
  image_tower: string;
  company_name_square_primary: string;
  link_square_primary: string;
  image_square_primary: string;
  company_name_square_secondary: string;
  link_square_secondary: string;
  image_square_secondary: string;
}

export interface AdResponse {
  acf: AdData;
}

export interface AdProps {
  src: string;
  alt: string;
  url: string;
  cssClasses?: string;
}