export interface Country {
  id: string;
  name: string;
  logo: string;
  _links: {
    self: {
      href: string;
    };
    leagues: {
      href: string;
    };
  };
}
