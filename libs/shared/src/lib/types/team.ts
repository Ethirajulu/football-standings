export interface Team {
  id: string;
  name: string;
  logo: string;
  _links: {
    self: {
      href: string;
    };
    standing: {
      href: string;
    };
  };
}
